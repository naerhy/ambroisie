<script setup lang="ts">
import { onMounted } from "vue";
import { useAxios } from "../composables";
import { cookingTimes, difficulties, types } from "../shared";

import type { Meal } from "../shared";

const props = defineProps<{ id: string }>();

const { data: meal, error, fetch } = useAxios<Meal>({ immediate: true });

onMounted(async () => {
  await fetch({ method: "GET", url: `https://naerhy.ovh/ambroisie/meals/${props.id}` });
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
    <img :src="meal.photoURL" :alt="`Photo du repas ${meal.name}`" />
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
  </section>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>Chargement du repas...</div>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.info > div > div:first-child {
  font-weight: 700;
}

img {
  height: 300px;
  object-fit: cover;
}

.ingr-dir {
  column-gap: 4rem;
  display: flex;
}

ul {
  list-style-position: inside;
  list-style-type: circle;
}

ol {
  list-style-position: inside;
  list-style-type: decimal;
}
</style>
