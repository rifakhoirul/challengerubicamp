<template>
  <div class="home">
    <Navbar />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Mantap" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
