<template>
  <div id="app">
    <router-view />
    <!-- <div id="nav">
      <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
        </div>
      <div><router-link to="/line" class="btn btn-danger text-white mb-2">Line</router-link></div>
      <div><router-link to="/pie" class="btn btn-warning text-white mb-2">Pie</router-link></div>
      <div><router-link to="/bar" class="btn btn-info text-white mb-2">Bar</router-link></div>
      <div><router-link to="/map" class="btn btn-success text-white mb-2">Map</router-link></div>
      <div><router-link to="/login" class="btn btn-primary text-white mb-2">Admin Panel</router-link></div>
    </div> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
