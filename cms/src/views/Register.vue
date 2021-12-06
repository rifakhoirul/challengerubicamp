<template>
  <div class="about">
    <div class="container mt-5 border" style="max-width: 500px">
      <ul class="nav justify-content-around m-2">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link disabled">Register</router-link>
        </li>
      </ul>
      <form class="m-2">
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            name="inputEmail"
            placeholder="Email"
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            name="inputPassword"
            placeholder="Password"
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="inputConfirmPassword"
            name="inputConfirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit" class="btn btn-primary mb-3">Register Now</button>
      </form>
    </div>
  </div>
</template>
