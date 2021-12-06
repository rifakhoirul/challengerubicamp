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
      <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errors">
        {{ errors }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <form v-on:submit.prevent="userLogin" class="m-2">
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            v-model="form.email"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="form.password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary mb-3">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: null,
    };
  },
  methods: {
    userLogin() {
      this.$store
        .dispatch("login", this.form)
        .then((response) => {
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.errors = error;
        });
      // axios
      //   .post("users/login", {
      //     email: this.form.email,
      //     password: this.form.password,
      //   })
      //   .then(function (res) {
      //     console.log(res)
      //     if (res.data.status) {
      //       localStorage.setItem("token", res.data.data.token);
      //       localStorage.setItem("email", res.data.data.email);
      //     } else {
      //       alert(res.data.data.message)
      //     }
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });
    },
  },
};
</script>
