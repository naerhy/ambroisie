<script setup lang="ts">
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { authStore } from "../stores";

const router = useRouter();

function handleDisconnect() {
  Cookies.remove("token");
  authStore.updateToken(null);
  router.push("/");
}
</script>

<template>
  <header>
    <h1>
      <RouterLink to="/">Ambroisie</RouterLink>
    </h1>
    <div>
      <nav>
        <ul>
          <li>
            <RouterLink v-if="!authStore.token" to="/connexion">Se connecter</RouterLink>
            <RouterLink v-else to="/admin">Panneau d'administration</RouterLink>
          </li>
          <li>
            <RouterLink to="/repas">Liste de repas</RouterLink>
          </li>
        </ul>
      </nav>
      <button v-if="authStore.token" type="button" @click="handleDisconnect">Déconnexion</button>
    </div>
  </header>
</template>

<style scoped>
header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

h1 {
  color: var(--text-highlight);
}

div {
  column-gap: 2rem;
  display: flex;
}

ul {
  column-gap: 1rem;
  display: flex;
}

.router-link-exact-active {
  color: var(--text-highlight);
}
</style>
