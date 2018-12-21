<template>
  <!--列表数据组件  -->
  <scroll
    class="list-view"
    @scroll="scroll"
    :data="data"
    :listen-scroll="listenScroll"
    :probeType="probeType"
    ref="listview"
  >
    <ul>
      <li v-for="group in data" :key="group.index" ref="listGorup">
        <h3>{{group.title}}</h3>
        <ul>
          <li class="group-item" v-for="item in group.items" :key="item.index">
            <img v-lazy="item.avatar">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="shortcut"
      @touchstart.stop.prevent="onTouchStart"
      @touchmove.stop.prevent="onTouchMove"
    >
      <ul>
        <li
          v-for="(item,index) in shortcutList"
          :key="index"
          :data_index="index"
          :class="{'current':currentIndex == index}"
        >{{item}}</li>
      </ul>
    </div>
    <loading v-show="!data.length"></loading>
  </scroll>
</template>
<script>
import Scroll from "@/base/scroll/scroll";
import Loading from "@/base/loading/loading";
import { getData } from "@/common/js/dom"; //设置获取dom属性

const LETTER_HEIGHT = 21;

export default {
  data() {
    return {
      scrollY: -1, //滑动的Y轴距离
      probeType: 3, //bette-scroll滑动
      currentIndex: 0 //字母索引
    };
  },
  created() {
    this.listenScroll = true; //是否滚动滚动
    this.touch = {}; //滑动时储存数据对象
    this.listHeight = []; //内容高度
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    }
  },
  methods: {
    // 左侧字母点击事件
    onTouchStart(e) {
      // 获取点击索引
      let currentIndex = getData(e.target, "index");
      if (currentIndex) {
        this.currentIndex = currentIndex;
      }
      this._scrollTo(this.currentIndex);
      // 移动检测
      let firstMove = e.touches[0];
      this.touch.y1 = firstMove.pageY;
      this.touch.currentIndex = currentIndex;
    },
    // 字母滑动事件
    onTouchMove(e) {
      let firstMove = e.touches[0];
      this.touch.y2 = firstMove.pageY;
      let moveDistance = parseInt((this.touch.y2 - this.touch.y1) / 20);
      let moveIndex = parseInt(this.touch.currentIndex) + moveDistance;

      this._scrollTo(moveIndex);
    },
    // 滚动事件
    _scrollTo(index) {
      this.$refs.listview.scrollElement(this.$refs.listGorup[index], 200);
    },
    //滚动scroll里的移动距离
    scroll(pos) {
      this.scrollY = pos.y;
    },
    // 计算内容高度
    _calculateHeight() {
      const list = this.$refs.listGorup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
        // console.log(this.listHeight, "这是内容高度");
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    // 监听Y轴滚动值
    scrollY(newY) {
      const listHeight = this.listHeight;
      // 当滚动到顶部时
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 当在元素中间时
      for (let i = 0; i < listHeight.length; i++) {
        let heigth1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= heigth1 && -newY < height2) {
          // console.log(i,"我是index");
          this.currentIndex = i;
        }
      }
    }
  },
  components: {
    Loading,
    Scroll
  }
};
</script>
<style lang="less">
.list-view {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;
  h3 {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    text-align: left;
    color: #666;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  .group-item {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      padding: 10px 0;
      border-radius: 50%;
      margin-left: 25px;
    }
    span {
      margin-left: 20px;
    }
  }
  .shortcut {
    position: absolute;
    top: 5%;
    right: 5px;
    padding: 5px 2px;
    font-size: 13px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    li {
      width: 16px;
      text-align: center;
      padding: 2px 0;
    }
    .current {
      color: orangered;
    }
  }
}
</style>