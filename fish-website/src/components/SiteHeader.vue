<template>
  <header>
    <h1>Fish Website</h1>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader'
}
</script>

<style scoped>
header {
  background-color: #007bff; /* Brighter blue */
  color: white;
  padding: 1rem 0; /* Adjusted padding */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* position: fixed; /* Uncomment if you want a fixed header */
  /* width: 100%; */
  /* top: 0; */
  /* z-index: 1000; */
}
header h1 {
  margin: 0;
  font-size: 2rem; /* Larger font size */
}
</style>
