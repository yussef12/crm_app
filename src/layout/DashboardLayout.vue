<template>
  <header class="py-3 mb-3 border-bottom">
    <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr;">
      <Topbar />
    </div>
  </header>
  <div class="container-fluid">
    <div class="d-grid gap-3 h-100" style="grid-template-columns: 0.5fr 2.5fr;">
      <div class="bg-light border rounded-3 h-100 test">
        <div class="d-flex flex-column flex-shrink-0 text-dark bg-white w-100">
          <Sidebar />
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
import {mapGetters} from "vuex"
import {GET_USER_TOKEN_DATA, GET_USER_EMAIL, GET_USER_ROLE, GET_USER_ID} from "@/store/constants"
// import {GET_USER_TOKEN_DATA} from "@/store/constants";
import Sidebar from '@/components/Sidebar.vue';
import Topbar from '@/components/Topbar.vue';

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Topbar
  },
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

}
</script>


<style scoped>
.test {
  height: 700px !important;
}
</style>
