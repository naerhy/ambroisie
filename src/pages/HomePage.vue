<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { cookingTimes, difficulties, types } from "../shared";
import { useAxios } from "../composables";
import { store } from "../store";
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";

import type { Meal } from "../shared";

interface MealWithVisibility extends Meal {
  isVisible: boolean;
}

const { isFetching, data, error, fetch } = useAxios<Meal[]>({ immediate: true });

const meals = ref<MealWithVisibility[]>([]);

onMounted(async () => {
  await fetch({ method: "GET", url: "https://naerhy.ovh/ambroisie/meals" });
  if (data.value) {
    meals.value = data.value.map((meal) => ({ ...meal, isVisible: true }));
  }
});

// FIXME: if filters are updated while meals are still not loaded => it won't be taking in account
watch(() => store.filters, (filters) => {
  for (const meal of meals.value) {
    meal.isVisible = meal.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      meal.types.some((type) => filters.types.includes(type)) &&
      filters.difficulties.includes(meal.difficulty) &&
      filters.cookingTimes.includes(meal.cookingTime) &&
      (!filters.vegetarian || meal.vegetarian);
  }
}, { deep: true });
</script>

<template>
  <section>
    <aside>
      <h2>Filtres</h2>
      <input
        type="text"
        class="input"
        v-model="store.filters.name"
        placeholder="Filter par nom"
      />
      <div>
        <div class="title">Type</div>
        <div class="labels">
          <label v-for="(t, i) in types">
            <input type="checkbox" :value="i" v-model="store.filters.types" />
            {{ t }}
          </label>
        </div>
      </div>
      <div>
        <div class="title">Difficulté</div>
        <div class="labels">
          <label v-for="(d, i) in difficulties">
              <input type="checkbox" :value="i" v-model="store.filters.difficulties" />
              {{ d }}
            </label>
        </div>
      </div>
      <div>
        <div class="title">Temps de préparation</div>
        <div class="labels">
          <label v-for="(c, i) in cookingTimes">
            <input type="checkbox" :value="i" v-model="store.filters.cookingTimes" />
            {{ c }}
          </label>
        </div>
      </div>
      <label>
        <input type="checkbox" v-model="store.filters.vegetarian" />
        Convient aux végétariens
      </label>
    </aside>
    <div class="meals">
      <h2>Liste de repas</h2>
      <Loading v-if="isFetching" content="Chargement" />
      <Error v-else-if="error" :message="error.message" />
      <ul v-else>
        <li v-for="meal in meals" v-show="meal.isVisible" :key="meal.id">
          <RouterLink :to="`/repas/${meal.id}`">
            <img :src="meal.thumbnailURL" :alt="`Photo du repas ${meal.name}`" />
            <div>
              <h3>{{ meal.name }}</h3>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  row-gap: 0.5rem;
}

.title {
  font-weight: 700;
}

.labels {
  display: flex;
  flex-direction: column;
}

section > div h2 {
  margin-bottom: 0.5rem;
}

ul {
  display: grid;
  gap: 0.5rem;
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

li div {
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

@media (min-width: 64rem) {
  section {
    column-gap: 1rem;
    display: flex;
  }

  aside {
    align-self: flex-start;
    margin-bottom: 0;
  }

  section > div {
    flex: 1 1 auto;
  }
}
</style>
