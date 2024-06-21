<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <h2>Not found</h2>
  <button type="button" @click="router.push(`/`)">Retourner à l'accueil</button>
</template>
