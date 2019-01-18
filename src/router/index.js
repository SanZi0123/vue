import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
// 推荐页
const Recommend = (resolve) => {
  import('@/components/recommend/recommend').then((module) => {
    resolve(module)
  })
}
// 歌手页
const singer = (resolve) => {
  import('@/components/singer/singer').then((module) => {
    resolve(module)
  })
}
// 歌手详情页
const SingerDetail = (resolve) => {
  import('@/components/singer-detail/singerDetail').then((module) => {
    resolve(module)
  })
}
// 排行榜
const Rank = (resolve) => {
  import('@/components/rank/rank').then((module) => {
    resolve(module)
  })
}
// 搜索页
const Search = (resolve) => {
  import('@/components/search/search').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
