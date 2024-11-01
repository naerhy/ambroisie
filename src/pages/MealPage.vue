<script setup lang="ts">
import { onMounted } from "vue";
import { useAxios } from "../composables";
import { baseURL, cookingTimes, difficulties, types } from "../shared";
import Error from "../components/Error.vue";
import Loading from "../components/Loading.vue";

import type { Meal } from "../shared";

const props = defineProps<{ id: string }>();

const { data: meal, error, fetch } = useAxios<Meal>({ immediate: true });

onMounted(async () => {
  await fetch({ method: "GET", url: `${baseURL}/ambroisie/meals/${props.id}` });
});
</script>

<template>
  <section v-if="meal">
    <h2>{{ meal.name }}</h2>
    <div class="info">
      <div>
        <div>Types</div>
        <div>{{ meal.types.map((m) => types[m]).join(", ") }}</div>
      </div>
      <div>
        <div>Difficulté</div>
        <div>{{ difficulties[meal.difficulty] }}</div>
      </div>
      <div>
        <div>Temps de préparation</div>
        <div>{{ cookingTimes[meal.cookingTime] }}</div>
      </div>
      <div>
        <div>Végétarien</div>
        <div>{{ meal.vegetarian ? "Oui" : "Non" }}</div>
      </div>
    </div>
    <img :src="`${baseURL}/${meal.photoURL}`" :alt="`Photo du repas ${meal.name}`" />
    <div v-if="meal.recipe" class="ingr-dir">
      <div>
        <h3>Ingrédients</h3>
        <div>Pour {{ meal.recipe.servings }} personnes</div>
        <ul>
          <li v-for="ingr in meal.recipe.ingredients.split('\n')">{{ ingr }}</li>
        </ul>
      </div>
      <div>
        <h3>Préparation</h3>
        <ol>
          <li v-for="dir in meal.recipe.directions.split('\n')">{{ dir }}</li>
        </ol>
      </div>
    </div>
    <div v-else class="no-recipe">
      Ce repas ne posséde pas de recette.
    </div>
  </section>
  <Error v-else-if="error" :message="error.message" />
  <Loading v-else content="Chargement du repas" />
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.info {
  column-gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: 0.5rem;
}

.info > div > div:first-child {
  font-weight: 700;
}

img {
  height: 600px;
  object-fit: cover;
}

.ingr-dir {
  column-gap: 4rem;
  display: flex;
}

ol,
ul {
  list-style-position: inside;
}

ul {
  list-style-type: disc;
}

ol {
  list-style-type: decimal;
}

.no-recipe {
  text-align: center;
}

@media (max-width: 80rem) {
  img {
    height: 400px;
  }

  .ingr-dir {
    flex-direction: column;
    row-gap: 1rem;
  }
}

@media (max-width: 48rem) {
  img {
    height: 200px;
  }
}
</style>
