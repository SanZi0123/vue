<template>
  <transition name="slide">
    <music-list :title="title" :avatar="backgroundImg" :songs="songs"></music-list>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "@/api/singer";
import { ERR_OK } from "@/api/config";
import { createSong } from "@/common/js/song";
import MusicList from "@/components/music-list/music-list";

export default {
  computed: {
    title() {
      return this.getSinger.name;
    },
    backgroundImg() {
      return this.getSinger.avatar;
    },
    ...mapGetters(["getSinger"])
  },
  data() {
    return {
      songs: []
    };
  },
  created() {
    console.log(this.getSinger, "这是vuex的数据");
    this._getDetail();
  },
  methods: {
    // 获取歌手歌曲列表
    _getDetail() {
      if (!this.getSinger.id) {
        this.$router.push("/singer");
        return;
      }
      getSingerDetail(this.getSinger.id).then(res => {
        if (res.code == ERR_OK) {
          // console.log(res.data.list, "这是数据");
          this.songs = this._normalList(res.data.list);
        }
      });
    },
    _normalList(list) {
      let ret = [];
      list.forEach(item => {
        let musicData = item.musicData;
        // console.log(musicData, "数据");
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>
<style lang="less">
.slide-enter-active,
slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>