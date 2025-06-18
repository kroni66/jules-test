<template>
  <footer>
    <p>&copy; 2023 Fish Website</p>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter'
}
</script>

<style scoped>
footer {
  background-color: #343a40; /* Darker background */
  color: #f8f9fa; /* Lighter text */
  padding: 1.5rem 0; /* Adjusted padding */
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0; /* Ensure it spans full width */
  width: 100%;
  font-size: 0.9rem;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1); /* Optional: add shadow */
}
footer p {
  margin: 0;
}
</style>
