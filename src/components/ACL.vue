<!-- ACLComponent.vue -->
<template>
  <div v-if="checkRole()">
    <slot></slot>
  </div>
</template>

<script>

import {GET_USER_ROLE} from "@/store/constants";
import {mapGetters} from "vuex";
export default {
  props: {
    role: {
      type: String,
      required: true
    },

  },
  computed: {
    ...mapGetters('auth', {
      user_role: GET_USER_ROLE,
    }),


  },
  methods: {
    checkRole() {
      return this.user_role === this.role;
    }
  }
};
</script>

<style>
/* Optional: Add styles as needed */
</style>
