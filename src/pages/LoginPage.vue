<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import { authStore } from "../stores";
import { useRouter } from "vue-router";

const router = useRouter();

const password = ref("");

async function handleSubmit() {
  try {
    const res = await axios.post<{ token: string }>("https://naerhy.ovh/ambroisie/auth", {
      password: password.value
    });
    Cookies.set("token", res.data.token, { expires: 7 }); // TODO: add secure + sameSite
    authStore.updateToken(res.data.token);
    router.push("/");
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <section>
    <h2>Accès à l'espace administrateur</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Mot de passe
        <input class="input" type="text" v-model="password" />
      </label>
      <button class="btn">Connexion</button>
    </form>
  </section>
</template>
