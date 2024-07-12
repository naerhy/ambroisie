<script setup lang="ts">
import { store } from "../store";
import X from "./SVG/X.vue";
</script>

<template>
  <Teleport to="body">
    <div v-if="store.notifs.length">
      <ul>
        <li v-for="(n, i) in store.notifs" :class="n.type">
          {{ n.message }}
          <button type="button" @click="store.notifs.splice(i, 1)">
            <X :style="{ width: '16px', height: '16px' }" />
          </button>
        </li>
      </ul>
    </div>
  </Teleport>
</template>

<style scoped>
div {
  bottom: 20px;
  position: fixed;
  right: 20px;
  z-index: 10;
}

ul {
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
}

li {
  border-radius: 0.25rem;
  column-gap: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  width: 24rem;
}

.normal {
  border: 1px solid var(--stroke);
}

.success {
  background-color: var(--background-success);
  border: 1px solid var(--stroke-success);
  color: var(--text-success);
}

.error {
  background-color: var(--background-error);
  border: 1px solid var(--stroke-error);
  color: var(--text-error);
}
</style>
