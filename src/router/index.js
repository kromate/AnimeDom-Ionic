import { createRouter, createWebHistory } from "vue-router";
// import store from '@/store';

const routes = [
  {
    path:"/",
    redirect:"/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search.vue"),
    meta: {
      requiresGuest: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// router.beforeEach(async (to, from, next) => {

//     store.commit("changeMenu")

// });

export default router
