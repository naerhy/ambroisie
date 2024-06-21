import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import MealsPage from "./pages/MealsPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import AdminPage from "./pages/AdminPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/repas", component: MealsPage },
  { path: "/connexion", component: LoginPage },
  { path: "/admin", component: AdminPage }
];

// TODO: modify router's type [?]
const router = createRouter({ history: createWebHashHistory(), routes });

export default router;
