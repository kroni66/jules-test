<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/gallery">Fish Gallery</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'SiteNavigation'
}
</script>

<style scoped>
nav {
  background-color: #ffffff;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
  /* margin-top: 70px; /* Add if header is fixed and has height ~70px */
}
nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}
nav li {
  margin: 0;
}
nav a {
  display: block;
  padding: 0.75rem 1.5rem; /* Increased padding */
  color: #007bff;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;
}
nav a:hover, nav a.router-link-exact-active { /* Style for active link */
  background-color: #007bff;
  color: white;
}
</style>
