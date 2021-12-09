<template>
  <div class="container mt-5 mb-5">
    <div class="card">
      <router-link to="/" style="text-decoration: none">
        <div class="card-header bg-success text-start text-white">
          <i class="bi bi-arrow-left-circle"></i> <strong>Maps</strong>
        </div>
      </router-link>
      <div class="card-body">
         <google-map />
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import { mapState } from "vuex";
import GoogleMap from "@/components/GoogleMap.vue";
export default {
  name: "Map",
  components:{
    GoogleMap
  },
  computed: {
    ...mapState({
      table: (state) => state.maps.tableMaps,
    }),
  },
  created() {
    this.$store.dispatch("getMaps").then(() => {
      
    });
  },
};
</script>