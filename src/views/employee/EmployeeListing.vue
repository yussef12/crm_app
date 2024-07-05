<template>
  <div v-if="!loading">
    <div class="d-flex justify-content-between ">
      <div class="w-50">
        <input class="form-control" type="text" v-model="searchQuery" @input="searchEmployees"
               placeholder="Search by employee name">
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
        <th scope="col">company id</th>
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
      <tr v-for="employee in filteredEmployees" :key="employee.id">
        <th scope="row">{{ employee.id }}</th>
        <th scope="row">{{ employee.company_id }}</th>

        <th scope="row">{{ employee.name }}</th>
        <th scope="row">{{ employee.email }}</th>
        <th scope="row">{{ employee.birth_date }}</th>
        <th scope="row">{{ formatDateTime(employee.created_at) }}</th>
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
      employees: [],
      filteredEmployees: [],
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
    async getEmployees(nameQuery = '', sortColumn = '') {
      try {
        let url = `/employees?name=${nameQuery}`;
        if (sortColumn) {
          url += `&sort=${sortColumn}`;
        }

        const response = await apiService.get(url);
        this.employees = response.data.employees;
        this.filteredEmployees = response.data.employees;
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

    searchEmployees() {
      this.getEmployees(this.searchQuery);
    },
    sortColumn(columnKey) {
      if (this.sortColumnKey === columnKey) {
        this.sortColumnKey = '';
      } else {
        this.sortColumnKey = columnKey;
      }

      // Call getEmployees with updated sortColumnKey
      this.getEmployees(this.searchQuery, this.sortColumnKey);
    },


  },
  async created() {
    await this.getEmployees()

  }
};
</script>

<style scoped>

</style>