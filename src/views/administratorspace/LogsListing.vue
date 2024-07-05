<template>
  <div class="container mt-3">
    <div v-if="loading" class="text-center">
      Loading logs...
    </div>
    <div v-else class="logs-container">
      <div class="row">
        <div v-for="log in logs" :key="log.id" class="col-md-4 mb-4">
          <div :class="['card', log.typeClass]">
            <div class="card-body">
              <h5 class="card-title">{{ log.event_name }}</h5>
              <p class="card-text">
                {{ log.event_name }} from {{ log.triggered_by_role}} :{{ log.triggered_by_name }} to {{ log.invited_employee_name }}
              </p>
              <p class="card-text">
                {{ formatDateTime(log.created_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/apiService";

export default {
  name: "LogsListing",
  data() {
    return {
      logs: [],
      loading: true,
    };
  },
  created() {
    this.fetchLogs();
  },
  methods: {
    async fetchLogs() {
      try {
        const response = await apiService.get('/logs')
        const data = await response.data.logs;
        this.logs = data.map(log => ({
          ...log,
          typeClass: this.getLogTypeClass(log.event_name)
        }));
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        this.loading = false;
      }
    },
    getLogTypeClass(type) {
      switch (type) {
        case 'invitation sent':
          return 'bg-warning text-white';
        case 'invitation validated':
          return 'bg-success text-white';
        case 'invitation cancelled':
          return 'bg-danger text-white';
        default:
          return 'bg-light text-dark';
      }
    },

    formatDateTime(dateTimeString) {
      const date = new Date(dateTimeString);
      return date.toLocaleString(); // Adjust as needed
    },
  }
};
</script>

<style scoped>
.logs-container {
  max-height: 600px;
  overflow-y: auto;
}

.card {
  height: 100%;
}
</style>
