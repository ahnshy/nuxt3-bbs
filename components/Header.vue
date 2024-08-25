<script setup>

</script>

<template>
  <header>
    <nav>
      <NuxtLink to="/"> Home </NuxtLink>
      <NuxtLink to="/auth">Login</NuxtLink>
      <NuxtLink to="/about"> about </NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  margin-bottom: 30px;

  nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    a {
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>
