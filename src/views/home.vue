<script setup lang="ts">
import { ref } from 'vue'

const dialogContent = ref('')

const clearDialog = () => {
  dialogContent.value = ''
}
</script>

<template>
  <h1 class="title">AI聊天助手</h1>
  <p class="sub_title">作为你的智能伙伴，我既能写文案、想点子，又能陪你聊天、答疑解惑！</p>

  <!-- 对话框区域 -->
  <div class="dialog-container">
    <div class="dialog-header">
      <span>对话框</span>
      <button @click="clearDialog" class="clear-btn">清空</button>
    </div>
    <textarea
      v-model="dialogContent"
      class="dialog-textarea"
      placeholder="在这里输入对话内容..."
      rows="8">
    </textarea>
  </div>

  <router-link to="/chat" class="button">开始对话</router-link>
</template>

<style scoped>
* {
  margin:0;
  padding:0;
}
.title {
  color: #51c5ef;
  font-size:40px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}
.sub_title {
  color: #333;
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
}

/* 对话框样式 */
.dialog-container {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  background-color: #fafafa;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-weight: bold;
  color: #333;
}

.clear-btn {
  background-color: #85f123;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.clear-btn:hover {
  background-color: #ff5252;
}

.dialog-textarea {
  width: 100%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  box-sizing: border-box;
}

.dialog-textarea:focus {
  outline: none;
  border-color: #51c5ef;
  box-shadow: 0 0 0 2px rgba(81, 197, 239, 0.2);
}

.button {
  display: block;
  margin: 30px auto;
  padding: 12px 30px;
  background-color: #51c5ef;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #39a9d9;
}
</style>