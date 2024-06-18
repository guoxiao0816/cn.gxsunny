---
title: VueX 使用指北
date: 2024-06-05
tags:
 - 前端
 - Vue
 - 面试
categories:
 - 前端开发
publish: true
---
> Vuex 是 Vue.js 应用程序的状态管理模式，用于集中管理应用的所有组件的状态，确保状态的可预测性和易调试性。Vuex 提供了一个集中式存储库，用于管理应用的状态，并通过定义明确的规则确保状态的变更是可控的。

<!-- more -->

## Vuex 核心概念

1. **State（状态）**：用于存储应用的状态。
2. **Getters**：用于从 state 中派生出一些状态。
3. **Mutations**：用于更改 state，必须是同步操作。
4. **Actions**：类似于 mutations，但包含异步操作。
5. **Modules**：用于将 store 分割成多个模块，每个模块有自己的 state、getters、mutations 和 actions。

## 安装 Vuex

首先安装 Vuex：

```bash
npm install vuex --save
```

## 基本用法

### 1. 创建 `store`：在项目根目录创建 store/index.js 文件，并在其中配置 Vuex。
```js
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    devices: [],
    currentDevice: null,
    printStatus: {}
  },
  getters: {
    getUser: state => state.user,
    getDevices: state => state.devices,
    getCurrentDevice: state => state.currentDevice,
    getPrintStatus: state => state.printStatus
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setDevices(state, devices) {
      state.devices = devices;
    },
    setCurrentDevice(state, device) {
      state.currentDevice = device;
    },
    updatePrintStatus(state, status) {
      state.printStatus = status;
    }
  },
  actions: {
    fetchDevices({ commit }) {
      // 异步操作，从服务器获取设备列表并提交到 mutations
      fetch('https://api.example.com/devices')
        .then(response => response.json())
        .then(data => {
          commit('setDevices', data);
        });
    },
    loginUser({ commit }, user) {
      // 异步操作，用户登录并提交用户信息到 mutations
      fetch('https://api.example.com/login', {
        method: 'POST',
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          commit('setUser', data.user);
        });
    }
  }
});

export default store;
```

### 2. 在主文件中引入 store：在 `main.js` 中引入并使用 store。

```js
// main.js
import Vue from 'vue';
import App from './App.vue';
import store from './store';

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

```

### 3. 在组件中使用 Vuex：
```js
<template>
  <div>
    <p>User: {{ user }}</p>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    ...mapActions(['loginUser']),
    login() {
      const user = { username: 'example', password: 'password' };
      this.loginUser(user);
    }
  }
};
</script>

```

## 使用 Modules

当应用变得复杂时，可以使用模块（Modules）来分割 store。

```js
// store/modules/user.js
const state = {
  user: null
};

const getters = {
  getUser: state => state.user
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

const actions = {
  loginUser({ commit }, user) {
    // 异步操作，用户登录并提交用户信息到 mutations
    fetch('https://api.example.com/login', {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        commit('setUser', data.user);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

```
```js
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import devices from './modules/devices';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    devices
  }
});

export default store;

```

## 高级用法和技巧

### 1. 命名空间 Modules

为了避免不同模块之间的命名冲突，可以使用命名空间模块。这样，模块内的 state、getters、mutations 和 actions 都会被封装在各自的命名空间内。

```js
// store/modules/user.js
const state = {
  user: null
};

const getters = {
  getUser: state => state.user
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

const actions = {
  loginUser({ commit }, user) {
    fetch('https://api.example.com/login', {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        commit('setUser', data.user);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

```
```js
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import devices from './modules/devices';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    devices
  }
});

export default store;

```

在组件中使用命名空间模块时，可以指定模块名：

```vue
<template>
  <div>
    <p>User: {{ user }}</p>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('user', {
      user: state => state.user
    })
  },
  methods: {
    ...mapActions('user', ['loginUser']),
    login() {
      const user = { username: 'example', password: 'password' };
      this.loginUser(user);
    }
  }
};
</script>
```

### 2. 辅助函数
Vuex 提供了一些辅助函数，可以简化组件中对 store 的访问。

- `mapState`：将 state 映射到组件的计算属性。
- `mapGetters`：将 getters 映射到组件的计算属性。
- `mapMutations`：将 mutations 映射到组件的方法。
- `mapActions`：将 actions 映射到组件的方法。

### 3. 组合使用 state 和 getters
在某些情况下，你可能需要同时使用 state 和 getters。你可以将它们组合在一起，方便地在组件中使用。

```vue
<template>
  <div>
    <p>User: {{ user }}</p>
    <p>User (from getter): {{ userFromGetter }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      userFromGetter: 'getUser'
    })
  }
};
</script>

```

### 4. 使用插件
Vuex 允许使用插件来扩展其功能。例如，可以使用 Vuex 插件来持久化 state 数据到本地存储中。

```js
// store/plugins/persistedState.js
export default store => {
  store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state));
  });
};

// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from './plugins/persistedState';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  plugins: [persistedState]
});

export default store;
```

### 5. 模块动态注册
在某些情况下，你可能需要根据条件动态注册模块。Vuex 提供了动态注册模块的方法。

```js
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // global state
  },
  mutations: {
    // global mutations
  }
});

export default store;

// Dynamically register a module
store.registerModule('myModule', {
  state: { /* module state */ },
  mutations: { /* module mutations */ },
  actions: { /* module actions */ },
  getters: { /* module getters */ }
});
```

### 6. 热重载
在开发过程中，如果你需要动态修改 store，Vuex 提供了热重载模块的方法。

```js
if (module.hot) {
  module.hot.accept(['./modules/myModule'], () => {
    const newModule = require('./modules/myModule').default;
    store.hotUpdate({
      modules: {
        myModule: newModule
      }
    });
  });
}
```

## 结论
Vuex 是一个功能强大且灵活的状态管理工具，适用于各种规模的 Vue 应用。通过上述高级用法和技巧，可以更好地组织和管理应用的状态，提高开发效率和代码可维护性。









