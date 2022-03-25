<template>
  <Navbar />
  <Body />
  <Footer />
</template>

<script>
import Navbar from "./Navbar.vue";
import Body from "./Body.vue";
import Footer from "./Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Body,
    Footer,
  },
};
</script>

<style scoped>

</style>