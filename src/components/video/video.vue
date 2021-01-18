<template>
  <div id="app">
    <EZUIKitJs />
    <p class="layui-text-bottom">
      <button class="layui-icon layui-icon-up" lay-submit="" lay-filter="add" onclick="control(0)"></button>
      <button class="layui-icon layui-icon-down" lay-submit="" lay-filter="add" onclick="control(1)"></button>
      <button class="layui-icon layui-icon-left" lay-submit="" lay-filter="add" onclick="control(2)"></button>
      <button class="layui-icon layui-icon-right" lay-submit="" lay-filter="add" onclick="control(3)"></button>
      <button class="layui-icon icon-pause" lay-submit="" lay-filter="add" onclick="stop()"></button>
      <button class="layui-icon icon-plus-circle" lay-submit="" lay-filter="add" onclick="control(8)"></button>
      <button class="layui-icon icon-minus-circle" lay-submit="" lay-filter="add" onclick="control(9)"></button>
    </p>
  </div>

</template>

<script>
import EZUIKitJs from './EZUIKitJs.vue'

export default {
  name: 'App',
  components: {
    EZUIKitJs
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
