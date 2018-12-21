<template>
  <!-- loading组件 -->
  <div class="loading">
    <img src="./loading.gif" alt>
    <div>{{title}}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在加载中..."
    }
  }
};
</script>
<style lang="less">
.loading {
  position: absolute;
  width: 50%;
  top: 45%;
  left: 25%;
  text-align: center;
  img {
    width: 25%;
    margin-bottom: 5px;
  }
}
</style>