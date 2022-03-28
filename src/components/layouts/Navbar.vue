<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color:#00a200;">
    <div class="container-fluid">
      <a class="navbar-brand" href="https://www.nuffieldhealth.com/consultants?size=n_20_n&sort-field=sortname&sort-direction=asc"
        ><img style="border:none; color:white;" alt="navbar" src="../../assets/icons/daily-health-app.png" width="40" height="40"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/"
              >Home</router-link
            >
          </li>


          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarService"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Services
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarSurvey">
              <li>
                <router-link class="dropdown-item" to="/"
                  >Physiotherapy</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/"
                  >Mental Health</router-link
                >
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <router-link class="dropdown-item" to="/"
                  >Personal TRaining</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a
              class="nav-link disabled"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              >Disabled</a
            >
          </li>
          <li></li>

        </ul>

        <!-- TODO search from navbar -->
        <!-- <form class="d-flex" disabled>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success btn-sm" type="submit">
            Search
          </button>
        </form> -->

        <!-- <ul class="nav navbar-nav navbar-right m-2">
          <base-button
            @click="logoutAction"
            :btnClass="'btn-outline-danger btn-sm'"
            link
            to="/account/login"
            >Logout</base-button
          >
        </ul> -->
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navbar",

  methods: {
    ...mapActions("Auth", ["logoutAction"]),
  },
};
</script>

<style>
.router-link-exact-active {
  font-weight: bold;
}
</style>