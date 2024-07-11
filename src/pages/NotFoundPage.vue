<script setup lang="ts">
import { useRouter } from "vue-router";
import Illustration404 from "../components/SVG/Illustration404.vue";

const router = useRouter();
</script>

<template>
  <section>
    <h2>Page introuvable</h2>
    <Illustration404 />
    <button type="button" class="btn" @click="router.push(`/`)">Retourner à l'accueil</button>
  </section>
</template>

<style scoped>
section {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 42rem;
  row-gap: 2rem;
}
</style>
