import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexPage from "@/pages/indexPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: IndexPage,
  },
  {
    path: "/:category",
    component: IndexPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
