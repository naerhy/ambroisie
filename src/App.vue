<script setup lang="ts">
</script>

<template>
  <header>
    <h1>
      <RouterLink to="/">Ambroisie</RouterLink>
    </h1>
    <nav>
      <ol>
        <li>
          <RouterLink to="/connexion">Se connecter</RouterLink>
        </li>
        <li>
          <RouterLink to="/admin">Panneau d'administration</RouterLink>
        </li>
        <li>
          <RouterLink to="/recettes">Recettes</RouterLink>
        </li>
      </ol>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <p>
      <small>
        L'ambroisie est une substance divine de la mythologie grecque, nourriture délicieuse des
        dieux qui leur assure avec le nectar leur immortalité.
      </small>
    </p>
  </footer>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
}

header ol {
  display: flex;
}

main {
  flex: 1 1 auto;
}

footer {
  text-align: center;
}
</style>
