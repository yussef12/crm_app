<template>
  <div v-if="!loading">
    <div class="d-flex justify-content-between ">
      <div class="w-50">
        <input class="form-control" type="text" v-model="searchQuery" @input="searchAdmins"
               placeholder="Search by admin name">
      </div>
      <div>
        <router-link class="btn btn-light text-primary border-primary fw-bold" :to="{name :'admin.create'}">+ Add new Super amin</router-link>

      </div>

    </div>
    <hr>
    <table class="table table-sm table-hover custom-table">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">
          <button class="btn btn-default" @click="sortColumn('name')"><i class="bi bi-sort-up"></i></button>
          Name
        </th>
        <th scope="col">email</th>
        <th scope="col">Birth date</th>
        <th scope="col">created at</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="admin in filteredAdmins" :key="admin.id">
        <th scope="row">{{ admin.id }}</th>
        <th scope="row">{{ admin.name }}</th>
        <th scope="row">{{ admin.email }}</th>
        <th scope="row">{{ admin.birth_date }}</th>
        <th scope="row">{{ formatDateTime(admin.created_at) }}</th>
      </tr>

      </tbody>
    </table>
  </div>
  <div v-else>
    <Skeleton/>
  </div>
  <BootstrapModal ref="modal" title="Create super admin" @confirm="onConfirm">
    <CreateAdmin @admin-saved="getAdmins"/>

  </BootstrapModal>
</template>

<script>

import BootstrapModal from '@/components/BootstrapModal.vue';
import apiService from "@/services/apiService";
import Swal from "sweetalert2";
import Skeleton from "@/components/Skeleton.vue";
import CreateAdmin from "@/views/superadminspace/superadmin/CreateAdmin.vue";

export default {
  name: 'CompanyListing',
  components: {
    Skeleton,
    CreateAdmin,
    BootstrapModal,
  },
  data() {
    return {
      admins: [],
      filteredAdmins: [],
      loading: true,
      searchQuery: '',
      sortColumnKey: '',

    }
  },
  methods: {

    formatDateTime(dateTimeString) {
      const date = new Date(dateTimeString);
      return date.toLocaleString(); // Adjust as needed
    },
    openModal(event) {
      this.lastEvent = event;
      this.$refs.modal.showModal();
    },
    onConfirm() {
      alert('Confirmed!');
    },
    async getAdmins(nameQuery = '', sortColumn = '') {
      try {
        let url = `/superadmins?name=${nameQuery}`;
        if (sortColumn) {
          url += `&sort=${sortColumn}`;
        }

        const response = await apiService.get(url);
        this.admins = response.data.admins;
        this.filteredAdmins = response.data.admins;
        this.loading = false;

      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "something wrong, admin page can not be loaded",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },

    searchAdmins() {
      this.getAdmins(this.searchQuery);
    },
    sortColumn(columnKey) {
      if (this.sortColumnKey === columnKey) {
        this.sortColumnKey = '';
      } else {
        this.sortColumnKey = columnKey;
      }

      // Call getAdmins with updated sortColumnKey
      this.getAdmins(this.searchQuery, this.sortColumnKey);
    },


  },
  async created() {
    await this.getAdmins()

  }
};
</script>

<style scoped>

</style>