<template>
  <div v-if="!loading">
    <div class="d-flex justify-content-between ">
      <div class="w-50">
        <input class="form-control" type="text" v-model="searchQuery" @input="searchCompanies"
               placeholder="Search by company name">
      </div>
      <div>
        <button class="btn btn-light text-primary border-primary fw-bold" @click="openModal('create')"> + Add new company</button>

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
        <th scope="col">size</th>
        <th scope="col">Employees count</th>
        <th scope="col">created at</th>
        <th scope="col">actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="company in filteredCompanies" :key="company.id">
        <th scope="row">{{ company.id }}</th>
        <th scope="row">{{ company.name }}</th>
        <th scope="row">{{ company.size }}</th>
        <th scope="row">{{ company.employees_count }}</th>
        <th scope="row">{{ formatDateTime(company.created_at) }}</th>
        <th scope="col">
          <button  @click="editCompany(company)"  class="btn btn-light btn-sm"><i class="bi bi-pencil-square text-primary"></i></button>
          <button :disabled="company.employees_count>0" @click="deleteRecord( company.id)" class="btn btn-light btn-sm ms-1"><i
              class="bi bi-trash3 text-danger"></i></button>
        </th>
      </tr>

      </tbody>
    </table>
  </div>
  <div v-else>
    <Skeleton/>
  </div>
  <BootstrapModal ref="modal" title="Company Details" @confirm="onConfirm">
    <div v-if="lastEvent === 'create'">
      <CreateCompany :key="'create'" />
    </div>
    <div v-else-if="lastEvent === 'update'">
      <UpdateCompany :key="'update'"  @company-saved="getCompanies"  />
    </div>
  </BootstrapModal>
</template>

<script>

import BootstrapModal from '@/components/BootstrapModal.vue';
import CreateCompany from "@/views/superadminspace/company/CreateCompany.vue";
import apiService from "@/services/apiService";
import Swal from "sweetalert2";
import Skeleton from "@/components/Skeleton.vue";
import UpdateCompany from "@/views/superadminspace/company/UpdateCompany.vue";
import {mapMutations} from "vuex";
import {SET_SELECTED_COMPANY_MUTATION} from "@/store/constants";

export default {
  name: 'CompanyListing',
  components: {
    UpdateCompany,
    Skeleton,
    CreateCompany,
    BootstrapModal,
  },
  data() {
    return {
      lastEvent:'',
      companies: [],
      filteredCompanies: [],
      loading: true,
      searchQuery: '',
      sortColumnKey: '',
    }
  },
  methods: {
    ...mapMutations('company',{
      setCompany:SET_SELECTED_COMPANY_MUTATION
    }),
    formatDateTime(dateTimeString) {
      const date = new Date(dateTimeString);
      return date.toLocaleString(); // Adjust as needed
    },
    openModal(event) {
      this.lastEvent= event;
      this.$refs.modal.showModal();
    },
    onConfirm() {
      alert('Confirmed!');
    },
    refreshChild() {
      // Call method on child component to refresh
      this.$refs.modal.refresh();
    },
    async getCompanies(nameQuery = '', sortColumn = '') {
      try {
        let url = `/companies?name=${nameQuery}`;
        if (sortColumn) {
          url += `&sort=${sortColumn}`;
        }

        const response = await apiService.get(url);
        this.companies = response.data;
        this.filteredCompanies = this.companies; // Initialize filteredCompanies with all companies
        this.loading = false;

      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "something wrong, Companies page can not be loaded",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
    async removeData(id) {
      this.loading = true;
      try {
        let url = `/companies/${id}`;
        const response = await apiService.delete(url);
        console.log(response.status);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "company removed successfully",
          showConfirmButton: false,
          timer: 3000,
        });
        this.getCompanies();
      } catch (error) {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "company removed successfully",
          showConfirmButton: false,
          timer: 3000,
        });
      }

    },

    searchCompanies() {
      this.getCompanies(this.searchQuery);
    },
    sortColumn(columnKey) {
      if (this.sortColumnKey === columnKey) {
        this.sortColumnKey = '';
      } else {
        this.sortColumnKey = columnKey;
      }

      // Call getCompanies with updated sortColumnKey
      this.getCompanies(this.searchQuery, this.sortColumnKey);
    },

    async deleteRecord(id) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await this.removeData(id);
      }
    },

    editCompany(company){
    this.setCompany(company);
         this.openModal('update');
    }
  },
  async created() {
     await this.getCompanies()

  }
};
</script>

<style scoped>

</style>