import test from 'ava'

const sum = (a, b) => a + b
test('example test', (t) => {
    t.is(sum(2, 4), 6)
})