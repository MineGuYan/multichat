<script setup lang="ts">
import "../assets/iconfont/iconfont.css"
import { ref, onMounted, onUnmounted } from 'vue'

const currentColorIndex = ref(0)
let intervalId: number | null = null

// 定义颜色数组
const colors = [
  '#ff4444', '#ff8800', '#ffaa00', '#ffcc00', '#aaff00',
  '#44ff44', '#00ff88', '#00ffaa', '#00aaff', '#0088ff',
  '#4444ff', '#8800ff', '#aa00ff', '#cc00ff', '#ff00aa',
  '#ff0088', '#ff0044', '#ff4400', '#ff6600', '#ff8844'
]

onMounted(() => {
  // 每秒更新颜色索引
  intervalId = window.setInterval(() => {
    currentColorIndex.value = (currentColorIndex.value + 1) % colors.length
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

function getCharColor(index: number) {
  // 根据索引和当前颜色索引返回颜色
  const colorIndex = (index + currentColorIndex.value) % colors.length
  return colors[colorIndex]
}
</script>

<template>
  <!-- 新增的更新公告文字 -->
  <p class="update-notice">
    <span
      v-for="(char, index) in '模型更新，思考更深，推理更强，APP和API全面上线'"
      :key="index"
      :style="{ color: getCharColor(index) }"
      class="char"
    >
      {{ char }}
    </span>
  </p>

  <div class="header-container">
    <span class="iconfont icon-ai"></span>
    <h1 class="title">AI聊天助手</h1>
  </div>
  <p class="sub_title">作为你的智能伙伴，我既能写文案、想点子，还能陪你聊天、快跟我交流吧</p>

  <!-- 蓝色框包含开始对话按钮 -->
  <div class="chat-box">
    <router-link to="/chat" class="button">开始对话</router-link>
    <p class="description">与各种大模型免费对话，体验全新聊天模型</p>
  </div>
</template>

<style scoped>
* {
  margin:0;
  padding:0;
}

/* 新增的更新公告文字样式 */
.update-notice {
  font-size: 28px;
  text-align: center;
  margin: 55px 0 20px 0;
  font-weight: 500;
  background: linear-gradient(90deg, #2298ec, #2be182);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 65px;
}

.iconfont.icon-ai {
  font-size: 48px;
  color: #2e95df;
}

.title {
  color: #08b5ed;
  font-size: 40px;
  font-weight: bold;
  margin: 0;
}

.sub_title {
  color: #0e0b0b;
  font-size: 20px;
  text-align: center;
  margin-top: 25px;
}

/* 蓝色框样式 */
.chat-box {
  max-width: 400px;
  margin: 60px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(81, 197, 239, 0.3);
}


.button {
  display: inline-block;
  padding: 15px 30px;
  background-color: white;
  color: #078eef;
  text-decoration: none;
  border-radius: 8px;
  font-size: 28px;
  font-weight: bold;
  transition: all 0.3s;
  margin-bottom: 15px;
}

.button:hover {
  background-color: #c1c0bc;
  transform: translateY(-2px);
}

.description {
  color: #666;
  font-size: 18px;
  line-height: 1.5;
  margin: 0;
}

/* 动态字符颜色类 */
.char {
  display: inline-block;
  transition: color 0.3s ease;
  font-weight: 600;
}
</style>
