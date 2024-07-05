<template>
  <div v-if="!loading">
    <div class="d-flex justify-content-between ">
      <div class="w-50">
        <input class="form-control" type="text" v-model="searchQuery" @input="searchInvitation"
               placeholder="Search by invitation email">
      </div>
      <div>
        <div>
          <button class="btn btn-light text-primary border-primary fw-bold" @click="openModal()"> Invite new Employee
          </button>

        </div>

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
        <th scope="col">company id</th>
        <th scope="col">email</th>
        <th scope="col">status</th>
        <th scope="col">created at</th>
        <th scope="col">actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="invitation in filteredInvitations" :key="invitation.id">
        <th scope="row">{{ invitation.id }}</th>
        <th scope="row">{{ invitation.company_id }}</th>
        <th scope="row">{{ invitation.invited_email }}</th>
        <th scope="row">{{ invitation.status }}</th>
        <th scope="row">{{ formatDateTime(invitation.created_at) }}</th>
        <th scope="col">
          <button class="btn btn-light btn-sm"><i class="bi bi-pencil-square text-primary"></i></button>
          <button class="btn btn-light btn-sm ms-1"><i
              class="bi bi-trash3 text-danger"></i></button>
        </th>
      </tr>

      </tbody>
    </table>
  </div>
  <div v-else>
    <Skeleton/>
  </div>
  <BootstrapModal ref="modal" title="Invite employee" @confirm="onConfirm">
    <div>
      <InviteEmployee/>
    </div>
  </BootstrapModal>
</template>

<script>

import apiService from "@/services/apiService";
import Swal from "sweetalert2";
import Skeleton from "@/components/Skeleton.vue";
import BootstrapModal from '@/components/BootstrapModal.vue';
import InviteEmployee from "@/views/employee/InviteEmployee.vue";

export default {
  name: 'CompanyListing',
  components: {
    InviteEmployee,
    Skeleton,
    BootstrapModal
  },
  data() {
    return {
      inviations: [],
      filteredInvitations: [],
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
    openModal() {
      this.$refs.modal.showModal();
    },
    onConfirm() {
      alert('Confirmed!');
    },
    async getInvitations(nameQuery = '', sortColumn = '') {
      try {
        let url = `/invitations/user-invitations'?name=${nameQuery}`;
        if (sortColumn) {
          url += `&sort=${sortColumn}`;
        }

        const response = await apiService.get(url);
        this.inviations = response.data.inviations;
        this.filteredInvitations = response.data.inviations;
        this.loading = false;

      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "something wrong, employee page can not be loaded",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },

    searchInvitation() {
      this.getInvitations(this.searchQuery);
    },
    sortColumn(columnKey) {
      if (this.sortColumnKey === columnKey) {
        this.sortColumnKey = '';
      } else {
        this.sortColumnKey = columnKey;
      }

      // Call getInvitations with updated sortColumnKey
      this.getInvitations(this.searchQuery, this.sortColumnKey);
    },


  },
  async created() {
    await this.getInvitations()

  }
};
</script>

<style scoped>

</style>