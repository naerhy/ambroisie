<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { authStore, mealsStore } from "./stores";
import Cookies from "js-cookie";
import Header from "./components/Header.vue";

import type { Meal } from "./shared";

const isFetching = ref(true);

const token = Cookies.get("token");
if (token) {
  authStore.updateToken(token);
}

onMounted(async () => {
  try {
    const res = await axios.get<Meal[]>("https://naerhy.ovh/ambroisie/meals");
    mealsStore.setMeals(res.data);
    isFetching.value = false;
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <Header />
  <main>
    <div v-if="isFetching">Chargement...</div>
    <RouterView v-else />
  </main>
  <footer>
    <p>
      <small>
        L'ambroisie est une substance divine de la mythologie grecque, nourriture délicieuse des
        dieux qui leur assure avec le nectar leur immortalité.
      </small>
    </p>
  </footer>
</template>

<style scoped>
main {
  flex: 1 1 auto;
}

footer {
  text-align: center;
}
</style>
