<script setup lang="ts">
import { authStore } from "./stores";
import Cookies from "js-cookie";
import Header from "./components/Header.vue";

const token = Cookies.get("token");
if (token) {
  authStore.updateToken(token);
}
</script>

<template>
  <Header />
  <main>
    <RouterView />
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
  padding: 0.5rem 0;
  text-align: center;
}
</style>
