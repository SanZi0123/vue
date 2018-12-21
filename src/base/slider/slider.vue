<template>
  <!-- 轮播图组件 -->
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item,index) in dots"
        :key="index"
        :class="{active:currentPageIndex == index}"
      ></span>
    </div>
  </div>
</template>
<script>
import BSchool from "better-scroll"; //better-scroll滑动
import { addClass } from "@/common/js/dom.js"; //dom操作的添加类名

export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      //自动轮播
      if (this.autoPlay) {
        this._play();
      }
      // 监听窗口大小变化
      window.addEventListener("resize", () => {
        if (!this.slider) {
          return;
        }
        this._setSliderWidth(true);
        this.slider.refresh();
      });
    }, 20);
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    // 设置轮播
    _setSliderWidth(isResiza) {
      let width = 0;
      // 获取轮播数量
      this.children = this.$refs.sliderGroup.children;
      // 定义单页宽度
      let sliderWidth = this.$refs.slider.clientWidth;

      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        // 动态插入类名
        addClass(child, "slider-item");
        child.style.width = sliderWidth + "px";
        // 设置总宽度
        width += sliderWidth;
      }
      // 如果轮播就多设两个宽度
      if (this.loop && !isResiza) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    // 轮播小标
    _initDots() {
      this.dots = new Array(this.$refs.sliderGroup.children.length);
    },
    // 设置beeter-scrool
    _initSlider() {
      this.slider = new BSchool(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        click: true
      });
      // beeter-scroll绑定一个滚动结束事件
      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        // console.log(pageIndex);
        this.currentPageIndex = pageIndex;

        // 清除定时器
        if (this.autoPlay) {
          clearTimeout(this.timer);
          this._play();
        }
      });
    },
    // 自动播放
    _play() {
      this.timer = setTimeout(() => {
        this.slider.next();
      }, this.interval);
    }
  }
};
</script>

<style lang="less">
.slider {
  width: 100%;
  position: relative;
  overflow: hidden;
  .slider-group {
    position: relative;
    overflow: hidden;
  }
  .slider-item {
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-decoration: none;
    }
    img {
      display: inline-block;
      width: 100%;
    }
  }
  .dots {
    position: absolute;
    width: 100%;
    bottom: 10px;
    text-align: center;
  }
  .dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    margin: 2px 5px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    &.active {
      width: 6px;
      height: 6px;
      background-color: #fff;
    }
  }
}
</style>