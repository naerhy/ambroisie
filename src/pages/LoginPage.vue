<script setup lang="ts">
import { ref } from "vue";
import Cookies from "js-cookie";
import { authStore } from "../stores";
import { useRouter } from "vue-router";
import { useAxios } from "../composables";

const router = useRouter();

const { errMsg, fetch } = useAxios();

const password = ref("");

async function handleSubmit() {
  const data = await fetch<{ token: string }>({
    method: "POST",
    url: "https://naerhy.ovh/ambroisie/auth",
    data: {
      password: password.value
    }
  });
  if (data) {
    Cookies.set("token", data.token, { expires: 7 }); // TODO: add secure + sameSite
    authStore.updateToken(data.token);
    router.push("/");
  } else {
    password.value = "";
  }
}
</script>

<template>
  <section>
    <h2>Accès à l'espace administrateur</h2>
    <form @submit.prevent="handleSubmit">
      <label class="form-control">
        Mot de passe
        <input
          class="input"
          type="password"
          v-model="password"
          :aria-invalid="errMsg ? 'true' : 'false'"
          required
        />
        <small v-if="errMsg" class="text-error">{{ errMsg }}</small>
      </label>
      <button class="btn">Connexion</button>
    </form>
  </section>
</template>

<style>
section {
  margin: 4rem auto 0 auto;
  max-width: 600px;
}

h2 {
  margin-bottom: 2rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
</style>
