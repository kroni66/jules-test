<template>
  <div>
    <HeroSection />
    <div class="home">
      <h2>Welcome to the Wonderful World of Fish!</h2>
      <p>Our website is dedicated to providing fascinating information about diverse fish species, their habitats, and conservation efforts.</p>
      <p>Explore our gallery to see stunning images, or dive into our articles to learn more.</p>
    </div>
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue'
export default {
  name: 'HomeView',
  components: {
    HeroSection
  }
}
</script>
<style scoped>
.home {
  padding: 20px;
  text-align: center;
}
</style>
