import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// AboutView might already be lazy-loaded, adjust if necessary
// For consistency, we can make them all lazy-loaded or all direct imports for now.
// Let us make them all direct imports for simplicity in this step.
import AboutView from "../views/AboutView.vue";
import ServicesView from "../views/ServicesView.vue";
import BlogView from "../views/BlogView.vue";
import ContactView from "../views/ContactView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView, // Or: () => import("../views/AboutView.vue") for lazy loading
    },
    {
      path: "/services",
      name: "services",
      component: ServicesView,
    },
    {
      path: "/blog",
      name: "blog",
      component: BlogView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
  ],
});

export default router;
