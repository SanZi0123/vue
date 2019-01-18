<template>
  <div class="songs">
    <ul>
      <li v-for="song in songs" :key="song.index">
        <div class="songDT">{{song.name}}</div>
        <div class="songDB">
          <span>{{song.singer}}</span>
          <span>·</span>
          <span>{{song.album}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    bKImg: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
};
</script>
<style lang="less">
.songs {
  color: #000;
  text-align: left;
  li {
    width: 100%;
    height: 3.5rem;
    line-height: 1.5rem;
    .songDT {
      width: 100%;
      overflow: hidden;
      font-size: 1rem;
      color: #000;
    }
    .songDB {
      width: 100%;
      overflow: hidden;
      font-size: 0.7rem;
      color: #666;
    }
  }
}
</style>