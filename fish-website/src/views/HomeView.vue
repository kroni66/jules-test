<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>Welcome to the Wonderful World of Fish!</h2>
    <p>Our website is dedicated to providing fascinating information about diverse fish species, their habitats, and conservation efforts.</p>
    <p>Explore our gallery to see stunning images, or dive into our articles to learn more.</p>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>
<style scoped>
.home {
  padding: 20px;
  text-align: center;
}
.home img {
  max-width: 150px;
  margin-bottom: 20px;
}
</style>
