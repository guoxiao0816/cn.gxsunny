---
title: vue-router 使用 keep-alive 注意事项
date: 2024-07-09
tags:
 - VueRouter
 - Vue
categories:
 - 前端开发
publish: true
---
<!-- <Boxx /> -->

> 基于需求或者用户体验，有些页面需要缓存，需要用到 `keepAlive`, 对应多两个 api (vue3) `onActivated()` ,`onDeactivated()` (vue2) `activated`,`deactivated`
缓存成功时，除了第一次加载或者刷新会走onMounted，其他时候只会走onActivated()，onDeactivated()钩子，如果再次访问路由没有走onMounted，代表缓存生效了

<!-- more -->

## 注意事项
- keepAlive 多个 `router-view` 无关，需要找到页面路由使用的那个出口 
- keep-alive :include="cachedComponents" 使用的 name 与 routerlist 定义的路由文件无关，是组件中的 name 命名，而不是路由中的组件 name 命名
     [include/exclude 值的多种形式](#补充-includeexclude-值的多种形式)
- 多级嵌套的路由其父级 `meta` 也要添加 `keepAlive: true` // 标记此路由需要缓存，本身 `meta` 也要加 <br> ***PS: 亲测父级没加也可以生效***

## 简单代码示例 Vue3

routerlist.js
```js
{
    path: "/groupsManage",
    component: Layout,
    meta: {
      title: "团队管理",
      keepAlive: true // 标记此路由需要缓存
    },
    redirect: "/groupsManage/performance",
    children: [
      
      {
        path: "/groupsManage/messages",
        name: "groupsManageMessages",
        component: () => import("@/views/groupsManage/messages/index.vue"),
        meta: {
          title: "消息管理",
          keepAlive: true // 标记此路由需要缓存
        }
      },
      {
        path: "/messages/msgDetail",
        name: "msgDetail",
        component: () => import("@/views/groupsManage/messages/msgDetail.vue"),
        meta: {
          title: "系统通知详情",
          isShow: false
        }
      }
    ]
  },
```

Layout
```js
<router-view v-slot="{ Component, route }">
    <keep-alive :include="cachedComponents">
        <component :is="Component" v-if="route.meta.keepAlive" :key="route.path" />
    </keep-alive>
    <transition name="fade" mode="out-in">
        <component :is="Component" v-if="!route?.meta?.keepAlive" :key="route.path" />
    </transition>
</router-view>


const cachedComponents = ref(["GroupsManageMessages"])
```

groupsManage/messages/index.vue
```js
添加vue2的写法，也可以用其他方案
<script>
export default {
  name: "GroupsManageMessages"
}
</script>

onActivated(() => {
  console.log("onononononononononononononon")
})
```

#### 补充： include/exclude 值的多种形式。
```js

// 1. 将缓存 name 为 test 的组件(基本）
<keep-alive include='test'>
  <router-view/>
</keep-alive>
	
// 2. 将缓存 name 为 a 或者 b 的组件，结合动态组件使用
<keep-alive include='a,b'>
  <router-view/>
</keep-alive>
	
// 3. 使用正则表达式，需使用 v-bind
<keep-alive :include='/a|b/'>
  <router-view/>
</keep-alive>	
	
// 4.动态判断
<keep-alive :include='includedComponents'>
  <router-view/>
</keep-alive>
	
// 5. 将不缓存 name 为 test 的组件
<keep-alive exclude='test'>
  <router-view/>
</keep-alive>

// 6. 和 `<transition>` 一起使用
<transition>
  <keep-alive>
    <router-view/>
  </keep-alive>
</transition>

// 7. 数组 (使用 `v-bind`)
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

### 拓展 [VueRouter常用方法](../../technique/html/VueRouter常用方法.md)

