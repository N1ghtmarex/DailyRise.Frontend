import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import Challenge from '@/views/Challenge.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/challenge/:id', name: 'Challenge', component: Challenge },
    { path: '/test', name: 'Test', component: Test },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;