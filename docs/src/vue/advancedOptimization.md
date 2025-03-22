# Vue 进阶优化

## ⚙️ 一、虚拟滚动优化长列表渲染
### 原理
虚拟滚动是一种优化长列表渲染的技术，它只渲染当前可见区域的列表项，当用户滚动列表时，动态加载和渲染新的列表项，从而减少DOM元素的数量，提高性能。

### 示例代码
```vue
<template>
  <div class="virtual-list" ref="listRef" @scroll="onScroll">
    <div class="virtual-list__placeholder" :style="{ height: totalHeight + 'px' }" />
    <div class="virtual-list__items" :style="{ transform: `translateY(${scrollTop}px)` }">
      <div v-for="item in visibleItems" :key="item.id" class="virtual-list__item">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const listRef = ref(null);
const itemHeight = 30; // 每个列表项的高度
const listData = Array.from({ length: 1000 }, (_, i) => ({ id: i, text: `Item ${i}` }));
const visibleCount = computed(() => Math.ceil(window.innerHeight / itemHeight)); // 可见区域的列表项数量
const scrollTop = ref(0);
const startIndex = computed(() => Math.floor(scrollTop.value / itemHeight));
const endIndex = computed(() => startIndex.value + visibleCount.value);
const visibleItems = computed(() => listData.slice(startIndex.value, endIndex.value));
const totalHeight = listData.length * itemHeight;

const onScroll = () => {
  scrollTop.value = listRef.value.scrollTop;
};

onMounted(() => {
  scrollTop.value = listRef.value.scrollTop;
});
</script>

<style scoped>
.virtual-list {
  height: 300px;
  overflow-y: auto;
  position: relative;
}
.virtual-list__placeholder {
  height: 100%;
}
.virtual-list__items {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.virtual-list__item {
  height: 30px;
  border-bottom: 1px solid #ccc;
  padding: 5px;
}
</style>
```

## 💾 二、计算属性缓存优化
### 原理
计算属性是基于它们的依赖进行缓存的，只有当依赖发生变化时，计算属性才会重新计算。这可以避免不必要的计算，提高性能。

### 示例代码
```vue
<template>
  <div>
    <p>Original list: {{ numbers }}</p>
    <p>Sorted list: {{ sortedNumbers }}</p>
    <button @click="addNumber">Add a number</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const numbers = ref([1, 3, 2]);

const sortedNumbers = computed(() => {
  console.log('Calculating sorted numbers...');
  return numbers.value.slice().sort((a, b) => a - b);
});

const addNumber = () => {
  numbers.value.push(Math.floor(Math.random() * 10));
};
</script>
```

## 🚀 三、组件懒加载实现
### 原理
组件懒加载是指在需要使用某个组件时才加载该组件，而不是在应用初始化时就加载所有组件。这可以减少初始加载时间，提高应用的响应速度。

### 示例代码
```vue
<template>
  <div>
    <button @click="loadComponent">Load Component</button>
    <component v-if="LazyComponent" :is="LazyComponent" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const LazyComponent = ref(null);

const loadComponent = async () => {
  LazyComponent.value = (await import('./LazyComponent.vue')).default;
};
</script>
```

## 🌐 四、服务端渲染(SSR)配置
### 原理
服务端渲染是指在服务器端将Vue组件渲染成HTML字符串，然后将其发送到客户端。这可以提高应用的首屏加载速度，有利于SEO。

### 示例代码
#### 1. 安装依赖
```bash
npm install vue@next vue-server-renderer@next
```

#### 2. 创建服务器文件 `server.js`
```javascript
const express = require('express');
const { createSSRApp } = require('vue');
const { renderToString } = require('vue-server-renderer');

const app = express();

app.get('/', async (req, res) => {
  const vueApp = createSSRApp({ template: '<div>Hello, SSR!</div>' });
  const html = await renderToString(vueApp);
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue SSR</title>
</head>
<body>
  <div id="app">${html}</div>
  <script src="/client.js"></script>
</body>
</html>`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

#### 3. 创建客户端文件 `client.js`
```javascript
import { createApp } from 'vue';

const app = createApp({ template: '<div>Hello, SSR!</div>' });
app.mount('#app');
```

#### 4. 运行服务器
```bash
node server.js
```

## ⚙️ 五、编译时优化技巧
### 原理
编译时优化是指在Vue组件编译阶段对代码进行优化，例如静态节点提升、事件监听器缓存等。这些优化可以减少运行时的开销，提高性能。

### 示例代码
```vue
<template>
  <div>
    <p>Static text that doesn't change</p>
    <p>{{ dynamicText }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dynamicText = ref('Dynamic text');
</script>
```
在上面的示例中，`<p>Static text that doesn't change</p>` 是一个静态节点，Vue编译器会将其提升到渲染函数的外部，避免每次渲染时都重新创建。