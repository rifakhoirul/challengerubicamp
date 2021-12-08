<template>
  <div class="register">
    <div class="container mt-5 border" style="max-width: 500px">
      <ul class="nav justify-content-around m-2">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link disabled"
            >Register</router-link
          >
        </li>
      </ul>
      <div
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
        v-if="errors"
      >
        {{ errors }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <form v-on:submit.prevent="register" class="m-2">
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            name="inputEmail"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            name="inputPassword"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="inputConfirmPassword"
            name="inputConfirmPassword"
            placeholder="Confirm Password"
            v-model="retypepassword"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary mb-3">Register Now</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      retypepassword: "",
      errors: null,
    };
  },
  methods: {
    register: function () {
      let data = {
        email: this.email,
        password: this.password,
        retypepassword: this.retypepassword,
      };
      if (this.password != this.retypepassword) {
        this.errors = "Confirm password not match";
      } else {
        this.$store.dispatch("register", data).then(() => {
          this.$router.push({
            name: "Home",
          });
        }).catch((error)=>{
          this.errors = error
        });
      }
    },
  },
};
</script>