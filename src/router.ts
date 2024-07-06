import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import MealsPage from "./pages/MealsPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import AdminPage from "./pages/AdminPage.vue";
import AdminHomePage from "./pages/AdminHomePage.vue";
import AdminAddPage from "./pages/AdminAddPage.vue";
import AdminModifyPage from "./pages/AdminModifyPage.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "/repas",
    component: MealsPage
  },
  {
    path: "/connexion",
    component: LoginPage
  },
  {
    path: "/admin",
    component: AdminPage,
    children: [
      {
        path: "",
        component: AdminHomePage
      },
      {
        path: "ajouter",
        component: AdminAddPage
      },
      {
        path: "modifier/:id",
        component: AdminModifyPage
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound
  }
];

// TODO: modify router's type [?]
const router = createRouter({ history: createWebHashHistory(), routes });

export default router;
