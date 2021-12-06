<template>
  <div class="about">
    <div class="container mt-5 border" style="max-width: 500px">
      <ul class="nav justify-content-around m-2">
        <li class="nav-item">
          <router-link to="/login" class="nav-link disabled">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
      </ul>
      <form v-on:submit.prevent="userLogin" class="m-2">
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            v-model="form.email"
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="form.password"
          />
        </div>
        <button type="submit" class="btn btn-primary mb-3">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    userLogin(){
      console.log(this.form.email)
    }
    // userLogin() {
    //   this.$store
    //     .dispatch("login", this.form)
    //     .then((response) => {
    //       console.log(response);
    //       this.$router.push({ name: "Home" });
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       this.errors = error.response.data.errors;
    //     });
    // },
  },
};
</script>
