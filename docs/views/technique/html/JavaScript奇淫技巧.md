---
title: "JavaScript奇淫技巧"
date: 2022-05-21 13:14:00
tags:
  - '前端'
categories:
  - '前端开发'
publish: true
sticky: 2
---

> JavaScript 作为一门灵活且广泛使用的编程语言，有许多“奇淫技巧”（即巧妙且有用的编程技巧），能够帮助开发者编写更简洁、高效和优雅的代码。以下是一些有用的 JavaScript 技巧：

<!-- more -->

## 1. 使用 || 和 && 简化条件
1. 使用 || 提供默认值：
```js 
let name = user.name || 'Anonymous';
```
如果 `user.name` 是 null、undefined、false、0、NaN 或空字符串，name 将会被赋值为 'Anonymous'。

2. 使用 && 执行短路操作：
```js
user && user.name && console.log(user.name);
```
只有当 user 和 user.name 都存在时，才会执行 console.log(user.name)。

## 2. 对象属性的动态赋值
```js 
let key = 'name';
let user = {
    [key]: 'John Doe'
};
console.log(user.name); // 输出: John Doe
```


## 3. 模板字符串

模板字符串使得字符串拼接和多行字符串变得更加容易和可读：

```js
let name = 'John';
let greeting = `Hello, ${name}!`;
console.log(greeting); // 输出: Hello, John!
```

## 4. 可选链操作符 `?.`

可选链操作符允许你在访问深层嵌套对象属性时避免错误：

```js
let user = {};
console.log(user?.address?.street); // 输出: undefined，不会抛出错误
```

## 5. 空值合并操作符 `??`

空值合并操作符提供了一种更合理的默认值设置方式，只在 null 或 undefined 时触发默认值：

```js
let name = user.name ?? 'Anonymous';
```

## 6. 数组去重

使用 `Set` 和展开运算符：

```js
let numbers = [1, 2, 3, 4, 4, 5, 5];
let uniqueNumbers = [...new Set(numbers)];
console.log(uniqueNumbers); // 输出: [1, 2, 3, 4, 5]
```

## 7. 解构赋值
解构赋值可以从数组或对象中提取值，并将其赋值给变量：

- **对象解构：**
```js
let user = { name: 'John', age: 30 };
let { name, age } = user;
console.log(name, age); // 输出: John 30
```

- **数组解构：**
```js
let numbers = [1, 2, 3];
let [first, second, third] = numbers;
console.log(first, second, third); // 输出: 1 2 3
```

## 8. 函数参数默认值
```js
function greet(name = 'Guest') {
    console.log(`Hello, ${name}!`);
}
greet(); // 输出: Hello, Guest!
```

## 9. 短路赋值
使用 `||=` 和 `&&= `等运算符进行简洁赋值：
```js
let name;
name ||= 'Anonymous'; // 等价于: if (!name) { name = 'Anonymous'; }
console.log(name); // 输出: Anonymous
```

## 10. 数组方法的链式调用
通过链式调用数组方法，能让代码更简洁且易于阅读：

```js
let numbers = [1, 2, 3, 4, 5];
let doubledEvenNumbers = numbers
    .filter(n => n % 2 === 0)
    .map(n => n * 2);
console.log(doubledEvenNumbers); // 输出: [4, 8]
```

## 11. 对象展开运算符
对象展开运算符可以用于对象的浅拷贝和合并：

```js
let user = { name: 'John', age: 30 };
let userWithLocation = { ...user, location: 'New York' };
console.log(userWithLocation); // 输出: { name: 'John', age: 30, location: 'New York' }
```

## 12. 快速交换变量值
使用数组解构来交换两个变量的值：

```js
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 输出: 2 1
```

## 13. 记住 `this` 的箭头函数
箭头函数不绑定自己的 this，而是继承自上下文：

```js
function Timer() {
    this.seconds = 0;
    setInterval(() => {
        this.seconds++;
        console.log(this.seconds);
    }, 1000);
}

new Timer(); // 每秒输出递增的秒数
```

## 14. 模拟默认参数对象
在函数中使用解构和默认值，便于处理多个参数：

```js
function createUser({ name = 'Guest', age = 18, location = 'Unknown' } = {}) {
    console.log(name, age, location);
}
createUser(); // 输出: Guest 18 Unknown
```

## 15. 使用 Promise.all 和 Promise.race
同时处理多个异步操作：

**Promise.all：** 等待所有 Promise 完成：
```js
Promise.all([promise1, promise2])
    .then(([result1, result2]) => {
        console.log(result1, result2);
    });
```

**Promise.race：** 等待第一个完成的 Promise：
```js
Promise.race([promise1, promise2])
    .then((result) => {
        console.log(result);
    });
```

通过掌握和应用这些技巧，可以显著提升你的编码能力和开发效率。


