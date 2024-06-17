---
title: "掌握闭包的魔力 - 提升 JavaScript 编程实力的关键"
date: 2024-06-13 13:14:00
tags:
  - '前端'
  - '前端面试题'
categories:
  - '前端开发'
publish: true
sticky: 1
---

> 闭包是编程语言（特别是 JavaScript）中的一个重要概念，它允许函数携带并访问其词法环境。简而言之，闭包使得函数可以“记住”并访问定义它时所在的作用域中的变量，即使这个函数是在其原始作用域之外执行的。

<!-- more -->

## 1. 闭包的定义
闭包是一个函数与其词法环境的组合。这个环境包含了这个函数在定义时所能访问的所有局部变量。

## 2. 闭包的特点
 1. **记住环境**：闭包会记住它定义时的环境，即使这个环境在闭包执行时已经不存在。
 2. **延长作用域**：闭包可以延长变量的作用域，使得这些变量在外部函数执行结束后仍然能够被访问。

```javascript
function outerFunction() {
    var outerVariable = 'I am from outer function';

    function innerFunction() {
        console.log(outerVariable);
    }

    return innerFunction;
}

var closure = outerFunction();
closure(); // 输出: 'I am from outer function'

```
在这个例子中，`innerFunction` 是一个闭包。它在 `outerFunction` 内部被定义，并且引用了 `outerFunction` 的局部变量 `outerVariable`。即使 `outerFunction` 已经返回并且其作用域已经结束，`innerFunction` 仍然可以访问 `outerVariable`

## 3. 闭包的应用

- **数据隐藏**：闭包可以用来创建私有变量。例如，通过使用闭包，可以创建只能通过特定函数访问的变量。
- **函数工厂**：闭包可以用来创建函数工厂，根据传入的参数生成不同的函数。
- **回调函数**：闭包在回调函数和事件处理程序中非常常见，因为它们允许函数在以后执行时仍然能够访问其定义时的环境。

#### 示例：数据隐藏

```javascript
  function createCounter() {
    let count = 0;

    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 输出: 1
console.log(counter.increment()); // 输出: 2
console.log(counter.decrement()); // 输出: 1

```
在这个例子中，count 变量只能通过 increment 和 decrement 方法访问，从而实现了数据隐藏。

#### 示例：函数工厂

```javascript
function createAdder(x) {
    return function(y) {
        return x + y;
    };
}

const add5 = createAdder(5);
console.log(add5(2)); // 输出: 7
console.log(add5(10)); // 输出: 15

```
在这个例子中，createAdder 是一个函数工厂。它返回的每个新函数都“记住”了创建它时传入的 x 参数。

### 3.1 高阶用法

1. **模拟私有变量和方法**

在 JavaScript 中，所有对象属性默认都是公有的。闭包可以用于创建私有变量和方法，达到数据隐藏和封装的目的。
```javascript
function Person(name) {
    let age = 25; // 私有变量

    function getAge() { // 私有方法
        return age;
    }

    function setAge(newAge) {
        if (newAge > 0 && newAge < 120) {
            age = newAge;
        }
    }

    return {
        name: name,
        getAge: getAge,
        setAge: setAge
    };
}

const person = Person('John');
console.log(person.name); // 输出: John
console.log(person.getAge()); // 输出: 25
person.setAge(30);
console.log(person.getAge()); // 输出: 30

```
在这个示例中，age 变量和 getAge、setAge 方法都是 Person 函数内部的私有成员，外部无法直接访问和修改它们，只能通过返回的公有方法进行操作。

2. **创建高阶函数**

高阶函数是指接受函数作为参数或返回一个函数的函数。闭包在创建高阶函数时非常有用。

```javascript
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const doubler = multiplier(2);
console.log(doubler(5)); // 输出: 10

const tripler = multiplier(3);
console.log(tripler(5)); // 输出: 15

```

3. **闭包和循环**

使用闭包处理循环中的异步操作时，避免变量共享问题：

```javascript
for (var i = 0; i < 5; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(i);
        }, 1000);
    })(i);
}
```
在这个例子中，通过立即调用函数表达式（IIFE），为每次迭代创建了一个新的作用域，捕获当前的 i 值。

4. **柯里化（Currying）**   

> 没用过

柯里化是一种将函数的多个参数变为一系列单参数函数的技术。闭包可以实现函数的柯里化。
```javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}

function sum(a, b, c) {
    return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 输出: 6
console.log(curriedSum(1, 2)(3)); // 输出: 6
console.log(curriedSum(1, 2, 3)); // 输出: 6

```
在这个例子中，curry 函数将一个普通函数转换为柯里化函数，可以灵活地分步传递参数。

5. **记忆化（Memoization）**

记忆化是一种优化技术，用于缓存函数调用的结果，以避免重复计算。闭包可以实现记忆化函数。
```javascript
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        } else {
            const result = fn.apply(this, args);
            cache[key] = result;
            return result;
        }
    };
}

function slowFunction(num) {
    for (let i = 0; i < 10000; i++) {} // 模拟耗时计算
    return num * 2;
}

const memoizedFunction = memoize(slowFunction);
console.log(memoizedFunction(5)); // 第一次调用，计算并缓存结果
console.log(memoizedFunction(5)); // 第二次调用，直接返回缓存结果

```
在这个例子中，memoize 函数创建了一个闭包，缓存函数调用的结果，以提高性能。

6. **函数组合（Function Composition）**

函数组合是一种将多个函数组合成一个新函数的方法，闭包可以简化函数组合的实现。

```javascript
function compose(...fns) {
    return function(result) {
        return fns.reduceRight((acc, fn) => fn(acc), result);
    };
}

const add1 = x => x + 1;
const multiply2 = x => x * 2;
const subtract3 = x => x - 3;

const composedFunction = compose(subtract3, multiply2, add1);
console.log(composedFunction(5)); // 输出: 9  (5+1)*2-3
```
在这个例子中，compose 函数使用闭包将多个函数组合成一个新函数，从右向左依次执行。

7. **自定义事件系统**

闭包可以用于创建自定义事件系统，简化事件的订阅、取消订阅和触发。

```javascript
function createEventEmitter() {
    const events = {};
    return {
        on(event, listener) {
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(listener);
        },
        off(event, listener) {
            if (!events[event]) return;
            events[event] = events[event].filter(l => l !== listener);
        },
        emit(event, ...args) {
            if (!events[event]) return;
            events[event].forEach(listener => listener(...args));
        }
    };
}

const emitter = createEventEmitter();
function onFoo(data) {
    console.log('foo listener:', data);
}
emitter.on('foo', onFoo);
emitter.emit('foo', { some: 'data' }); // 输出: foo listener: { some: 'data' }
emitter.off('foo', onFoo);
emitter.emit('foo', { some: 'data' }); // 无输出

```

在这个例子中，createEventEmitter 使用闭包来管理事件和监听器。 

**下面是 Vue2 的响应式原理**

```javascript
function defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        get() {
            if (Dep.target) {
                dep.depend();
            }
            return val;
        },
        set(newVal) {
            if (newVal === val) return;
            val = newVal;
            dep.notify();
        }
    });
}

class Dep {
    constructor() {
        this.subscribers = [];
    }

    depend() {
        if (Dep.target && !this.subscribers.includes(Dep.target)) {
            this.subscribers.push(Dep.target);
        }
    }

    notify() {
        this.subscribers.forEach(sub => sub.update());
    }
}

```






## 4. 总结

- 闭包是一个强大的编程工具，特别适用于需要记住环境或需要隐藏数据的场景。在 JavaScript 中，闭包通过函数内定义函数，并且函数能够访问其外部函数的变量这一机制，实现了对环境的记忆和访问。
- 闭包是 JavaScript 中一个非常强大和灵活的工具，可以用于创建私有变量、高阶函数、处理异步操作、实现柯里化和记忆化等高级编程技巧。理解并善用闭包，可以极大地提高代码的可维护性和可扩展性。希望这些高级示例能帮助你更好地理解和应用闭包。

