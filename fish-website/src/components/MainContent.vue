<template>
  <main>
    <router-view></router-view> // This is where routed components will be displayed
  </main>
</template>

<script>
export default {
  name: 'MainContent'
}
</script>

<style scoped>
main {
  padding: 20px;
  /* margin-top: 70px; /* Add if header is fixed and has height ~70px */
  /* padding-bottom: 80px; /* Add if footer is fixed and has height ~80px */
                               /* This should match body's padding-bottom */
}
</style>
