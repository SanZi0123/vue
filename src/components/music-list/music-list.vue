<template>
  <!-- 歌手详情页 -->
  <div id="music-list">
    <!-- 上边图片部分 -->
    <div>
      <!-- 上标题框 -->
      <div class="headBox">
        <!-- 返回键 -->
        <div class="back" @click="backSinger"><</div>
        <!-- 歌手名 -->
        <h1 class="title">{{title}}</h1>
      </div>
      <!-- 头像 -->
      <div class="avatar" :style="backgroundImg" ref="bkAvatar"></div>
      <!-- 上滑阴影 -->
      <div class="avatarModule" ref="avatarModule"></div>
    </div>
    <!-- 列表向上滚动后背景遮罩 -->
    <div class="bk-layer" ref="bklayer"></div>
    <!-- 下边歌曲列表部分 -->
    <scroll
      :data="songs"
      :probe-type="probeType"
      :listenScroll="listenScroll"
      @scroll="scroll"
      class="list"
      ref="list"
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
  mounted() {
    // 头像高度
    this.imgHeigth = this.$refs.bkAvatar.clientHeight;
    this.$refs.list.$el.style.top = `${this.imgHeigth + 30}px`;
    // 头像阴影高度
    this.$refs.avatarModule.style.height = `${this.imgHeigth}px`;
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
  watch: {
    // 歌曲列表滚动
    scrollY(newY) {
      // 滚动最大值
      let newYN = Math.max(-this.imgHeigth, newY);
      // 缩放比
      let scale = 1;
      // 列表遮罩位移
      this.$refs.bklayer.style.transform = `translate3d(0,${newYN}px,0)`;
      // 图片遮罩渐变
      if (newY < 0) {
        this.$refs.avatarModule.style.background = `rgba(0,0,0,${-newY /
          this.imgHeigth -
          0.2})`;
      } else {
        // 当向下拉动时设置照片缩放
        scale = 1 + newY / this.imgHeigth;
        this.$refs.list.$el.style.top = `${newY + this.imgHeigth + 30}px`;
        this.$refs.bklayer.style.transform = `translate3d(0,${newY}px,0)`;
        this.$refs.bkAvatar.style.transform = `scale(${scale})`;
      }
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
  .headBox {
    position: relative;
    background-color: #000;
    z-index: 99;
  }
  .avatarModule {
    position: absolute;
    width: 100%;
    top: 32px;
  }
  .back {
    position: absolute;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 1.3rem;
  }
  .title {
    height: 32px;
    line-height: 32px;
    font-size: 1rem;
  }
  .avatar {
    width: 100%;
    padding-top: 70%;
    background-repeat: no-repeat;
    background-size: 100%;
    transform-origin: top;
  }
  .list {
    position: fixed;
    width: 100%;
    bottom: 0;
    .songsBox {
      background-color: #eee;
      padding: 10px 25px 15px;
    }
  }
  .bk-layer {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
}
</style>
