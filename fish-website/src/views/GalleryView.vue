<template>
  <div class="gallery">
    <h2>Fish Gallery</h2>
    <p>Discover a variety of beautiful fish species from around the world.</p>
    <div v-if="loading" class="loading">Loading fish data...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="fish-grid" v-if="!loading && !error">
      <div class="fish-item" v-for="fish in fishList" :key="fish.id">
        <img :src="fish.imageUrl" :alt="fish.name">
        <h3>{{ fish.name }}</h3>
        <p class="species"><em>{{ fish.species }}</em></p>
        <p class="description">{{ fish.description }}</p>
        <p class="habitat"><strong>Habitat:</strong> {{ fish.habitat }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GalleryView',
  data() {
    return {
      fishList: [],
      loading: true,
      error: null
    }
  },
  async mounted() {
    try {
      const response = await fetch('/data/fish_data.json'); // Fetches from public/data/fish_data.json
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.fishList = await response.json();
    } catch (e) {
      this.error = 'Failed to load fish data. Please try again later.';
      console.error('Error fetching fish data:', e);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.gallery {
  padding: 20px;
  text-align: left; /* Align text to left for better readability of details */
}
.gallery h2, .gallery > p {
    text-align: center; /* Keep headings and intro paragraph centered */
}
.fish-grid {
  display: grid; /* Using grid for more complex layouts if needed */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive grid */
  gap: 25px;
  margin-top: 20px;
}
.fish-item {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.fish-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}
.fish-item img {
  width: 100%;
  height: 180px; /* Increased height */
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 15px;
}
.fish-item h3 {
  margin-top: 0;
  margin-bottom: 0.5em;
  color: #007bff;
  font-size: 1.4em; /* Slightly larger */
}
.fish-item .species {
  font-style: italic;
  color: #555;
  margin-bottom: 10px;
  font-size: 0.9em;
}
.fish-item .description {
  font-size: 0.95em;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.5;
}
.fish-item .habitat {
  font-size: 0.9em;
  color: #444;
}
.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
}
.error {
  color: red;
}
</style>
