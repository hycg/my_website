# Vue 基础入门


## 1. 什么是Vue
Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。


## 2. Vue 生命周期钩子
Vue 组件生命周期包含多个关键阶段，开发者可通过这些钩子函数在特定时机执行代码：

```vue
<script setup>
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured } from 'vue'

// 生命周期钩子直接使用
onBeforeMount(() => {
  console.log('DOM挂载前')
})

onMounted(() => {
  console.log('DOM挂载完成')
})

onBeforeUpdate(() => {
  console.log('数据更新前')
})

onUpdated(() => {
  console.log('数据更新完成')
})

onBeforeUnmount(() => {
  console.log('组件卸载前')
})

onUnmounted(() => {
  console.log('组件卸载完成')
})

onErrorCaptured((err) => {
  console.error('错误捕获:', err)
})
</script>
```

### 主要生命周期阶段：

- **beforeCreate & created**  
组件实例初始化阶段：
- `beforeCreate`：实例刚创建，数据观测/event/watch未初始化  
- `created`：实例创建完成，已配置数据观测/计算属性/watch，但DOM未生成

- **beforeMount & mounted**  
DOM挂载阶段：
- `beforeMount`：模板编译完成，首次渲染前  
- `mounted`：实例挂载到DOM后调用，注意不能保证所有子组件都挂载

- **beforeUpdate & updated**  
数据更新阶段：
- `beforeUpdate`：数据变化后，DOM更新前  
- `updated`：数据更改导致虚拟DOM重新渲染后

- **beforeUnmount & unmounted**  
组件卸载阶段：
- `beforeUnmount`：实例销毁前，适合移除事件监听器  
- `unmounted`：实例销毁后调用

> 注意：Vue 3.x中`beforeDestroy`和`destroyed`已重命名为`beforeUnmount`和`unmounted`，建议使用新命名方式。


## 3. Vue 生命周期钩子的使用场景

### （1）created 阶段
> 注意：`created`阶段是组件实例初始化的最后阶段，适合进行数据初始化、事件监听、数据请求等操作。
```vue
<script setup>
import { ref } from 'vue'

const userData = ref(null)

const fetchData = async () => {
  userData.value = await fetch('/api/user').then(r => r.json())
}

// 立即执行数据初始化
fetchData()
</script>
```

### （2）mounted 阶段
> 注意：`mounted`阶段是组件挂载到DOM后的最后阶段，适合进行DOM操作、第三方库初始化、事件绑定等操作。
```vue
<script setup>
import { onMounted, ref } from 'vue'

const chartContainer = ref(null)

onMounted(() => {
  const chart = echarts.init(chartContainer.value)
  chart.setOption({/*...*/})
})

const initMap = () => {
  const map = new AMap.Map('map-container', {
    zoom: 12,
    center: [116.397428, 39.90923]
  })
}
onMounted(initMap)
</script>
```

### （3）updated 阶段
> 注意：`updated`阶段是组件更新后的最后阶段，适合进行DOM操作、第三方库更新、数据请求等操作。
```vue
<script setup>
import { onUpdated } from 'vue'

onUpdated(() => {
  console.log('DOM已更新，可在此执行依赖DOM的操作')
})

const debugUpdate = () => {
  console.log('状态变更追踪：', performance.now())
}

onUpdated(debugUpdate)
</script>
```

### （4）beforeUnmount 阶段
> 注意：`beforeUnmount`阶段是组件卸载前的最后阶段，适合进行事件移除、定时器清除、第三方库销毁等操作。
```vue
<script setup>
import { onBeforeUnmount } from 'vue'

const timer = setInterval(() => {
  console.log('心跳检测')
}, 5000)

const resizeHandler = () => console.log('窗口尺寸变化')
window.addEventListener('resize', resizeHandler)

onBeforeUnmount(() => {
  clearInterval(timer)
  window.removeEventListener('resize', resizeHandler)
})
</script>
```
