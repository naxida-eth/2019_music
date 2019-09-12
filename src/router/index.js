import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import search from '@/pages/search'
import playMusic from '@/pages/playMusic'
import rank from '@/pages/rank'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/playMusic',
      name: 'playMusic',
      component: playMusic
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
  ]
})
