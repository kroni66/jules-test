<template>
  <div id="app">
    <SiteHeader />
    <SiteNavigation />
    <MainContent />
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from './components/SiteHeader.vue';
import SiteNavigation from './components/SiteNavigation.vue';
import MainContent from './components/MainContent.vue';
import SiteFooter from './components/SiteFooter.vue';

export default {
  name: 'App',
  components: {
    SiteHeader,
    SiteNavigation,
    MainContent,
    SiteFooter
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f7f6;
  color: #333;
  padding-bottom: 80px; /* Increased padding for footer */
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

/* Remove margin-top from #app if SiteHeader is not fixed or to adjust spacing */
/* #app { margin-top: 60px; } */

a {
  color: #3498db;
  text-decoration: none;
}

a:hover {
  color: #2980b9;
}
</style>
