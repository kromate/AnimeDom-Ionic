import { createRouter, createWebHistory } from "vue-router";
// import store from '@/store';

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("@/views/Home.vue"),
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
