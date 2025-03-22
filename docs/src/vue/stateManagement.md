# Vue 状态管理

## 🔧 Vuex核心概念
- State与Getter的使用场景
- Mutation类型安全实现
```typescript
// store/types.ts
type MutationPayloads = {
  SET_USER: UserInfo,
  ADD_CART_ITEM: CartItem,
  UPDATE_INVENTORY: { sku: string; count: number }
};

// store/mutations.ts
const mutations: MutationTree<State> & {
  [K in keyof MutationPayloads]: (s: State, p: MutationPayloads[K]) => void
} = {
  SET_USER(state, payload) {
    state.user = { ...state.user, ...payload };
  },
  // ...其他mutation实现
};
```

## ⚡️ Pinia现代化方案
```bash
src/stores/
├── modules/
│   ├── userStore.ts     # 用户身份状态
│   ├── cartStore.ts    # 购物车状态
│   └── productStore.ts # 商品数据状态
├── index.ts            # 聚合模块导出
└── storagePlugin.ts    # 持久化插件
```
```typescript
// stores/modules/userStore.ts
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<Nullable<User>>(null);
  const permissions = ref<string[]>([]);
  
  const updateProfile = (payload: Partial<User>) => {
    userInfo.value = { ...userInfo.value, ...payload };
  };

  return { userInfo, permissions, updateProfile };
});
```

## 📊 性能优化
```typescript
// 动态注册状态模块
const lazyLoadStore = async (moduleName: string) => {
  const store = await import(`./modules/${moduleName}.ts`);
  pinia.use(store.default);
};

// 分片加载示例
const loadStateFragment = (fragment: keyof AppState) => {
  return fetch(`/api/state/${fragment}`)
    .then(res => res.json())
    .then(patch => store.$patch(patch));
};

// 防抖批量更新
const debouncedUpdate = useDebounceFn((updates: UpdatePayload) => {
  store.$patch(updates);
}, 300);
```