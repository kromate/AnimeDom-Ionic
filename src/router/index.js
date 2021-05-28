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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {

    store.commit("changeMenu")
next()
});

export default router
