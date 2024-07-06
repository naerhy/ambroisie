<template>
  <Teleport to="body">
    <div class="modal">
      <div>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

.modal > div {
  background-color: var(--background);
  border-radius: 0.25rem;
  padding: 1rem;
}
</style>
