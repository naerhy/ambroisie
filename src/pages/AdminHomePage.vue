<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAxios } from "../composables";
import Modal from "../components/Modal.vue";
import { store } from "../store";

import type { Meal } from "../shared";

const {
  isFetching,
  data: meals,
  error: errorMeals,
  fetch: fetchMeals
} = useAxios<Meal[]>({ immediate: true });

const { data: deletedMeal, error: errorDelete, fetch: fetchDelete } = useAxios<Meal>();

const mealToDelete = ref<Meal | null>(null);

onMounted(async () => {
  await fetchMeals({ method: "GET", url: "https://naerhy.ovh/ambroisie/meals" });
});

async function handleConfirmDelete(id: number) {
  await fetchDelete({
    method: "DELETE",
    url: `https://naerhy.ovh/ambroisie/meals/${id}`,
    headers: {
      Authorization: `Bearer ${store.token}`
    }
  });
  if (deletedMeal.value) {
    console.log(`meal ${deletedMeal.value.name} has been deleted`);
    meals.value = meals.value!.filter((meal) => meal.id !== id);
    mealToDelete.value = null;
  }
}
</script>

<template>
  <Modal v-if="mealToDelete">
    <div class="confirm-delete">
      <h4>Confirmer</h4>
      <p>Confirmer la suppression du repas <b>{{ mealToDelete.name }}</b> ?</p>
      <div class="buttons">
        <button type="button" class="btn" @click="handleConfirmDelete(mealToDelete!.id)">Supprimer</button>
        <button type="button" class="btn" @click="mealToDelete = null">Annuler</button>
      </div>
    </div>
  </Modal>
  <section>
    <h3> Admin Home Page</h3>
    <RouterLink class="btn" to="/admin/ajouter">Ajouter une recette</RouterLink>
    <div v-if="isFetching">Chargement des données...</div>
    <div v-else-if="errorMeals">{{ errorMeals.message }}</div>
    <table v-else-if="meals?.length">
      <thead>
        <tr>
          <th v-for="v in [`#`, `Nom`, `Actions`]">{{ v }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="meal in meals">
          <td>{{ meal.id }}</td>
          <td>{{ meal.name }}</td>
          <td>
            <div class="actions">
              <RouterLink
                class="btn"
                :to="`/admin/modifier/${meal.id.toString()}`"
              >
                Modifier
              </RouterLink>
              <button type="button" class="btn" @click="mealToDelete = meal">Supprimer</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Aucun repas à afficher.</div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

section > a {
  align-self: flex-start;
}

table,
th,
td {
  border: 1px solid var(--stroke);
}

thead {
  background-color: var(--background-darker);
}

th,
td {
  padding: 0.5rem;
}

th:nth-child(2),
td:nth-child(2) {
  width: 100%;
}

td:first-child {
  text-align: center;
}

.actions {
  column-gap: 0.5rem;
  display: flex;
}

.confirm-delete {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}

.buttons {
  column-gap: 0.25rem;
  display: flex;
  justify-content: flex-end;
}
</style>
