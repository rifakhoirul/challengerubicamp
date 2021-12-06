<template>
  <div class="index">
    <div class="container mt-5">
      <div class="card">
        <div class="card-header text-start">
          <i class="bi bi-speedometer"></i> Welcome to Dashboard
        </div>
        <div class="card-body ">
          <ul class="list-group">
            <li class="list-group-item bg-danger m-1">
              <router-link to="/line" style="color:white; text-decoration:none"
                ><i class="bi bi-graph-up"></i> Line</router-link
              >
            </li>
            <li class="list-group-item bg-warning m-1">
              <router-link to="/pie" style="color:white; text-decoration:none"
                ><i class="bi bi-pie-chart-fill"></i> Pie</router-link
              >
            </li>
            <li class="list-group-item bg-info m-1">
              <router-link to="/bar" style="color:white; text-decoration:none"
                ><i class="bi bi-bar-chart-line-fill"></i> Bar</router-link
              >
            </li>
            <li class="list-group-item bg-success m-1">
              <router-link to="/map" style="color:white; text-decoration:none"
                ><i class="bi bi-geo-alt-fill"></i> Map</router-link
              >
            </li>
            <li class="list-group-item bg-primary m-1">
              <router-link to="/login" style="color:white; text-decoration:none"
                ><i class="bi bi-person-fill"></i> Admin Panel</router-link
              >
            </li>
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
