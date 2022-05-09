import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  }, {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../views/FeedBackView.vue'),
  }, {
    path: '/help',
    name: 'help',
    component: () => import('../views/HelpView.vue'),
  }, {
    path: '/corpus',
    name: 'corpus',
    component: () => import('../views/CorpusView.vue'),
  }, {
    path: '/newword',
    name: 'newword',
    component: () => import('../views/NewWordView.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
