<template>
  <!-- 歌手详情页 -->
  <div id="music-list">
    <!-- 上边图片部分 -->
    <div>
      <div class="back" @click="backSinger"><</div>
      <h1 class="title">{{title}}</h1>
      <div class="avatar" :style="backgroundImg"></div>
    </div>
    <!-- 下边歌曲列表部分 -->
    <scroll
      :data="songs"
      :probe-type="probeType"
      :listenScroll="listenScroll"
      @scroll="scroll"
      class="list"
    >
      <div class="songsBox">
        <song-list :title="title" :bKImg="bKImg" :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>
<script>
import SongList from "@/base/song-list/song-list";
import Scroll from "@/base/scroll/scroll";
export default {
  data() {
    return {
      // Y轴滑动值
      scrollY: 0
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    bKImg: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: []
    }
  },
  created() {
    // scroll参数
    this.probeType = 3;
    this.listenScroll = true;
  },
  methods: {
    backSinger() {
      this.$router.push("/singer");
    },
    // scroll传过来的移动值
    scroll(pos) {
      this.scrollY = pos.y;
    }
  },
  computed: {
    backgroundImg() {
      return `background-image:url(${this.bKImg})`;
    }
  },
  components: {
    SongList,
    Scroll
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
  .list {
    position: fixed;
    width: 100%;
    top: 295px;
    bottom: 0;
    overflow: hidden;
    .songsBox {
      padding: 10px 25px 15px;
    }
  }
}
</style>
