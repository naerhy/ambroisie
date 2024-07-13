<script setup lang="ts">
import { store } from "./store";
import Cookies from "js-cookie";
import Header from "./components/Header.vue";
import Notifications from "./components/Notifications.vue";

const token = Cookies.get("token");
if (token) {
  store.token = token;
}
</script>

<template>
  <Header />
  <main>
    <RouterView />
    <Notifications />
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
