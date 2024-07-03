<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Dashboard</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">

          <div class="d-flex">

            <div class="btn-group">
              <button type="button" class="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="fw-bold"> {{role}} </span>
              </button>
              <ul class="dropdown-menu">
                <li><span class="dropdown-item">{{email}}</span></li>
                <li><hr class="dropdown-divider"></li>
                <li><button class="dropdown-item fw-bold" @click="onLogout">logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
   <section>
     <div>
       <router-view></router-view>
     </div>

   </section>
  </div>
</template>

<script>
 import {mapActions,mapGetters} from "vuex"
 import {LOGOUT_ACTION,GET_USER_TOKEN_DATA,GET_USER_EMAIL,GET_USER_ROLE,GET_USER_ID} from "@/store/constants"
// import {GET_USER_TOKEN_DATA} from "@/store/constants";

export default {
  name: "Dashboard",

  computed:{
    ...mapGetters('auth',{
      token : GET_USER_TOKEN_DATA,
      email : GET_USER_EMAIL,
      role :GET_USER_ROLE,
      userId : GET_USER_ID
    }),


  },
  mounted(){

  },
  methods:{
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