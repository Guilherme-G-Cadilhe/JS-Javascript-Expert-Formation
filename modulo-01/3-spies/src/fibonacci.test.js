// Fibonacci: o proximo numero da sequencia é esmpre a soma dos anteriores
// input: 3
//0,1,1
// input: 5
// 0,1,1,2,3

const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci');
const assert = require('assert');
const sinon = createSandbox();


; (async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    // Número de sequencias: 5
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0  current = 5, next = 8 -> PARA
    for (const sequencia of fibonacci.execute(5)) { }
    // console.log('spy.getCalls()', spy.getCalls())
    // console.log('spy.callCount', spy.callCount)
    const expectedCallCount = 6
    assert.strictEqual(spy.callCount, expectedCallCount)
    const { args } = spy.getCall(2)
    const expectedParams = [3, 1, 2]
    assert.deepStrictEqual(args, expectedParams, "Os arrays não são iguais!")
  }
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    // Número de sequencias: 5
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    const results = [...fibonacci.execute(3)]
    const expectedCallCount = 4
    assert.strictEqual(spy.callCount, expectedCallCount)
    const expectedResults = [0, 1, 1]
    assert.deepStrictEqual(results, expectedResults, "Os arrays não são iguais!")
  }

})()