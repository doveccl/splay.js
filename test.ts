import Splay from './splay'
import { equal } from 'assert'

let s = new Splay<number>()

s.dump()
for (let i = 0; i < 12; i += 2) {
  s.insert(i)
  s.dump()
}

for (let i = 0; i < 12; i++) {
  let res = s.search(i)
  console.log('search', i, res)
  equal(res, i % 2 === 0)
  s.dump()
}
