<template>
  <!-- 导航栏 -->
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>
<script>
export default {};
</script>
<style>
.tab {
  position: relative;
  width: 100%;
  height: 48px;
  background-color: black;
  color: #fff;
  line-height: 3rem;
  font-size: 1.1rem;
}
.tab .tab-item {
  float: left;
  width: 25%;
  height: 100%;
  text-align: center;
}
.router-link-active .tab-link {
  padding-bottom: 5px;
  color: orange;
  border-bottom: 1px orange solid;
}
</style>