import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Голосования',
    component: () => import('../views/Home.vue'),
    meta: { accessLevel: 0 }
  },
  {
    path: '/profile',
    name: 'Профиль',
    component: () => import('../views/Profile.vue'),
    meta: { accessLevel: 1 }
  },
  {
    path: '/users',
    name: 'Управление пользователями',
    component: () => import('../views/Users.vue'),
    meta: { accessLevel: 10 }
  },
  {
    path: '/votings',
    name: 'Управление голосованиями',
    component: () => import('../views/Votings.vue'),
    meta: { accessLevel: 10 }
  },
  {
    path: '/vote/:id',
    name: 'Голосование N',
    component: () => import('../views/Vote.vue'),
    meta: { accessLevel: 1 }
  },
  {
    path: '/login',
    name: 'Войти',
    component: () => import('../views/Login.vue'),
    meta: { accessLevel: 0, noCascade: true }
  },
  {
    path: '/logout',
    name: 'Выход',
    component: () => import('../views/Logout.vue'),
    meta: { accessLevel: 1 }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// fix router duplicated
const originalPush = VueRouter.prototype.push;
const { isNavigationFailure, NavigationFailureType } = VueRouter
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((error) => {
    if (!isNavigationFailure(error, NavigationFailureType.duplicated)) {
      throw Error(error)
    }
  })
}

export default router
