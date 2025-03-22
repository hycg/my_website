# Vue 组件开发

## 🔧 1. 组件基础
### 单文件组件(SFC)结构解析
```vue
<template>
  <!-- 组件模板 -->
  <div>{{ msg }}</div>
</template>

<script setup>
// 组合式API写法
const msg = ref('Hello Vue 3!')
</script>

<style scoped>
/* 组件作用域样式 */
div {
  color: #42b983;
}
</style>
```

### 组件注册方式
**全局注册**（main.js）：
```javascript
import { createApp } from 'vue'
import MyComponent from './MyComponent.vue'

const app = createApp({})
app.component('MyComponent', MyComponent)
```

**局部注册**：
```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>
```

### Props验证
```vue
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '默认标题',
    required: true
  },
  likes: Number
})
</script>
```

## 📡 2. 组件通信
### Props/$emit模式
**父组件**：
```vue
<template>
  <ChildComponent :message="parentMsg" @update="handleUpdate" />
</template>
```

**子组件**：
```vue
<script setup>
const emit = defineEmits(['update'])

function buttonClick() {
  emit('update', newValue)
}
</script>
```

### provide/inject
**祖先组件**：
```vue
<script setup>
import { provide } from 'vue'

provide('theme', 'dark')
</script>
```

**后代组件**：
```vue
<script setup>
import { inject } from 'vue'

const theme = inject('theme', 'light')
</script>
```

### 事件总线
```javascript
// eventBus.js
import mitt from 'mitt'
export const emitter = mitt()

// 组件A
emitter.emit('search', params)

// 组件B
emitter.on('search', (params) => {})
```

## 🎪 3. 插槽系统
### 动态插槽名
```vue
<template>
  <BaseLayout>
    <template v-slot:[dynamicSlotName]>
      Dynamic Slot Content
    </template>
  </BaseLayout>
</template>

<script setup>
const dynamicSlotName = ref('header')
</script>
```

### 作用域插槽
```vue
<!-- 子组件 -->
<template>
  <ul>
    <li v-for="item in items">
      <slot name="item" :item="item" />
    </li>
  </ul>
</template>

<!-- 父组件 -->
<template v-slot:item="{ item }">
  <span>{{ item.text }}</span>
</template>
```

## ⏳ 4. 生命周期管理
### 组合式API使用
```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件挂载完成')
})

onUnmounted(() => {
  console.log('组件卸载完成')
})
</script>
```

### 异步组件加载
```javascript
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)
```

> 注意：Vue 3的组合式API生命周期钩子需要在setup()中同步调用，异步操作请使用await放在钩子函数内部。