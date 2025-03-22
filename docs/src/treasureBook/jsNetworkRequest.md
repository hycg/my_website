# 📚 JavaScript 网络请求

在现代 Web 开发中，**网络请求**是与服务器交互的核心手段。本文将从基础 API 到高级应用，系统讲解 JavaScript 网络请求的技术要点和最佳实践。

## 🌐 一、核心请求方法

#### 1. XMLHttpRequest（传统方式）

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data");

xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.error("请求失败:", xhr.statusText);
  }
};

xhr.onerror = function () {
  console.error("网络连接异常");
};

xhr.send();
```

#### 2. Fetch API（现代方式）

```javascript
// 基础GET请求
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) throw new Error("网络响应异常");
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("请求失败:", error));

// POST请求示例
fetch("https://api.example.com/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your_token",
  },
  body: JSON.stringify({ key: "value" }),
});
```

#### 3. Axios（第三方库）

```javascript
axios
  .get("https://api.example.com/data")
  .then((response) => console.log(response.data))
  .catch((error) => console.error("请求失败:", error));

// 并发请求
Promise.all([axios.get("/api/users"), axios.get("/api/posts")]).then(
  ([usersRes, postsRes]) => {
    console.log("用户数据:", usersRes.data);
    console.log("文章数据:", postsRes.data);
  }
);
```

#### 4. 文件上传（XMLHttpRequest 与 Fetch 的区别）

```javascript
// XMLHttpRequest 文件上传（支持进度监控）
const xhrUpload = (file) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append("file", file);

  // 上传进度事件
  xhr.upload.onprogress = (e) => {
    const percent = Math.round((e.loaded / e.total) * 100);
    console.log(`上传进度: ${percent}%`);
  };

  xhr.open("POST", "/upload");
  xhr.send(formData);
};

// Fetch 文件上传（需手动处理请求体）
const fetchUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData, // 自动设置 Content-Type
    });
    return response.json();
  } catch (error) {
    console.error("上传失败:", error);
  }
};
```

## 🛡️ 二、请求控制

#### 1. 中断请求

```javascript
// Fetch中断
const controller = new AbortController();

fetch("/api/data", {
  signal: controller.signal,
}).catch((err) => {
  if (err.name === "AbortError") {
    console.log("请求被主动取消");
  }
});

// 5秒后取消请求
setTimeout(() => controller.abort(), 5000);

// Axios中断
const source = axios.CancelToken.source();
axios.get("/api/data", {
  cancelToken: source.token,
});
source.cancel("用户取消操作");
```

## 🌉 三、跨域处理

#### 1. CORS 配置

```javascript
// 服务端响应头示例
Access-Control-Allow-Origin: https://your-domain.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type, Authorization
```

#### 2. 代理方案

```javascript
// 开发环境代理配置（vite.config.js）
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://backend-service:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

## 🔐 四、安全认证

#### 1. Cookie 认证

```javascript
// 携带凭据
fetch("/api/auth", {
  credentials: "include", // 等价于axios的withCredentials: true
});

// 设置Cookie属性
document.cookie = `sessionId=abc123; Path=/; Secure; SameSite=Strict`;
```

#### 2. JWT 认证

```javascript
// 请求头携带Token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🚀 五、性能优化

#### 1. 缓存策略

```javascript
// 强制缓存验证
fetch("/api/data", {
  headers: {
    "Cache-Control": "max-age=300", // 缓存5分钟
  },
});

// 版本化请求
axios.get("/api/data?v=20230815");
```

#### 2. 数据压缩

```javascript
// 服务端启用gzip
// nginx配置示例
gzip on;
gzip_types text/plain application/json;
```

## 📊 六、监控调试

#### 1. 性能指标

```javascript
const { duration, decodedBodySize } = performance.getEntriesByName(url)[0];
console.log(`下载${decodedBodySize}字节，耗时${duration}ms`);

// 超时警告
if (duration > 3000) {
  console.warn("请求响应时间过长");
}
```

## 💡 最佳实践
1. **超时兜底**：所有请求必须设置超时时间
2. **错误重试**：网络错误时自动重试（最多3次）
3. **取消重复**：相同请求未完成时阻止重复发送
4. **数据校验**：验证响应数据格式
5. **安全审计**：定期检查请求头安全配置
<details>
  <summary>点击查看实例代码</summary>

  ```javascript
  // 超时控制（5秒超时）
  const fetchWithTimeout = (url, options = {}, timeout = 5000) => {
    const controller = new AbortController();
    options.signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
      throw new Error(`请求超时：${timeout}ms`);
    }, timeout);

    return fetch(url, options).finally(() => clearTimeout(timeoutId));
  };

  // 请求错误重试
  const fetchWithRetry = (url, retries = 3) => {
    return fetch(url).catch((err) =>
      retries > 1 ? fetchWithRetry(url, retries - 1) : Promise.reject(err)
    );
  };

  // 请求去重缓存
  const pendingRequests = new Map();

  const fetchDeduplicated = async (url, options) => {
    const requestKey = `${url}_${JSON.stringify(options)}`;

    if (pendingRequests.has(requestKey)) {
      return pendingRequests.get(requestKey);
    }

    const promise = fetch(url, options).finally(() =>
      pendingRequests.delete(requestKey)
    );

    pendingRequests.set(requestKey, promise);
    return promise;
  };

  // 数据格式校验
  const validateSchema = (schema) => (data) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    if (!validate(data)) {
      throw new Error(`数据校验失败: ${JSON.stringify(validate.errors)}`);
    }
    return data;
  };

  // 用户信息schema
  const userSchema = {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
    },
    required: ["id", "name"],
  };

  // 带校验的请求示例
  fetch("/api/user/123")
    .then((response) => response.json())
    .then(validateSchema(userSchema))
    .then((userData) => console.log("有效用户数据:", userData))
    .catch((error) => console.error("请求失败:", error));
  ```
</details>
