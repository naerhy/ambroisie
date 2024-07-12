<script setup lang="ts">
import { useAxios } from "../composables";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { store } from "../store";
import MealInputs from "../components/MealInputs.vue";
import FileInput from "../components/FileInput.vue";
import Error from "../components/Error.vue";

import type { Inputs, Meal } from "../shared";

const router = useRouter();

const props = defineProps<{ id: string }>();

const {
  isFetching,
  data: meal,
  error: errorGet,
  fetch: fetchGet
} = useAxios<Meal>({ immediate: true });
const { data: mealPatch, error: errorPatch, fetch: fetchPatch } = useAxios<Meal>();
const { data: mealPatchPhoto, error: errorPatchPhoto, fetch: fetchPatchPhoto } = useAxios<Meal>();

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
    router.push("/admin");
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
  <Error v-else-if="errorGet" :message="errorGet.message" />
  <template v-else>
    <section>
      <h2>Modifier les informations du repas</h2>
      <MealInputs
        @submit-inputs="handleSubmitModify"
        :base-inputs="meal!"
        :with-file-input="false"
        btn-text="Modifier"
        :error-msg="errorPatch?.message"
      />
    </section>
    <section>
      <h2>Modifier la photo du repas</h2>
      <form class="modify-photo" @submit.prevent="handleSubmitModifyPhoto">
        <FileInput @file-change="(_photoBase64) => photoBase64 = _photoBase64" />
        <Error v-if="errorPatchPhoto" :message="errorPatchPhoto.message" />
        <button class="btn">Modifier photo</button>
      </form>
    </section>
  </template>
</template>

<style scoped>
section:first-child {
  margin-bottom: 4rem;
}

h2 {
  margin-bottom: 1rem;
}

.modify-photo {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.modify-photo button {
  align-self: flex-start;
}
</style>
