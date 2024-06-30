import { reactive } from "vue";

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

interface Filters {
  name: string;
  types: number[];
  difficulties: number[];
  cookingTimes: number[];
  vegetarian: boolean;
}

export const filtersStore: { filters: Filters } = reactive({
  filters: {
    name: "",
    types: [0, 1, 2, 3],
    difficulties: [0, 1, 2],
    cookingTimes: [0, 1, 2, 3],
    vegetarian: false
  }
});
