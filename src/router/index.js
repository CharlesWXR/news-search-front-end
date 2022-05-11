import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
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
  }, {
    path: '/newspaper',
    name: 'newspaper',
    component: () => import('../views/NewspaperView.vue'),
  }, {
    path: '/cantonese',
    name: 'cantonese',
    component: () => import('../views/CantoneseView.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
