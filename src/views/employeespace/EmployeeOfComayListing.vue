<template>
  <div v-if="!loading">
    <hr>
    <table class="table table-sm table-hover custom-table">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">company id</th>
        <th scope="col">
          Name
        </th>
        <th scope="col">email</th>
        <th scope="col">Birth date</th>
        <th scope="col">created at</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="employee in employees" :key="employee.id">
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

</template>

<script>

import apiService from "@/services/apiService";
import Swal from "sweetalert2";
import Skeleton from "@/components/Skeleton.vue";

export default {
  name: 'EmployeeOfCompanyListing',
  components: {
    Skeleton,
  },
  data() {
    return {
      employees: [],
      loading: true,

    }
  },
  methods: {

    formatDateTime(dateTimeString) {
      const date = new Date(dateTimeString);
      return date.toLocaleString(); // Adjust as needed
    },
    async getEmployees() {
      try {
        let url = 'users/company-employees';
        const response = await apiService.get(url);
        this.employees = response.data.employees;
        this.filteredEmployees = response.data.employees;
        this.loading = false;

      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "something wrong, company employees page can not be loaded",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },

  },
  async created() {
    await this.getEmployees()

  }
};
</script>

<style scoped>

</style>