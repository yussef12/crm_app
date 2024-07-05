
<template>
  <div v-if="!loading">
    <!-- Search and Invite buttons -->
    <div class="d-flex justify-content-between">
      <div class="w-50">
        <input class="form-control" type="text" v-model="searchQuery" @input="searchInvitation"
               placeholder="Search by invitation email">
      </div>
      <div>
        <button class="btn btn-light text-primary border-primary fw-bold" @click="openModal()"> Invite new Employee
        </button>
      </div>
    </div>
    <hr>

    <!-- Invitation list -->
    <table class="table table-sm table-hover custom-table">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">
          <button class="btn btn-default" @click="sortColumn('invited_email')"><i class="bi bi-sort-up"></i></button>
          email
        </th>
        <th scope="col">company id</th>
        <th scope="col">status</th>
        <th scope="col">created at</th>
        <th scope="col">actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="invitation in filteredInvitations" :key="invitation.id">
        <td>{{ invitation.id }}</td>
        <td>{{ invitation.invited_email }}</td>
        <td>{{ invitation.company_id }}</td>
        <td>{{ invitation.status }}</td>
        <td>{{ formatDateTime(invitation.created_at) }}</td>
        <td>
          <button v-if="invitation.status !== 'validated' && invitation.status !== 'cancelled'"
                  class="btn btn-light text-danger fw-bold btn-sm ms-1"
                  @click="confirmCancel(invitation.id)">
            <i class="text-danger"></i> cancel
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <Skeleton/>
  </div>

  <!-- Modal for inviting new employee -->
  <BootstrapModal ref="modal" title="Invite employee" @confirm="onConfirm">
    <div>
      <InviteEmployee @invitation-saved="getInvitations"/>
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
      invitations: [],
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
        let url = `/invitations/user-invitations?invited_email=${nameQuery}`;
        if (sortColumn) {
          url += `&sort=${sortColumn}`;
        }
        const response = await apiService.get(url);
        this.invitations = response.data.invitations;
        this.filteredInvitations = response.data.invitations;
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
      this.getInvitations(this.searchQuery, this.sortColumnKey);
    },
    async confirmCancel(invitationId) {
      const { value } = await Swal.fire({
        title: 'Are you sure you want to cancel this invitation?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
      });

      if (value) {
        try {
          // Make API call to change invitation status
          await apiService.put(`/invitations/cancel/${invitationId}`);
         await  this.getInvitations();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Invitation canceled successfully",
            showConfirmButton: false,
            timer: 1500
          });
          // Refresh invitations list
          await this.getInvitations(this.searchQuery, this.sortColumnKey);
        } catch (error) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to cancel invitation",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    }
  },
  async created() {
    await this.getInvitations();
  }
};
</script>
