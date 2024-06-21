<script setup lang="ts">
import { reactive } from "vue";
import { mealsStore } from "../stores";
import { cookingTimes, difficulties, types } from "../shared";

interface Filters {
  name: string;
  types: number[];
  difficulties: number[];
  cookingTimes: number[];
  vegetarian: boolean;
}

const filters: Filters = reactive({
  name: "",
  types: [],
  difficulties: [],
  cookingTimes: [],
  vegetarian: false
});
</script>

<template>
  <aside>
    <input type="text" v-model="filters.name" placeholder="Filter par nom" />
    <div>
      <div>Type</div>
      <div v-for="(t, i) in types">
        <label>
          <input type="checkbox" :value="i" v-model="filters.types" />
          {{ t }}
        </label>
      </div>
    </div>
    <div>
      <div>Difficulté</div>
      <div v-for="(d, i) in difficulties">
        <label>
          <input type="checkbox" :value="i" v-model="filters.difficulties" />
          {{ d }}
        </label>
      </div>
    </div>
    <div>
      <div>Temps de préparation</div>
      <div v-for="(c, i) in cookingTimes">
        <label>
          <input type="checkbox" :value="i" v-model="filters.cookingTimes" />
          {{ c }}
        </label>
      </div>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="filters.vegetarian" />
        Convient aux végétariens
      </label>
    </div>
  </aside>
  <section>
    <h2>Liste de repas</h2>
    <ul v-if="mealsStore.meals.length">
      <li v-for="meal in mealsStore.meals" :key="meal.id">
        <img :src="meal.thumbnailURL" />
      </li>
    </ul>
  </section>
</template>
