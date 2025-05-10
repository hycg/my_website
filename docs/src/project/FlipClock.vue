<template>
  <div id="flipClockApp">
    <div class="time">
      <!-- 使用 v-for 渲染时钟列 -->
      <div class="col" v-for="(digit, index) in timeDigits.slice(0, 2)" :key="index">
        <div class="flip" :class="{ active: shouldFlip[index] }">
          <div class="next" :data-t="nextTimeDigits[index]"></div>
          <div class="curr" :data-t="digit"></div>
        </div>
        <div class="next" :data-t="nextTimeDigits[index]"></div>
        <div class="curr" :data-t="digit"></div>
      </div>
      <!-- 新增冒号元素 -->
      <div class="colon">
        <div class="colon-dot"></div>
        <div class="colon-dot"></div>
      </div>
      <div class="col" v-for="(digit, index) in timeDigits.slice(2, 4)" :key="index + 2">
        <div class="flip" :class="{ active: shouldFlip[index + 2] }">
          <div class="next" :data-t="nextTimeDigits[index + 2]"></div>
          <div class="curr" :data-t="digit"></div>
        </div>
        <div class="next" :data-t="nextTimeDigits[index + 2]"></div>
        <div class="curr" :data-t="digit"></div>
      </div>
      <!-- 新增冒号元素 -->
      <div class="colon">
        <div class="colon-dot"></div>
        <div class="colon-dot"></div>
      </div>
      <div class="col" v-for="(digit, index) in timeDigits.slice(4, 6)" :key="index + 4">
        <div class="flip" :class="{ active: shouldFlip[index + 4] }">
          <div class="next" :data-t="nextTimeDigits[index + 4]"></div>
          <div class="curr" :data-t="digit"></div>
        </div>
        <div class="next" :data-t="nextTimeDigits[index + 4]"></div>
        <div class="curr" :data-t="digit"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 存储当前时间的每一位数字
const timeDigits = ref(['0', '0', '0', '0', '0', '0']);
// 存储下一个时间的每一位数字
const nextTimeDigits = ref(['0', '0', '0', '0', '0', '0']);
// 存储每一位数字是否需要翻转的状态
const shouldFlip = ref([false, false, false, false, false, false]);

// 获取格式化后的时间字符串
const getTimeStr = (date = new Date()) =>
  [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((item) => String(item).padStart(2, '0'))
    .join('');

// 更新时间显示
const updateTime = () => {
  const currStr = getTimeStr();
  const newTimeDigits = currStr.split('');
  nextTimeDigits.value = newTimeDigits;

  // 检查哪些数字需要翻转
  newTimeDigits.forEach((digit, i) => {
    shouldFlip.value[i] = timeDigits.value[i] !== digit;
    if (shouldFlip.value[i]) {
      setTimeout(() => {
        timeDigits.value[i] = digit;
        shouldFlip.value[i] = false;
      }, 500);
    }
  });
};

// 循环更新时间
const run = () => {
  updateTime();
  setTimeout(run, 1000 / 60);
};

onMounted(() => {
  // 初始化时间
  const initTimeStr = getTimeStr();
  timeDigits.value = initTimeStr.split('');
  nextTimeDigits.value = initTimeStr.split('');
  run();
});
</script>

<style scoped>
#flipClockApp {
  --body-bg: #333;
  /* 网页背景颜色 */
  --font-size: 6rem;
  /* 时钟字体大小 */
  --center-border: 0.3rem solid #000;
  /* 翻页中间的边框色 */
  --col-width: 5rem;
  /* 6个时间块的宽度 */
  --col-height: 7rem;
  /* 时钟高度 */
  --col-color: #ddd;
  /* 时钟字体颜色 */
  --col-bg: #1a1a1a;
  /* 时钟背景色 */
  --min-height: 12rem;
}

#flipClockApp {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: var(--min-height);
  margin: 0;
  background-color: var(--body-bg);
}

.time {
  width: 100%;
  min-height: var(--min-height);
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 1rem;
  font-family: sans-serif;
  font-weight: 700;
  overflow: hidden;
}

.col {
  width: var(--col-width);
  height: var(--col-height);
  perspective: var(--col-height);
}

.curr,
.next {
  position: relative;
  width: var(--col-width);
  height: calc(var(--col-height) / 2);
  font-size: var(--font-size);
  background: var(--col-bg);
  border-radius: 1rem;
  color: var(--col-color);
  overflow: hidden;
  box-sizing: border-box;
}

.flip .curr::before,
.flip .next::before,
.col > .curr::before,
.col > .next::before {
  position: absolute;
  content: attr(data-t);
  line-height: var(--col-height);
  text-align: center;
  height: var(--col-height);
  left: 0;
  right: 0;
}

.flip .curr::before,
.col > .next::before {
  top: 0;
}

.flip .next::before,
.col > .curr::before {
  bottom: 0;
}

.flip .curr,
.col > .next {
  border-bottom: var(--center-border);
}

.flip .next,
.col > .curr {
  border-top: var(--center-border);
}

.flip .next {
  transform: rotateX(-180deg);
  backface-visibility: hidden;
}

.flip .curr {
  position: absolute;
  top: 0;
  backface-visibility: hidden;
}

.flip {
  position: absolute;
  width: var(--col-width);
  height: var(--col-height);
  z-index: 1;
  transform-style: preserve-3d;
  transition: transform 0s;
  transform: rotateX(0);
}

.flip.active {
  transition: all 0.5s ease-in-out;
  transform: rotateX(-180deg);
}

/* 新增冒号样式 */
.colon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.colon-dot {
  width: 1rem;
  height: 1rem;
  background-color: var(--col-color);
  border-radius: 50%;
}
</style>