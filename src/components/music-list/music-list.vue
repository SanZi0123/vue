<template>
  <div id="music-list">
    <div class="back" @click="backSinger"><</div>
    <h1 class="title">{{title}}</h1>
    <div class="avatar" :style="backgroundImg"></div>
    <div class="songs"></div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    backSinger() {
      this.$router.push("/singer");
    }
  },
  computed: {
    backgroundImg() {
      return `background-image:url(${this.avatar})`;
    }
  }
};
</script>
<style lang="less">
#music-list {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  text-align: center;
  background-color: #eee;
  color: #fff;
  .back {
    position: absolute;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: 1.3rem;
  }
  .title {
    height: 2rem;
    line-height: 2rem;
    background-color: #000;
    font-size: 1rem;
  }
  .avatar {
    width: 100%;
    padding-top: 70%;
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
</style>
