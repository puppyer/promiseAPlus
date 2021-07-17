import * as chai from 'chai';
import { type } from 'os';
import Promise from '../src/promise';
const assert = chai.assert;

// mocha模块才有describe和it这两个方法
// 所以需要用mocha来运行该文件
// mocha -r ts-node/register test/index.ts
describe("Promise", () => {
  it('是一个类', () => {
    assert(typeof Promise === 'function')
    assert(typeof Promise.prototype === 'object')
    // 或者
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })
  it('new Promise()必须接收一个函数，否则就报错', () => {
    assert.throw(() => {
      new Promise(1)
    })
  })
  it('new Promise(fn)会生成一个对象，对象有then方法', () => {
    const promise = new Promise(() => {})
    assert.isFunction(promise.then)
  })
  it('new Promise(fn)中的fn会立即执行', () => {
    let called = false 
    const promise = new Promise(() => {
      called = true
    })
    // @ts-ignore
    assert(called === true)
  })
  it('new Promise(fn)中的fn执行的时候接收resolve和reject两个函数', () => {
    const promise = new Promise((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
    })
  })
  it('promise.then(onFulfilled)中的onFulfilled会在resolve被调用的时候执行', done => {
    let called = false
    const promise = new Promise((resolve, reject) => {
      // onFulfilled还没有被调用
      assert(called === false)
      resolve()
      // onFulfilled被调用了
      setTimeout(() => {
        assert(called === true)
        done()
      })
    })
    // @ts-ignore
    promise.then(function onFulfilled() {
      called = true
    })
  })
})