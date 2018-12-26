import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const Home = {
  path: '/',
  name: 'Home',
  meta: {
    title: '推荐'
  },
  component: () => import('@/components/recommend/recommend')
}
export const recommend = {
  path: '/recommend',
  name: 'recommend',
  meta: {
    title: '推荐'
  },
  component: () => import('@/components/recommend/recommend')
}
export const singer = {
  path: '/singer',
  name: 'singer',
  meta: {
    title: '推荐'
  },
  component: () => import('@/components/singer/singer')
}
export const rank = {
  path: '/rank',
  name: 'rank',
  meta: {
    title: '排行'
  },
  component: () => import('@/components/rank/rank')
}
export const search = {
  path: '/search',
  name: 'search',
  meta: {
    title: '搜索'
  },
  component: () => import('@/components/search/search')
}

export default new Router({
  routes: [
    Home,
    recommend,
    singer,
    rank,
    search
  ]
})
