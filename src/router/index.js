import Vue from 'vue'
import Router from 'vue-router'
import text from '@/components/text'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: text
    },
    {
      path: '*',
      redirect: {
        name: 'text',
      },
    }
  ]
})
