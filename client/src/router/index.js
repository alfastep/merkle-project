import { createRouter, createWebHistory } from 'vue-router'

import Form from '../components/Form.vue'
import Confirmation from '../components/Confirmation.vue'
import Admin from '../components/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Form',
    component: Form
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;