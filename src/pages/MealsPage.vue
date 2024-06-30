<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { cookingTimes, difficulties, types } from "../shared";
import { useAxios } from "../composables";
import { filtersStore } from "../stores";
import Loading from "../components/Loading.vue";

import type { Meal } from "../shared";

interface MealWithVisibility extends Meal {
  isVisible: boolean;
}

const { errMsg, isFetching, fetch } = useAxios();

const meals = ref<MealWithVisibility[]>([]);

onMounted(async () => {
  const data = await fetch<Meal[]>({
    method: "GET",
    url: "https://naerhy.ovh/ambroisie/meals"
  });
  if (data) {
    meals.value = data.map((meal) => ({ ...meal, isVisible: true }));
  }
});

// FIXME: if filters are updated while meals are still not loaded => it won't be taking in account
watch(() => filtersStore.filters, (filters) => {
  for (const meal of meals.value) {
    meal.isVisible = meal.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      meal.types.some((type) => filters.types.includes(type)) &&
      filters.difficulties.includes(meal.difficulty) &&
      filters.cookingTimes.includes(meal.cookingTime) &&
      (!filters.vegetarian || meal.isVegetarian);
  }
}, { deep: true });
</script>

<template>
  <aside>
    <input
      type="text"
      class="input"
      v-model="filtersStore.filters.name"
      placeholder="Filter par nom"
    />
    <div>
      <div>Type</div>
      <div v-for="(t, i) in types">
        <label>
          <input type="checkbox" :value="i" v-model="filtersStore.filters.types" />
          {{ t }}
        </label>
      </div>
    </div>
    <div>
      <div>Difficulté</div>
      <div v-for="(d, i) in difficulties">
        <label>
          <input type="checkbox" :value="i" v-model="filtersStore.filters.difficulties" />
          {{ d }}
        </label>
      </div>
    </div>
    <div>
      <div>Temps de préparation</div>
      <div v-for="(c, i) in cookingTimes">
        <label>
          <input type="checkbox" :value="i" v-model="filtersStore.filters.cookingTimes" />
          {{ c }}
        </label>
      </div>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="filtersStore.filters.vegetarian" />
        Convient aux végétariens
      </label>
    </div>
  </aside>
  <section>
    <h2>Liste de repas</h2>
    <Loading v-if="isFetching" content="Chargement" />
    <div v-else-if="errMsg">{{ errMsg }}</div>
    <ul v-else-if="meals.length">
      <li v-for="meal in meals" v-show="meal.isVisible" :key="meal.id">
        <img :src="meal.thumbnailURL" :alt="`Photo du repas ${meal.name}`" />
        <div>
          <h3>{{ meal.name }}</h3>
        </div>
      </li>
    </ul>
    <div v-else>Aucun repas à afficher.</div>
  </section>
</template>

<style scoped>
aside {
  align-self: flex-start;
  border: 1px solid var(--stroke);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  row-gap: 0.5rem;
}

section {
  flex: 1 1 auto;
}

h2 {
  margin-bottom: 1rem;
}

ul {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

li {
  position: relative;
}

li img {
  height: 200px;
  object-fit: cover;
  width: 100%;
}

li > div {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

h3 {
  color: var(--text-on-highlight);
  text-align: center;
}
</style>
