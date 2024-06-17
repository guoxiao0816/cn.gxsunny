---
title: "深拷贝浅拷贝深入理解"
date: 2024-04-29 13:14:00
tags:
  - '前端'
  - '前端面试题'
categories:
  - '前端开发'
publish: true
sticky: 1
---

> 在编程中，理解深拷贝和浅拷贝是非常重要的，因为它们直接影响到对象和数组等数据结构的操作方式。下面将深入探讨深拷贝和浅拷贝的概念、区别、以及如何在实际编程中实现它们。

<!-- more -->

## 1. 浅拷贝

浅拷贝是指创建一个新对象，这个新对象的属性是对原对象属性的引用。如果原对象的某个属性是引用类型（如对象、数组），那么浅拷贝只复制这个引用，而不是引用指向的实际值。这意味着如果对新对象中的引用类型属性进行修改，原对象中的对应属性也会受到影响。

### 浅拷贝的实现方法
1. 使用 Object.assign
```js
let original = { a: 1, b: { c: 2 } };
let copy = Object.assign({}, original);

copy.b.c = 3;
console.log(original.b.c); // 输出: 3
```
2. 使用展开运算符

```js
let original = { a: 1, b: { c: 2 } };
let copy = { ...original };

copy.b.c = 3;
console.log(original.b.c); // 输出: 3
```

## 2.深拷贝

深拷贝是指创建一个新对象，这个新对象完全独立于原对象。所有的属性值，包括引用类型属性指向的值，都将被递归地复制。这样，新对象与原对象在任何层级上都不会共享引用。

### 深拷贝的实现方法

1. 使用递归
```javascript
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    let copy = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }

    return copy;
}

let original = { a: 1, b: { c: 2 } };
let copy = deepCopy(original);

copy.b.c = 3;
console.log(original.b.c); // 输出: 2

```
2. 使用 JSON 序列化和反序列化

这种方法简单且实用，但它有一些局限性，如不能处理函数、undefined、NaN、Infinity、RegExp 和 Date 对象。

```js
let original = { a: 1, b: { c: 2 } };
let copy = JSON.parse(JSON.stringify(original));

copy.b.c = 3;
console.log(original.b.c); // 输出: 2
```


## 区别总结
1. 引用类型属性的处理
-   浅拷贝：只复制引用，不复制实际值。
-   深拷贝：递归复制所有层级的实际值。

2. 性能
- 浅拷贝：性能较好，因为只复制一层属性。
- 深拷贝：性能较差，尤其是对象层级较深时，因为需要递归复制所有层级。

3. 使用场景
- 浅拷贝：适用于对象层级较浅或对原对象变化不敏感的情况。
- 深拷贝：适用于对象层级较深或需要完全独立副本的情况。


**深拷贝的复杂性**：实现深拷贝时需要考虑对象的所有可能性，包括循环引用、特殊类型（如日期、正则表达式）等。

**性能考虑**：深拷贝操作通常比浅拷贝操作更耗时，特别是在处理大型或深层嵌套对象时。

通过深入理解和区分深拷贝和浅拷贝，开发者可以更好地控制数据的复制行为，避免不必要的副作用和性能问题。


## 注意事项

虽然 JSON 序列化和反序列化可以处理多层嵌套对象，但有一些限制和注意事项：

```js
let original = {
    a: 1,
    b: {
        c: 2,
        d: {
            e: 3
        }
    },
    f: [4, 5, { g: 6 }]
};

// 序列化
let jsonString = JSON.stringify(original);
console.log(jsonString);

// 反序列化
let deepCopy = JSON.parse(jsonString);
console.log(deepCopy);

// 修改深层嵌套的属性，验证是否为深拷贝
deepCopy.b.d.e = 4;
console.log(original.b.d.e); // 输出: 3 (原对象不受影响)
console.log(deepCopy.b.d.e); // 输出: 4 (拷贝对象被修改)

```
JSON 序列化（通过 `JSON.stringify` 和 `JSON.parse`）能够处理多层嵌套的对象数据，但有一些限制和注意事项

- **数据类型限制**：JSON 只能序列化 JavaScript 的基本数据类型（如字符串、数字、对象、数组、布尔值、null），不能处理 undefined、函数、Symbol 等特殊类型。此外，Date 对象会被序列化为 ISO 8601 格式的字符串，RegExp 对象会被序列化为空对象 {}。
- **循环引用**：JSON 序列化不能处理循环引用的对象结构。如果尝试序列化包含循环引用的对象，会抛出错误。

```js
let obj = { a: 1 };
obj.b = obj; // 循环引用

try {
    JSON.stringify(obj);
} catch (error) {
    console.error("Cannot serialize object with circular reference:", error);
}
```
- **大数据量性能问题**：对于非常大的或深度嵌套的对象，JSON 序列化和反序列化可能会引起性能问题，因为整个对象需要被转换为字符串并解析回来。

## 处理特殊数据类型和循环引用

对于一些特殊数据类型和循环引用，可以使用第三方库，如 flatted 或 circular-json 、lodash，它们能够处理这些情况。

我使用的是 `lodash`

### 使用 lodash 的深拷贝
```bash
npm install lodash
```

```js
const _ = require('lodash');
或
import _ from "lodash";

let original = {
    a: 1,
    b: {
        c: 2,
        d: {
            e: 3
        }
    },
    f: [4, 5, { g: 6 }]
};

// 使用 lodash 的 cloneDeep 方法进行深拷贝
let deepCopy = _.cloneDeep(original);

// 修改深层嵌套的属性，验证是否为深拷贝
deepCopy.b.d.e = 4;
console.log(original.b.d.e); // 输出: 3 (原对象不受影响)
console.log(deepCopy.b.d.e); // 输出: 4 (拷贝对象被修改)
```

### lodash 的优势
- **处理复杂数据结构**：lodash 的 cloneDeep 可以处理复杂的嵌套对象、数组、函数、日期等，避免了 JSON 序列化的局限性。
- **性能优化**：lodash 对深拷贝进行了优化，在处理大数据量时表现出色。
- **简单易用**：cloneDeep 方法的使用非常简单，不需要处理循环引用等问题。

以下是一个更复杂的示例，展示了 lodash 的 cloneDeep 如何处理复杂数据结构：
```js
const _ = require('lodash');

let original = {
    a: 1,
    b: {
        c: 2,
        d: {
            e: 3,
            f: new Date(),
            g: /abc/g
        }
    },
    h: [4, 5, { i: 6 }],
    j: function() { return 'hello'; },
    k: undefined
};

// 使用 lodash 的 cloneDeep 方法进行深拷贝
let deepCopy = _.cloneDeep(original);

// 验证深拷贝是否成功
console.log(original);
console.log(deepCopy);

// 修改深层嵌套的属性，验证是否为深拷贝
deepCopy.b.d.e = 4;
deepCopy.h[2].i = 7;
console.log(original.b.d.e); // 输出: 3 (原对象不受影响)
console.log(deepCopy.b.d.e); // 输出: 4 (拷贝对象被修改)

console.log(original.h[2].i); // 输出: 6 (原对象不受影响)
console.log(deepCopy.h[2].i); // 输出: 7 (拷贝对象被修改)
```

使用 `lodash` 的 `cloneDeep` 方法，可以方便、高效地实现深拷贝，处理复杂的嵌套对象结构。与 JSON 序列化相比，lodash 能处理更多数据类型，如函数、日期和正则表达式，并且不会受到循环引用问题的限制。对于需要深拷贝的复杂数据结构，`lodash` 是一个可靠的选择。





