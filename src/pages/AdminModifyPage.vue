<script setup lang="ts">
import { useAxios } from "../composables";
import { onMounted, ref } from "vue";
import { store } from "../store";
import MealInputs from "../components/MealInputs.vue";
import FileInput from "../components/FileInput.vue";

import type { Inputs, Meal } from "../shared";

const props = defineProps<{ id: string }>();

const { isFetching, data: meal, error: errorGet, fetch: fetchGet } = useAxios<Meal>({ immediate: true });
const { data: mealPatch, fetch: fetchPatch } = useAxios<Meal>();
const { data: mealPatchPhoto, fetch: fetchPatchPhoto } = useAxios<Meal>();

const photoBase64 = ref("");

onMounted(async () => {
  await fetchGet({ method: "GET", url: `https://naerhy.ovh/ambroisie/meals/${props.id}` });
});

async function handleSubmitModify(inputs: Inputs) {
  await fetchPatch({
    method: "PATCH",
    url: `https://naerhy.ovh/ambroisie/meals/${props.id}`,
    headers: {
      Authorization: `Bearer ${store.token}`
    },
    data: inputs
  });
  if (mealPatch.value) {
    store.notifs.push({ type: "success", message: `${mealPatch.value.name} a été mis à jour` });
  }
}

async function handleSubmitModifyPhoto() {
  await fetchPatchPhoto({
    method: "PATCH",
    url: `https://naerhy.ovh/ambroisie/meals/photo/${props.id}`,
    headers: {
      Authorization: `Bearer ${store.token}`
    },
    data: { photoBase64: photoBase64.value } 
  });
  if (mealPatchPhoto.value) {
    store.notifs.push({
      type: "success",
      message: `La photo du repas ${mealPatchPhoto.value.name} a été mise à jour`
    });
  }
}
</script>

<template>
  <div v-if="isFetching">Chargement du repas...</div>
  <div v-else-if="errorGet">{{ errorGet.message }}</div>
  <template v-else>
    <section>
      <h3>Modifier informations du repas</h3>
      <MealInputs
        @submit-inputs="handleSubmitModify"
        :base-inputs="meal!"
        :with-file-input="false"
        btn-text="Modifier"
      />
    </section>
    <section>
      <h3>Modifier photo</h3>
      <form @submit.prevent="handleSubmitModifyPhoto">
        <FileInput @file-change="(_photoBase64) => photoBase64 = _photoBase64" />
        <button class="btn">Modifier photo</button>
      </form>
    </section>
  </template>
</template>
