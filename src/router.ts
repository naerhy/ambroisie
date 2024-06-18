import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import RecipesPage from "./pages/RecipesPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import AdminPage from "./pages/AdminPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/recettes", component: RecipesPage },
  { path: "/connexion", component: LoginPage },
  { path: "/admin", component: AdminPage }
];

// TODO: modify router's type [?]
const router = createRouter({ history: createWebHashHistory(), routes });

export default router;
