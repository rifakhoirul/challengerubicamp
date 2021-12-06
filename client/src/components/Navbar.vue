<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Content Management System</a>
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
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#"> Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> Data</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> Data Date</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> Maps</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <a class="btn btn-outline-success my-2 my-sm-0" href="#"> Logout</a>
        </form>
      </div>
    </div>
  </nav>
</template>