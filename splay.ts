import { cloneDeep } from 'lodash'

interface ICompare<T> { (a: T, b: T): boolean }

class node<T> {
	public value: T
	public left: node<T> = null
	public right: node<T> = null
	public father: node<T> = null
	constructor(value: T, left?: node<T>, right?: node<T>) {
		this.value = cloneDeep(value)
		if (left) { (this.left = left).father = this }
		if (right) { (this.right = right).father = this }
	}
	public witchChild() {
		if (this.father === null) { return -1 }
		return this.father.right === this ? 1 : 0
	}
	public rotate() {
		let father = this.father
		let isRightChild = this.witchChild()
		if (isRightChild) {
			father.right = this.left
			if (this.left) { this.left.father = father }
		} else {
			father.left = this.right
			if (this.right) { this.right.father = father }
		}
		this.father = father.father
		if (father.father) {
			if (father.father.right === father) {
				father.father.right = this
			} else {
				father.father.left = this
			}
		}
		if (isRightChild) {
			(this.left = father).father = this
		} else {
			(this.right = father).father = this
		}
	}
	public dfs(callback: { (item: T): void }) {
		if (this.left) { this.left.dfs(callback) }
		callback(cloneDeep(this.value))
		if (this.right) { this.right.dfs(callback) }
	}
}

class tree<T> {
	private root: node<T> = null
	private compare: ICompare<T>
	constructor(compare?: ICompare<T>, values?: T[]) {
		this.compare = compare ? compare : (a: T, b: T) => a < b
		if (values) { for (let item of values) { this.insert(item) } }
	}
	private splay(t: node<T>) {
		while (t.father !== null) {
			if (t.father.father === null) {
				t.rotate()
			} else if (t.witchChild() === t.father.witchChild()) {
				t.father.rotate()
				t.rotate()
			} else {
				t.rotate()
				t.rotate()
			}
		}
		this.root = t
	}
	public search(value: T, rotate: boolean = true) {
		if (this.root === null) { return false }
		for (let p = this.root; p !== null; ) {
			if (this.compare(value, p.value)) {
				p = p.left
			} else if (this.compare(p.value, value)) {
				p = p.right
			} else {
				if (rotate) { this.splay(p) }
				return true
			}
		}
		return false
	}
	public insert(value: T) {
		if (this.root === null) {
			this.root = new node<T>(value)
		} else {
			let n = new node<T>(value)
			let lastp: node<T> = null
			for (let p = this.root; p !== null; ) {
				if (this.compare(value, p.value)) {
					lastp = p
					p = p.left
				} else if (this.compare(p.value, value)) {
					lastp = p
					p = p.right
				} else {
					return false
				}
			}
			if (this.compare(value, lastp.value)) {
				(lastp.left = n).father = lastp
			} else {
				(lastp.right = n).father = lastp
			}
			this.splay(n)
		}
		return true
	}
	public forEach(callback: { (item: T): void }) {
		this.root.dfs(callback)
	}
	public dump() { console.log('dump tree:', this.root) }
}

export default tree
export { tree as Tree }
