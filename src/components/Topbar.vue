<template>
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
        <li>
          <router-link :to="{name:'admin.profile'}" class="dropdown-item" >Profile</router-link>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li>
          <button class="dropdown-item" @click="onLogout">Sign out</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import {GET_USER_ID, GET_USER_ROLE, GET_USER_TOKEN_DATA, GET_USER_EMAIL, LOGOUT_ACTION} from "@/store/constants";
import {mapActions} from "vuex"

export default {
  name: "Topbar",
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN_DATA,
      email: GET_USER_EMAIL,
      role: GET_USER_ROLE,
      userId: GET_USER_ID
    }),
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

</style>