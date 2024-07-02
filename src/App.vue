<template>

  <loader v-if="isLoading"></loader>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

import  Loader from "../src/components/Loader.vue";
import {mapState} from 'vuex';

export default {
  name: 'App',
  computed:{
    ...mapState('auth',{
      isLoading:(state)=>state.isLoading
    })

  },
  components: {
    Loader
  }


}
</script>

<style>

</style>
