import Splay from './splay'
import { equal } from 'assert'

let splay = new Splay<number>()
let set = new Set<number>()

const count = 1000000;
const rand = () => Math.random() * Number.MAX_SAFE_INTEGER

console.time(`splay insert ${count} numbers`)
for (let i = 0; i < count; i++) { splay.insert(rand()) }
console.timeEnd(`splay insert ${count} numbers`)

console.time(`splay search ${count} numbers`)
for (let i = 0; i < count; i++) { splay.search(rand()) }
console.timeEnd(`splay search ${count} numbers`)

console.time(`set insert ${count} numbers`)
for (let i = 0; i < count; i++) { set.add(rand()) }
console.timeEnd(`set insert ${count} numbers`)

console.time(`set search ${count} numbers`)
for (let i = 0; i < count; i++) { set.has(rand()) }
console.timeEnd(`set search ${count} numbers`)

console.log('dump splay')
splay.forEach((val: number) => {
  console.log(val)
})

console.log('dump set')
set.forEach((val: number) => {
  console.log(val)
})
