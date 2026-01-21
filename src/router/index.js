import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Learn from '../views/Learn.vue'
import Quiz from '../views/Quiz.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/learn',
    name: 'Learn',
    component: Learn
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
