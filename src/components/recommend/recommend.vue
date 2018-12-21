<template>
  <!-- 推荐 -->
  <div class="recommend">
    <!-- 滚动组件 -->
    <scroll class="recommend-cotent" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <!-- 轮播图组件 -->
          <slider>
            <div v-for="item in recommends" :key="item.index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <p>热门歌单推荐</p>
          <ul>
            <li v-for="item in discList" :key="item.index">
              <div class="icon">
                <img width="60px" height="60px" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2>{{item.creator.name}}</h2>
                <p>{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <loading v-show="!discList.length"></loading>
  </div>
</template>
<script>
import { getRecommend, getDiscList } from "@/api/recommend";
import { ERR_OK } from "@/api/config.js";
import Slider from "@/base/slider/slider"; //轮播组件
import Scroll from "@/base/scroll/scroll"; //滑动组件
import Loading from "@/base/loading/loading"; //loading组件

export default {
  data() {
    return {
      // 轮播图数据
      recommends: [],
      // 歌单数据
      discList: []
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    _getRecommend() {
      // 接口请求轮播图数据
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
          // console.log(res.data.slider,"这是轮播图数据");
        }
      });
    },
    _getDiscList() {
      // 接口请求歌单数据
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
          // console.log(this.discList, "这是歌单数据");
        }
      });
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
};
</script>
<style>
a,
ul,
li,
h1,
h2,
h3 {
  margin: 0;
  padding: 0;
  list-style: none;
}
.recommend {
  position: fixed;
  width: 100%;
  left: 0;
  top: 110px;
  bottom: 0;
  text-align: center;
  box-sizing: border-box;
  padding: 0 2%;
}
.recommend .recommend-cotent {
  height: 100%;
  overflow: hidden;
}
.recommend .recommend-list p {
  margin: 10px 0;
  color: #daa520;
}
.recommend .recommend-list li {
  display: flex;
  padding: 0 5px 20px 5px;
}
.recommend .recommend-list li .text {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  overflow: hidden;
}
.recommend .recommend-list .text h2 {
  font-size: 16px;
  text-align: left;
}
.recommend .recommend-list .text p {
  font-size: 14px;
  text-align: left;
  color: rgba(0, 0, 0, 0.4);
}
</style>