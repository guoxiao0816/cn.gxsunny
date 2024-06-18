---
title: Vue Router 常用方法
date: 2024-06-05
tags:
 - 前端
 - Vue
 - 面试
categories:
 - 前端开发
publish: true
---
> Vue Router 是 Vue.js 官方的路由管理器，用于创建单页面应用（SPA），让应用在不同的 URL 显示不同的内容。它与 Vue.js 核心深度集成，使得构建 SPA 变得非常简单。

<!-- more -->

## Vue Router 基本概念

1. **路由**：定义路径和组件之间的映射关系。
2. **动态路由**：使用动态参数来匹配多个路径。
3. **嵌套路由**：在组件内部嵌套子路由。
4. **编程式导航**：使用代码来进行导航。
5. **路由守卫**：拦截导航，执行某些逻辑（如权限验证）。

## Vue Router 面试题
### vue-router 路由钩子函数是什么 执行顺序是什么
- 钩子函数种类有:全局守卫、路由守卫、组件守卫
- 全局钩子：beforeEach、beforeResolve、afterEach
  - beforeEach 全局前置守卫 初始化时执行，每次路由切换前执行。全局前置守卫通常用来进行路由跳转的一些信息判断，判断是否登录，是否拿到对应的路由权限等等。
  - afterEach  全局后置守卫 初始化时执行，每次路由切换后执行。对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。
  - beforeResolve   全局解析守卫

- 路由独享的守卫：beforeEnter
- 组件内的守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

### 路由传参的几种方式

传参方式可划分为 `params` 传参 和`query`传参，而`params`传参可以分为在url地址栏当中显示参数和不显示参数两种方式

**`query` 显示 刷新URL不丢失参数， `params` 不显示 刷新参数会丢失**

```javascript

this.$router.push({ path: '/', query: { 
  switchuser: JSON.stringify({ username: data.mobile, userid: data.id 
  }) } }).catch((error) => error)

this.$router.push({ path: '/rechargememberset', query: { activename: type == 2 ? 'two' : 'three' } }).catch((error) => error);


this.$router.push({ name: '/rechargememberset', params: { id: 1 } }).catch((error) => error);
```

- 声明式

```js
路由配置 懒加载
{
    path: '/bounceBall',
    name: 'bounceBall',
    component: () => import('@/components/animation/bounceBall.vue')        
    // 路由懒加载的含义：把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件。
  }
 
页面使用
 <router-link :to="{ path: 'bounceBall', query: { id: 1 } }">看动画</router-link>
 ```

- 编程式 this.$router.push

```js
路由配置：
{
path: '/bounceBall',
name: 'bounceBall',
component: () => import('@/components/animation/bounceBall.vue')
}
 
 
页面应用
<el-button type="primary" @click="() => { $router.push({ path: 'bounceBall', query: { id: 1 } }) } " >看动画</el-button >

```

<font color="red">以上的接收方式都是：this.$route.query.id</font>

params 传参

### route和router 的区别
- $route对象：$route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等。

- $router对象：$router对象是全局路由的实例，是router构造方法的实例。
  






## 安装 Vue Router

首先需要安装 Vue Router：

```bash
npm install vue-router
```

## 配置 Vue Router

### 1. 创建路由文件：在项目根目录下创建 router/index.js 文件，并在其中配置路由
```js
// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home.vue';
import About from '@/components/About.vue';
import User from '@/components/User.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user/:id', component: User }  // 动态路由
];

const router = new VueRouter({
  mode: 'history',  // 使用 HTML5 History 模式
  routes
});

export default router;

```

### 在主文件中引入路由：在 main.js 中引入并使用路由。

```js
// main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
```

### 3. 在模板中使用路由链接和视图：
```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link :to="'/user/' + userId">User</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: 1
    };
  }
};
</script>
```


## 动态路由和路由参数

动态路由允许你将同一个组件映射到多个路径，并在组件内部访问路径参数。

```js
// router/index.js
const routes = [
  { path: '/user/:id', component: User }
];
```

在组件内部，可以通过 this.$route.params 访问参数。

```js
<!-- User.vue -->
<template>
  <div>
    <h1>User {{ $route.params.id }}</h1>
  </div>
</template>
```

## 嵌套路由

嵌套路由允许你在组件内部再嵌套子路由。

```js
// router/index.js
const routes = [
  { path: '/user/:id', component: User,
    children: [
      { path: 'profile', component: UserProfile },
      { path: 'posts', component: UserPosts }
    ]
  }
];
```

在父组件模板中，需要使用 `router-view>`来显示子路由组件。

```js
<!-- User.vue -->
<template>
  <div>
    <h1>User {{ $route.params.id }}</h1>
    <router-link to="profile">Profile</router-link>
    <router-link to="posts">Posts</router-link>
    <router-view></router-view> <!-- 子路由组件会在这里显示 -->
  </div>
</template>
```

## 编程式导航

使用 `this.$router.push` 或 `this.$router.replace` 可以编程式地导航到不同的路径。

```js
methods: {
  goToHome() {
    this.$router.push('/');
  },
  goToUser(id) {
    this.$router.push(`/user/${id}`);
  }
}
```

## 路由守卫
路由守卫可以在导航前执行一些逻辑，例如权限验证。常见的路由守卫有以下几种：

### 1. 全局前置守卫：

```js
router.beforeEach((to, from, next) => {
  // 检查用户是否已登录
  if (to.path === '/protected' && !isLoggedIn()) {
    next('/login');
  } else {
    next();
  }
});
```

### 2. 路由独享守卫：
```js
const routes = [
  {
    path: '/protected',
    component: Protected,
    beforeEnter: (to, from, next) => {
      // 检查用户是否已登录
      if (!isLoggedIn()) {
        next('/login');
      } else {
        next();
      }
    }
  }
];
```

### 3. 组件内守卫：
```js
export default {
  beforeRouteEnter(to, from, next) {
    // 在进入路由前执行逻辑
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变但组件复用时执行逻辑
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 在离开路由前执行逻辑
    next();
  }
};
```

## Vue Router 的模式

Vue Router 提供两种路由模式：`hash` 和 `history`
- `hash` 模式：使用 URL 的 hash 部分（#）来保持页面状态。优点是简单、兼容性好，但 URL 中会出现 #。
- `history` 模式：依赖 HTML5 History API，能够生成没有 # 的 URL。优点是 URL 更简洁，但需要服务器配置支持，因为刷新页面时需要将所有请求重定向到应用的入口文件。

## 结论
Vue Router 是 Vue.js 应用的关键组成部分，能够让你轻松实现客户端路由。通过定义路由、配置路由守卫和使用嵌套路由，你可以创建复杂且功能强大的单页面应用。













