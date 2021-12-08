<template>
  <div class="index">
    <div class="container mt-5">
      <div class="card">
        <div class="card-header text-start">
          <i class="bi bi-speedometer"></i> Welcome to Dashboard
        </div>
        <div class="card-body">
          <ul class="list-group">
            <router-link to="/line" style="text-decoration: none"
              ><li class="list-group-item bg-danger m-1 text-white">
                <i class="bi bi-graph-up"></i> Line
              </li>
            </router-link>
            <router-link to="/pie" style="text-decoration: none"
              ><li class="list-group-item bg-warning m-1 text-white">
                <i class="bi bi-pie-chart-fill"></i> Pie
              </li></router-link
            >
            <router-link to="/bar" style="text-decoration: none"
              ><li class="list-group-item bg-info m-1 text-white">
                <i class="bi bi-bar-chart-line-fill"></i> Bar
              </li></router-link
            >
            <router-link to="/map" style="text-decoration: none"
              ><li class="list-group-item bg-success m-1 text-white">
                <i class="bi bi-geo-alt-fill"></i> Map
              </li></router-link
            >
            <router-link to="/login" style="text-decoration: none"
              ><li class="list-group-item bg-primary m-1 text-white">
                <i class="bi bi-person-fill"></i> Admin Panel
              </li></router-link
            >
          </ul>
        </div>
      </div>

      <!-- <HelloWorld msg="Mantaps" /> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

// export default {
// name: "Home",
//   components: {
//     HelloWorld,
//   },
// };
</script>
