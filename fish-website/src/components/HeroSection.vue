<template>
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content" v-show="showContent">
      <h1 class="hero-title">Dive Into the World of Fish</h1>
      <p class="hero-subtitle">
        Discover fascinating species, habitats and more.
      </p>
      <button class="hero-cta" @click="goToGallery">
        Explore Gallery
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  data() {
    return {
      showContent: false
    }
  },
  mounted() {
    // Trigger fade-in animation
    setTimeout(() => {
      this.showContent = true
    }, 50)
  },
  methods: {
    goToGallery() {
      this.$router.push('/gallery')
    }
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
@media (min-width: 768px) {
  .hero {
    min-height: 80vh;
  }
}

.hero-bg {
  background-image: url('https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  filter: brightness(0.8) blur(0px);
  position: absolute;
  inset: 0;
  z-index: 1;
  transition: filter 0.4s;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(20,23,39,0.7) 40%, rgba(20,23,39,0.92) 100%);
  /* Optional: subtle blur for modern effect */
  backdrop-filter: blur(2px) saturate(120%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  animation: fadeInUp 1s cubic-bezier(.33,1,.68,1) 0.1s both;
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.4s, transform 0.4s;
}
.hero-content[style*="display: none"] {
  opacity: 0;
}
.hero-content[style*="display: block"], 
.hero-content[style*="display: inline"], 
.hero-content[style*="display: flex"] {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(32px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 2.35rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 0.6em;
  line-height: 1.1;
  text-shadow: 0 4px 32px rgba(0,0,0,0.25);
}
@media (min-width: 768px) {
  .hero-title {
    font-size: 3.2rem;
  }
}
.hero-subtitle {
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 2em;
  color: #f3f7f7;
  text-shadow: 0 2px 12px rgba(0,0,0,0.2);
}
@media (min-width: 768px) {
  .hero-subtitle {
    font-size: 1.45rem;
  }
}

.hero-cta {
  padding: 0.8em 2.2em;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(90deg,#29b6f6 12%,#039be5 100%);
  border: none;
  border-radius: 28px;
  box-shadow: 0 2px 24px 0 rgba(3,155,229,0.15);
  cursor: pointer;
  outline: none;
  transition: background 0.2s, transform 0.18s;
  letter-spacing: 0.02em;
}
.hero-cta:hover,
.hero-cta:focus {
  background: linear-gradient(90deg,#039be5 0%,#29b6f6 88%);
  transform: translateY(-2px) scale(1.04);
}
</style>