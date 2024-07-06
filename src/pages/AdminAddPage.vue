<script setup lang="ts">
import { store } from "../store";
import { useRouter } from "vue-router";
import { useAxios } from "../composables";
import MealInputs from "../components/MealInputs.vue";

import type { Inputs, Meal } from "../shared";

const router = useRouter();

const baseMeal = {
  name: "",
  types: [],
  difficulty: 0,
  cookingTime: 0,
  vegetarian: false,
  recipe: null
};

const { data, error, fetch } = useAxios<Meal>();

async function handleSubmitInputs(inputs: Inputs) {
  await fetch({
    method: "POST",
    url: "https://naerhy.ovh/ambroisie/meals",
    headers: {
      Authorization: `Bearer ${store.token}`
    },
    data: inputs
  });
  if (data.value) {
    store.notifs.push({ type: "success", message: `${data.value.name} a été ajouté avec succès` });
    router.push("/admin");
  }
}
</script>

<template>
  <section>
    <h3>Ajouter admin</h3>
    <MealInputs
      @submit-inputs="handleSubmitInputs"
      :base-inputs="baseMeal"
      :with-file-input="true"
      btn-text="Ajouter"
    />
  </section>
</template>

<style scoped>
</style>
