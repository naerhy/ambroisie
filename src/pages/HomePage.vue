<script setup lang="ts">
import EatingTogether from "../components/SVG/EatingTogether.vue";
</script>

<template>
  <section>
    <div>
      <h2>En panne d'inspiration pour vos futurs repas ?</h2>
      <p>
        Trouvez facilement des repas qui vous conviennent en parcourant la liste preparée
        et mise à jour par Magali.<br />
        De nombreux repas sont accompagnés d'une recette afin de les préparer.<br />
        De plus, des filtres sont à disposition pour affiner votre recherche.
      </p>
      <RouterLink class="btn" to="/repas">Accéder à la liste de repas</RouterLink>
    </div>
    <EatingTogether />
  </section>
</template>

<style scoped>
section {
  display: flex;
  margin-top: 2rem;
}

section > * {
  flex: 1;
}

section > div {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

a {
  align-self: center;
}

@media (max-width: 992px) {
  section {
    flex-direction: column;
    row-gap: 2rem;
  }
}
</style>
