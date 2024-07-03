<template>
  <header class="py-3 mb-3 border-bottom">
    <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr;">
      <div>
        <a href="#" class="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none"
           id="dropdownNavLink">
          Tingis CRM
        </a>
      </div>

      <div class="d-flex align-items-center">
        <form class="w-100 me-3">
          <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
        </form>

        <div class="flex-shrink-0 dropdown">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2"
             data-bs-toggle="dropdown" aria-expanded="false">
            {{ role }}
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>

          <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <button class="dropdown-item" @click="onLogout">Sign out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <div class="container-fluid">
    <div class="d-grid gap-3 h-100" style="grid-template-columns: 0.5fr 2.5fr;">
      <div class="bg-light border rounded-3 h-100 test">
        <div class="d-flex flex-column flex-shrink-0 text-dark bg-white w-100">
          <ul class="nav nav-pills flex-column text-dark">
            <li class="nav-item">
              <a href="#" class="nav-link active" aria-current="page">
                <svg class="bi me-2" width="16" height="16">
                  <use xlink:href="#home"></use>
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" class="nav-link">
                <svg class="bi me-2" width="16" height="16">
                  <use xlink:href="#table"></use>
                </svg>
                Orders
              </a>
            </li>
            <li>
              <a href="#" class="nav-link">
                <svg class="bi me-2" width="16" height="16">
                  <use xlink:href="#grid"></use>
                </svg>
                Products
              </a>
            </li>
            <li>
              <a href="#" class="nav-link">
                <svg class="bi me-2" width="16" height="16">
                  <use xlink:href="#people-circle"></use>
                </svg>
                Customers
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="h-100 test p-5 card" style="height:1000px;">
        <div class="card-header">
          <h3 class="card-title">{{ pageTitle }}</h3>
        </div>
        <div class="card-body">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex"
import {LOGOUT_ACTION, GET_USER_TOKEN_DATA, GET_USER_EMAIL, GET_USER_ROLE, GET_USER_ID} from "@/store/constants"
// import {GET_USER_TOKEN_DATA} from "@/store/constants";

export default {
  name: "Dashboard",

  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN_DATA,
      email: GET_USER_EMAIL,
      role: GET_USER_ROLE,
      userId: GET_USER_ID
    }),
    pageTitle() {
      // Access the current route's meta.title
      return this.$route.meta.title;
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions('auth', {
      logout: LOGOUT_ACTION,
    }),
    async onLogout() {
      try {
        await this.logout();
        this.$router.replace('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
      this.$router.replace('/login');
    },
  }
}
</script>


<style scoped>
.test {
  height: 700px !important;
}
</style>
