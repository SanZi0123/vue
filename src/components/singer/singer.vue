<template>
  <!-- 歌手 -->
  <list-view class="singer" :data="singerList"></list-view>
</template>
<script>
import { getSingerList } from "@/api/singer"; //歌手接口
import { ERR_OK } from "@/api/config";
import Singer from "@/common/js/singer";
import ListView from "@/base/listview/listview";

const HOT_NAME = "热门";
const HOT_SINGER_LEN = "10";

export default {
  data() {
    return {
      singerList: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    // 获取歌手列表
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singerList = this._normalizeSinger(res.data.list);
          // console.log(this.singerList, "我是歌手列表");
        }
      });
    },
    // 整理排序歌手列表
    _normalizeSinger(list) {
      // 定义承载的空对象
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      // 循环数据插入map对象
      list.forEach((item, index) => {
        // 前十个为热门
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }
        // 将其他的插入map
        const key = item.Findex;
        if (!map[key]) {
          // 为没有的创建对象
          map[key] = {
            title: key,
            items: []
          };
        }
        // 插入
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      // 将map对象整理成有序列表
      let hot = [],
        other = [];
      // 热门和字母排序分开
      for (let key in map) {
        if (map[key].title == HOT_NAME) {
          hot.push(map[key]);
        } else if (map[key].title.match(/[a-zA-Z]/)) {
          other.push(map[key]);
        }
      }
      // 排序
      other.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });

      return hot.concat(other);
    }
  },
  components: {
    ListView
  }
};
</script>
<style lang="less">
.singer {
  position: fixed;
  width: 100%;
  top: 110px;
  bottom: 0;
  overflow: hidden;
}
</style>