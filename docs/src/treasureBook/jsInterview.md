# 📚 JavaScript 基础指南

**在 JavaScript 基础指南原理解析**，覆盖变量、作用域、this、闭包、原型链等核心难点，附**易错点标注**和**扩展说明**，助你吃透原理：


## 📦 **一、变量与作用域**
#### 1. `var`、`let`、`const` 的区别？
- **答案**：  
  - `var`：函数作用域，允许重复声明，存在变量提升（初始化前访问为 `undefined`）。  
  - `let`/`const`：块级作用域，禁止重复声明，存在暂时性死区（TDZ，声明前访问报错）。  
  - `const` 声明常量，**必须初始化**，且引用类型（如对象/数组）内容可变，地址不可变。  
- **典型陷阱**：  
  ```javascript
  for (var i = 0; i < 5; i++) {} 
  console.log(i); // 5（var 全局污染）
  for (let i = 0; i < 5; i++) {}
  console.log(i); // 报错（let 块级作用域）
  ```

#### 2. 以下代码输出什么？为什么？
```javascript
console.log(a); // ?
var a = 1;
```
- **答案**：`undefined`（变量提升仅提升声明，未提升赋值）。  
- **扩展**：等价于 `var a; console.log(a); a=1;`。


## 🎯 **二、this 绑定**
#### 3. 箭头函数的 `this` 指向谁？普通函数呢？
- **答案**：  
  - 箭头函数：**继承外层作用域的 this**（静态绑定，定义时确定）。  
  - 普通函数：**调用时确定**（默认指向 `window`，严格模式 `undefined`，通过 `call/apply/bind` 或对象调用改变）。  
- **经典案例**：  
  ```javascript
  const obj = {
    name: '豆包',
    fn: function() {
      setTimeout(() => {
        console.log(this.name); // '豆包'（箭头函数继承 fn 的 this）
      }, 100);
    }
  };
  obj.fn();
  ```

#### 4. 以下代码 `this` 指向？
```javascript
function Foo() {
  this.a = 1;
}
const obj = new Foo();
console.log(obj.a); // 1（构造函数中 this 指向实例）
```
- **原理**：`new` 调用时，函数内部 `this` 绑定新创建的对象。


## 🔒 **三、闭包与内存泄漏**
#### 5. 闭包是什么？有什么应用和缺点？
- **答案**：  
  - 说法一：**函数可以记住并访问其词法作用域的特性**，即使函数在声明的作用域之外执行。
  ```javascript
  const b = 1;
  function a() {
    console.log(b); // 1（访问外部变量）,这是闭包
  }
  ```
  - 说法二：**函数内部嵌套函数，且内部函数引用外部变量**，导致外部变量无法被垃圾回收。  
  - **应用**：数据封装（如私有变量）、柯里化、防抖节流。  
  - **缺点**：内存泄漏（需手动解除引用）。  
- **典型面试题**：  
  ```javascript
  function createCounter() {
    let count = 0;
    return function() { // 闭包捕获 count
      return count++;
    };
  }
  const counter = createCounter();
  console.log(counter()); // 0
  console.log(counter()); // 1（闭包保存状态）
  ```

#### 6. 以下代码会导致内存泄漏吗？为什么？
```javascript
function fn() {
  const a = {};
  return function() {
    console.log(a); // 闭包引用 a，a 无法被回收
  };
}
const f = fn(); // 内存泄漏（除非 f 被置为 null）
```
- **答案**：会，闭包持续引用外部变量 `a`。

#### 6.1. 为什么内存泄漏？
- **答案**：是指程序在运行过程中，由于某些原因导致部分内存无法被释放，随着时间的推移，这些未被释放的内存会不断累积，最终导致系统可用内存逐渐减少，影响程序的性能，甚至可能导致程序崩溃。（**`意外的全局变量`**、**`未清除的定时器和回调函数`**、**`闭包引起的内存泄漏`**、**`DOM 元素引用问题`**）

  - **1. 意外的全局变量**：如果在函数内部没有使用 `var`、`let` 或 `const` 声明变量，该变量会被自动添加到全局对象（在浏览器环境中是 `window` 对象）中，成为全局变量。全局变量不会被垃圾回收机制回收，除非手动将其置为 `null`。
  ```javascript
  function leak() {
      // 没有使用 var、let 或 const 声明变量
      leakedVariable = 'This is a leaked variable'; 
  }
  leak();
  // 在上述代码中，`leakedVariable` 成为了全局变量，即使 `leak` 函数执行完毕，它也不会被回收，从而造成内存泄漏。
  ```
  > **解决方法**：使用 `var`、`let` 或 `const` 声明变量，确保变量在函数执行完毕后被正确释放。

  - **2. 未清除的定时器和回调函数**：当使用 `setInterval` 或 `setTimeout` 创建定时器时，如果在不需要这些定时器时没有清除它们，定时器会一直存在，并且定时器内部的回调函数会一直引用外部的变量，导致这些变量无法被回收。
  ```javascript
  var timer;
  function createTimer() {
      const data = new Array(1000000).fill('data');
      timer = setInterval(() => {
          console.log(data.length);
      }, 1000);
  }
  createTimer();
  // 在上述代码中，`data` 数组被定时器的回调函数引用，即使 `createTimer` 函数执行完毕，`data` 数组也不会被回收，因为定时器一直存在。
  ```
  > **解决方法**：在不需要定时器时，使用 `clearInterval` 或 `clearTimeout` 清除定时器。例如：`clearInterval(timer);`

  - **3. 闭包引起的内存泄漏**：闭包可以访问其外部函数的变量，当闭包一直存在时，它所引用的外部变量也不会被回收。如果闭包使用不当，就可能导致内存泄漏。
  ```javascript
  function outer() {
      const largeData = new Array(1000000).fill('data');
      return function inner() {
          return largeData.length;
      };
  }
  const closure = outer();
  // 在上述代码中，`closure` 是一个闭包，它引用了 `outer` 函数中的 `largeData` 数组。即使 `outer` 函数执行完毕，`largeData` 数组也不会被回收，因为 `closure` 一直存在。
  ```
  > **解决方法**：在不需要闭包时，手动将其置为 `null`。例如：`closure = null;`

  - **4. DOM 元素引用问题**：如果在 `JavaScript` 中保存了对 `DOM` 元素的引用，并且在不需要这些引用时没有及时释放，即使这些 `DOM` 元素已经从页面中移除，它们仍然会占用内存。
  ```javascript
  const element = document.getElementById('myElement');
  // 移除 DOM 元素
  document.body.removeChild(element);
  // 但是 element 变量仍然引用该元素，导致内存泄漏
  // 在这个例子中，虽然 `myElement` 已经从页面中移除，但 `element` 变量仍然引用该元素，因此该元素不会被垃圾回收。
  ```
  > **解决方法**：在不需要 `DOM` 元素引用时，手动将其置为 `null`。例如：`element = null;`


## ⛓️ **四、原型与继承**
#### 7. 原型链是什么？如何实现继承？
- **答案**：  
  - 原型链是对象通过 `__proto__` 连接形成的链式结构，用于实现属性继承（如 `obj.toString()` 来自 `Object.prototype`）。  
  - **经典继承方式**：`Child.prototype = Object.create(Parent.prototype)`（ES5）或 `class Child extends Parent`（ES6）。  
- **必考题**：  
  ```javascript
  const obj = {};
  console.log(obj.__proto__ === Object.prototype); // true
  console.log(Object.prototype.__proto__); // null（原型链终点）
  ```

#### 8. `instanceof` 的原理？
- **答案**：检查实例的 `__proto__` 是否在构造函数的 `prototype` 链上。  
  ```javascript
  [] instanceof Array; // true（[] 的 __proto__ 是 Array.prototype）
  [] instanceof Object; // true（Array.prototype.__proto__ 是 Object.prototype）
  ```


## ⏳ **五、异步与事件循环**
#### 9. 以下代码执行顺序？（事件循环经典题）
```javascript
console.log('start');
setTimeout(() => {
  console.log('timeout');
}, 0);
Promise.resolve().then(() => {
  console.log('promise1');
  setTimeout(() => {
    console.log('timeout2');
  }, 0);
});
console.log('end');
```
- **答案**：  
  `start` → `end` → `promise1` → `timeout` → `timeout2`  
- **原理**：  
  1. 同步任务立即执行（`start`、`end`）。  
  2. `setTimeout` 进入宏任务队列。  
  3. `Promise` 回调进入微任务队列，优先于宏任务执行（`promise1`）。  
  4. 微任务执行完毕，执行宏任务（`timeout`）。  
  5. 宏任务中嵌套的 `setTimeout` 再次进入宏任务队列，下一轮循环执行（`timeout2`）。


## 📋 **六、数组与对象**
#### 10. `Array.prototype.push` 的返回值是什么？
- **答案**：新数组的长度（而非数组本身）。  
  ```javascript
  const arr = [1];
  console.log(arr.push(2)); // 2（数组变为 [1,2]）
  ```

#### 11. 深浅拷贝的区别？如何实现？
- **答案**：  
  - 浅拷贝：复制一层，对象/数组引用不变（如 `slice`、`concat`、展开运算符）。  
  - 深拷贝：递归复制所有层级（如 `JSON.parse/stringify`，但无法复制函数/循环引用）。  
- **面试陷阱**：  
  ```javascript
  const a = { b: 1 };
  const b = { ...a }; // 浅拷贝，修改 b.b 不影响 a（基本类型值复制）
  const c = { d: a };
  const d = { ...c }; // 浅拷贝，d.d 与 c.d 指向同一对象（引用类型共享）
  ```


## ⚠️ **七、特殊值与运算符**
#### 12. 以下输出什么？为什么？
```javascript
console.log(typeof null); // 'object'（历史遗留问题）
console.log(typeof NaN); // 'number'（NaN 是特殊数值）
console.log(1 + '2'); // '12'（字符串拼接优先级高于数字加法）
console.log(void 0); // undefined（等价于 `undefined`，避免变量被污染）
```


## ❗ **八、高频易错点总结**
| 问题 | 正确答案 | 错误原因 |
|------|----------|----------|
| `0.1 + 0.2 === 0.3` | `false` | 浮点数精度问题（改用 `toFixed` 或库） |
| `[] == false` | `true` | 隐式转换：`[]` 转数字为 `0`，`false` 转数字为 `0` |
| `function a() {} typeof a` | `'function'` | 函数是特殊对象，`typeof` 直接返回 `'function'` |


## 🧠 **九、V8引擎原理**
- 隐藏类（Hidden Class）工作机制
- 垃圾回收算法对比（新生代/老生代）
- 字节码与即时编译（Ignition+TurboFan）


## ⚡ **十、性能优化实战**
- 使用Performance API进行运行时监控
- 内存泄漏检测工具使用指南（Chrome DevTools Memory面板）


## 💡 **学习建议**
1. **画图辅助**：手写原型链、作用域链、事件循环流程，直观理解抽象概念。  
2. **控制台验证**：遇到不确定的问题，立即在 Chrome DevTools 中运行代码（如 `var/let` 作用域对比）。  
3. **错题归类**：整理高频错题（如 `this` 绑定、闭包内存），标注原理（如“箭头函数静态绑定”）。  
4. **实战模拟**：用 LeetCode 简单题（如 [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)）练习 JS 基础操作。
