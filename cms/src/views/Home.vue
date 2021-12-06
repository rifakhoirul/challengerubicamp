<template>
  <div class="index">
    <Navbar />
    <div class="container p-5 mt-5">
      <div class="alert alert-secondary" role="alert">
        Welcome {{user}}
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapGetters } from 'vuex'

export default {
  components: {
    Navbar,
  },
  computed: {
      ...mapGetters({ 
        isLoggedIn: 'isLoggedIn',
        user: 'user',
      })
    },
};
</script>