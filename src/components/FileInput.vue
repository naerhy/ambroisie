<script setup lang="ts">
const emit = defineEmits<{ (e: "fileChange", photoBase64: string): void }>();

// TODO: display thumbnail of image in DOM (use URL.createObjectURL to create image .src)
async function handleChange(evt: Event) {
  const files = (evt.target as HTMLInputElement).files;
  const file = files?.item(0) ?? null;
  if (file) {
    emit("fileChange", await imageToBase64(file));
  }
}

function imageToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result as string), { once: true });
    reader.addEventListener("error", (err) => reject(err), { once: true });
    reader.readAsDataURL(file);
  });
}
</script>

<template>
  <label class="form-control">
    Photo du repas
    <input type="file" @change="handleChange" accept="image/jpeg" required />
  </label>
</template>
