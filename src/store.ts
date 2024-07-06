import { reactive } from "vue";

interface Filters {
  name: string;
  types: number[];
  difficulties: number[];
  cookingTimes: number[];
  vegetarian: boolean;
}

interface Notif {
  type: "normal" | "success" | "error";
  message: string;
}

interface Store {
  token: string | null;
  filters: Filters;
  notifs: Notif[];
}

export const store: Store = reactive({
  token: null as string | null,
  filters: {
    name: "",
    types: [0, 1, 2, 3],
    difficulties: [0, 1, 2],
    cookingTimes: [0, 1, 2, 3],
    vegetarian: false
  },
  notifs: [] as Notif[]
});
