<script setup lang="ts">
import { ref } from "vue";
import Cookies from "js-cookie";
import { store } from "../store";
import { useRouter } from "vue-router";
import { useAxios } from "../composables";

const router = useRouter();

const { data, error, fetch } = useAxios<{ token: string }>();

const password = ref("");

async function handleSubmit() {
  await fetch({
    method: "POST",
    url: "https://naerhy.ovh/ambroisie/auth",
    data: {
      password: password.value
    }
  });
  if (data.value) {
    const { token } = data.value;
    Cookies.set("token", token, { expires: 7 }); // TODO: add secure + sameSite
    store.token = token;
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
          :aria-invalid="error ? 'true' : 'false'"
          required
        />
        <small v-if="error" class="text-error">{{ error.message }}</small>
      </label>
      <button class="btn">Connexion</button>
    </form>
  </section>
</template>

<style scoped>
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
