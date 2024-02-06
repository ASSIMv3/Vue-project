import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView"),
  },
  {
    path: "/products",
    name: "products_category",
    component: () => import("../views/ProductsCategory"),
  },
  {
    path: "/products/product-details/:productId",
    name: "product_details",
    component: () => import("../views/ProductDetails"),
  },
  {
    path: "/cart-page",
    name: "cart_page",
    component: () => import("../views/CartPage.vue"),
  },
  {
    path: "/checkout",
    name: "check_out",
    component: () => import("../views/CheckOut.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
