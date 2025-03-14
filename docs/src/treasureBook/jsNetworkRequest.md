# 📚 JavaScript 网络请求

在现代Web开发中，**网络请求**是与服务器交互的核心手段。本文将从基础API到高级应用，系统讲解JavaScript网络请求的技术要点和最佳实践。

## 🌐 一、核心请求方法
#### 1. XMLHttpRequest（传统方式）
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data');

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.error('请求失败:', xhr.statusText);
  }
};

xhr.onerror = function() {
  console.error('网络连接异常');
};

xhr.send();
```

#### 2. Fetch API（现代方式）
```javascript
// 基础GET请求
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) throw new Error('网络响应异常');
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('请求失败:', error));

// POST请求示例
fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token'
  },
  body: JSON.stringify({ key: 'value' })
});
```

#### 3. Axios（第三方库）
```javascript
axios.get('https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error('请求失败:', error));

// 并发请求
Promise.all([
  axios.get('/api/users'),
  axios.get('/api/posts')
]).then(([usersRes, postsRes]) => {
  console.log('用户数据:', usersRes.data);
  console.log('文章数据:', postsRes.data);
});
```

## 🛡️ 二、请求控制
#### 4. 中断请求
```javascript
// Fetch中断
const controller = new AbortController();

fetch('/api/data', {
  signal: controller.signal
}).catch(err => {
  if (err.name === 'AbortError') {
    console.log('请求被主动取消');
  }
});

// 5秒后取消请求
setTimeout(() => controller.abort(), 5000);

// Axios中断
const source = axios.CancelToken.source();
axios.get('/api/data', {
  cancelToken: source.token
});
source.cancel('用户取消操作');
```

## 🌉 三、跨域处理
#### 5. CORS配置
```javascript
// 服务端响应头示例
Access-Control-Allow-Origin: https://your-domain.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type, Authorization
```

#### 6. 代理方案
```javascript
// 开发环境代理配置（vite.config.js）
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://backend-service:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
```

## 🔐 四、安全认证
#### 7. Cookie认证
```javascript
// 携带凭据
fetch('/api/auth', {
  credentials: 'include' // 等价于axios的withCredentials: true
});

// 设置Cookie属性
document.cookie = `sessionId=abc123; Path=/; Secure; SameSite=Strict`;
```

#### 8. JWT认证
```javascript
// 请求头携带Token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🚀 五、性能优化
#### 9. 缓存策略
```javascript
// 强制缓存验证
fetch('/api/data', {
  headers: {
    'Cache-Control': 'max-age=300' // 缓存5分钟
  }
});

// 版本化请求
axios.get('/api/data?v=20230815');
```

#### 10. 数据压缩
```javascript
// 服务端启用gzip
// nginx配置示例
gzip on;
gzip_types text/plain application/json;
```

## 📊 六、监控调试
#### 11. 性能指标
```javascript
const { duration, decodedBodySize } = performance.getEntriesByName(url)[0];
console.log(`下载${decodedBodySize}字节，耗时${duration}ms`);

// 超时警告
if (duration > 3000) {
  console.warn('请求响应时间过长');
}
```

## 💡 最佳实践
1. **超时兜底**：所有请求必须设置超时时间
2. **错误重试**：网络错误时自动重试（最多3次）
3. **取消重复**：相同请求未完成时阻止重复发送
4. **数据校验**：验证响应数据格式
5. **安全审计**：定期检查请求头安全配置

// 请求重试示例
const fetchWithRetry = (url, retries = 3) => {
  return fetch(url).catch(err => 
    retries > 1 ? fetchWithRetry(url, retries - 1) : Promise.reject(err)
  );
};
```

该补充内容与现有技术文档保持一致的以下特点：
1. 结构化知识体系（分章节+子模块）
2. 实用代码示例（包含基础用法和典型场景）
3. 最佳实践指导（强调工程化规范）
4. 面试高频考点覆盖（跨域、安全、性能）
5. 可视化代码标注（关键逻辑中文注释）

建议后续可以补充「WebSocket实时通信」和「GraphQL请求优化」等进阶章节，形成完整的前端网络知识体系。