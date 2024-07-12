<script setup lang="ts">
import { ref } from "vue";
import { cookingTimes, difficulties, types } from "../shared";
import FileInput from "./FileInput.vue";
import Error from "../components/Error.vue";

import type { Inputs } from "../shared";

const props = defineProps<{
  baseInputs: Inputs;
  withFileInput: boolean;
  btnText: string;
  errorMsg?: string;
}>();

const emit = defineEmits<{ (e: "submitInputs", inputs: Inputs): void }>();

const inputs = ref(props.baseInputs);
</script>

<template>
  <form @submit.prevent="emit('submitInputs', inputs)">
    <ul>
      <li>
        <label class="form-control">
          Nom
          <input type="text" class="input" v-model="inputs.name" required />
        </label>
      </li>
      <li>
        <div>Type</div>
        <label v-for="(t, i) in types">
          <input type="checkbox" :value="i" v-model="inputs.types" />
          {{ t }}
        </label>
      </li>
      <li class="form-control">
        <label>Difficulté</label>
        <select class="select" v-model="inputs.difficulty">
          <option v-for="(d, i) in difficulties" :value="i">{{ d }}</option>
        </select>
      </li>
      <li class="form-control">
        <label>Temps de préparation</label>
        <select class="select" v-model="inputs.cookingTime">
          <option v-for="(c, i) in cookingTimes" :value="i">{{ c }}</option>
        </select>
      </li>
      <li>
        <label>
          <input type="checkbox" v-model="inputs.vegetarian" />
          Convient aux végétariens
        </label>
      </li>
      <li>
        <label>
          <input
            type="checkbox"
            v-model="inputs.recipe"
            :true-value="inputs.recipe ?? { servings: 2, ingredients: '', directions: '' }"
            :false-value="null"
          />
          Le repas est une recette
        </label>
      </li>
      <template v-if="inputs.recipe">
        <li>
          <label class="form-control">
            Nombre de parts
            <input type="number" class="input" v-model="inputs.recipe.servings" min="1" />
          </label>
        </li>
        <li>
          <label class="form-control">
            Ingrédients
            <textarea class="textarea" v-model="inputs.recipe.ingredients" rows="10"></textarea>
          </label>
        </li>
        <li>
          <label class="form-control">
            Préparation
            <textarea class="textarea" v-model="inputs.recipe.directions" rows="10"></textarea>
          </label>
        </li>
      </template>
      <li v-if="withFileInput">
        <FileInput @file-change="(photoBase64) => inputs.photoBase64 = photoBase64" />
      </li>
      <li v-if="errorMsg">
        <Error :message="errorMsg" />
      </li>
      <li>
        <button class="btn">{{ btnText }}</button>
      </li>
    </ul>
  </form>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

li:nth-child(2) {
  display: flex;
  flex-direction: column;
}

form > button {
  margin-top: 2rem;
}
</style>
