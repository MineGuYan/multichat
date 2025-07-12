<script setup lang="ts">
import '../assets/iconfont/iconfont.css'
import api from '../api/request.ts'
import {type Ref, ref, onMounted} from 'vue'
import {marked} from "marked";

type message = {
  userText: string,
  isLoading: boolean,
  aiText: string
}

export interface StreamResult {
  type: "chunk" | "end" | "error";
  content: string;
}

let llm: string[]
let sessionId: string
let chatting: boolean = false
const currentModel = ref('')
const uerInput = ref('')
const messages: Ref<message[]> = ref([])

async function getModels() {
  const response = await api.get("/chat/models")
  llm = response.data.data
  currentModel.value = llm[0]
}

async function createSession() {
  const response = await api.get("/chat/create")
  sessionId = response.data.data.sessionId
}

async function sendMessage() {
  if (uerInput.value === '')return
  if (chatting)return

  messages.value.push({
    userText: uerInput.value,
    isLoading: true,
    aiText: ''
  })

  uerInput.value = ''

  const baseURL = api.defaults.baseURL || "";
  try {
    chatting = true

    const response = await fetch(`${baseURL}/chat/${sessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        message: messages.value[messages.value.length - 1].userText,
        model: currentModel.value
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    messages.value[messages.value.length - 1].isLoading = false

    // 处理流式响应
    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error("无法获取响应流")
    }

    const decoder = new TextDecoder()
    let content = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split("\n")

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = JSON.parse(line.slice(6)) as StreamResult;

          if (data.type === "chunk") {
            // 追加内容到AI消息
            content+=data.content;
            messages.value[messages.value.length - 1].aiText = marked(content) as string
          } else if (data.type === "end") {
            break
          } else if (data.type === "error") {
            console.error(`对话出错: ${data.content}`)
            break
          }
        }
      }
    }
  }catch (error){
    console.error(error)
  }finally {
    chatting = false
  }
}

function handleEnter(e: KeyboardEvent) {
  e.preventDefault();
  sendMessage();
}

function handleShiftEnter() {
  // 允许换行
}

function createNewChat(){
  createSession()
  messages.value=[]
}

onMounted(() => {
  getModels()
  createSession()
})
</script>

<template>
  <div class="sidebar">
    <ul>
      <li><i class="iconfont icon-ai"></i></li>
      <li><i class="iconfont icon-zhankaicebianlan"></i></li>
      <li><i class="iconfont icon-duihuakuang" @click="createNewChat"></i></li>
    </ul>
    <router-link to="/" class="button"><i class="bottom iconfont icon-tuichu"></i></router-link>
  </div>

  <div class="chatting">
    <h1>AI聊天助手</h1>
    <p>你好，我是你的AI助手！请问有什么可以帮助你的吗？</p>
    <hr>
    <div v-for="message in messages">
      <div class="avatar">用户</div>
      <div class="bubble user-bubble">{{ message.userText }}</div>
      <div class="avatar">AI</div>
      <div v-show="message.isLoading" class="loading-spinner"></div>
      <div v-show="!message.isLoading" class="bubble ai-bubble" v-html="message.aiText"></div>
    </div>
  </div>

  <div class="input-box">
    <textarea placeholder="向AI助手发送信息..."
              v-model="uerInput"
              @keydown.enter.exact="handleEnter"
              @keydown.shift.enter="handleShiftEnter"></textarea>
    <select v-model="currentModel" id="llm-select">
      <option v-for="model in llm">{{ model }}</option>
    </select>
    <i class="iconfont icon-jiantou2-copy-copy" @click="sendMessage()"></i>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

i {
  font-size: 50px;
  cursor: pointer;
}

.bottom {

}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
  background-color: #212327;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
  padding-top: 20px;
}

.chatting {
  text-align: center;
  margin: 20px auto;
  max-width: 70%;
}

.input-box {
  text-align: center;
  background-color: #212327;
  position: fixed;
  bottom: 0;
  left: 55%;
  transform: translateX(-50%);
  width: 70%;

}

textarea {
  resize: none;
  width: 80%;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
}

.bubble {
  padding: 12px 16px;
  border-radius: 18px;
  line-height: 1.4;
  position: relative;
  word-wrap: break-word;
}

.ai-bubble {
  background-color: white;
  color: #333;
  border-top-left-radius: 4px;
}

.user-bubble {
  background-color: #007bff;
  color: white;
  border-top-right-radius: 4px;
}
</style>