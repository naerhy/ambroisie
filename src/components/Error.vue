<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>

<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
div {
  background-color: var(--background-error);
  border: 1px solid var(--stroke-error);
  color: var(--text-error);
  padding: 1rem;
}
</style>
