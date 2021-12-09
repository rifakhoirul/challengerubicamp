<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark mb-4" id="NavbarMain">
    <div class="container-fluid">
      <router-link to="/" style="text-decoration: none">
      <a class="navbar-brand">Content Management System</a>
      </router-link>
      <button
        class="navbar-toggler collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <router-link to="/home" style="text-decoration: none">
            <li :class="{'nav-item':true, 'nav-link':true, active:submenu=='Home'}"><i class="bi bi-house"></i> Home</li>
          </router-link>
          <router-link to="/data" style="text-decoration: none">
            <li :class="{'nav-item':true, 'nav-link':true, active:submenu=='Data'}"><i class="bi bi-boxes"></i> Data</li>
          </router-link>
          <router-link to="/datadate" style="text-decoration: none">
            <li :class="{'nav-item':true, 'nav-link':true, active:submenu=='Data Date'}"><i class="bi bi-calendar"></i> Data Date</li>
          </router-link>
          <router-link to="/maps" style="text-decoration: none">
            <li :class="{'nav-item':true, 'nav-link':true, active:submenu=='Maps'}"><i class="bi bi-geo-alt"></i> Maps</li>
          </router-link>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <a class="btn btn-outline-success my-2 my-sm-0" @click="logout"><i class="bi bi-box-arrow-right"></i> Logout</a
          >
        </form>
      </div>
    </div>
  </nav>
</template>
<style>
#NavbarMain{
  z-index: 5;
}
</style>
<script>
export default {
  name: 'Navbar',
  props: {
    submenu: String
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>