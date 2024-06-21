import { reactive } from "vue";

import type { Meal } from "./shared";

interface AuthStore {
  token: string | null;
  updateToken(token: string | null): void;
}

export const authStore: AuthStore = reactive({
  token: null as string | null,
  updateToken(token: string | null) {
    this.token = token;
  }
});

interface MealsStore {
  meals: Meal[];
  setMeals(meals: Meal[]): void;
}

export const mealsStore: MealsStore = reactive({
  meals: [] as Meal[],
  setMeals(meals) {
    this.meals = meals;
  }
});
