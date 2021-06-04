import { createRouter, createWebHistory } from "vue-router";
import store from '@/store';

const routes = [
  {
    path:"/",
    redirect:"/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),

  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search.vue"),

  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("@/views/Detail.vue"),

  },
  {
    path: "/genre",
    name: "Genre",
    component: () => import("@/views/Genre.vue"),

  },
  {
    path: "/stream",
    name: "Stream",
    component: () => import("@/views/Stream.vue"),
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("@/views/Notifications.vue"),
  },
  {
    path: "/saved",
    name: "Saved Animes",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/SavedAnimes.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !store.state.user) {
    store.commit("changeAuthModal", true);
  }else{
    store.commit("changeMenu")
    next()
  }


});

export default router
