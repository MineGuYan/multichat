<script setup lang="ts">
import '../assets/iconfont/iconfont.css'
import api from '../api/request.ts'

const llm = api.get("/chat/models")



</script>

<template>
  <div class="sidebar">
    <ul>
      <li><i class="iconfont icon-ai"></i></li>
      <li><i class="iconfont icon-zhankaicebianlan"></i></li>
      <li><i class="iconfont icon-duihuakuang"></i></li>
    </ul>
  </div>
  <div class="chatting">

  </div>
  <div class="input-box">

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
}

.input-box {

}
</style>