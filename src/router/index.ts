import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../views/home.vue')
    },
    {
        path: '/chat',
        component: () => import('../views/chat.vue')
    },
    {
        path: '/404',
        component: () => import('../views/notFound.vue')
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: '/404'
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router