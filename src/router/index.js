import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/acc',
        component: () => import( '../components/WithToken.vue'),
        children: [
            {
                path: '/groups',
                component: () => import( '../views/Groups.vue')
            }, {
                path: '/wall/:wallId',
                component: () => import( '../views/Wall.vue')
            }, {
                path: '/wall/:wallId/post/:postId/comments',
                component: () => import( '../views/Comments.vue')
            }, {
                path: '/messages',
                component: () => import( '../views/Messages.vue')
            }, {
                path: '/messages/:id',
                component: () => import( '../views/Dialog.vue')
            }, {
                path: '/profile/:id?',
                component: () => import( '../views/Profile.vue')
            }, {
                path: '/group/:groupId?',
                component: () => import( '../views/Group.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
