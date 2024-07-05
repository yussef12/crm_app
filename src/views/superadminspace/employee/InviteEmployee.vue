<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <div class="row">
        <div class="col-12 mb-1">
          <label>Employee Name</label>
          <Field name="invited_name" type="text" class="form-control"
                 :class="{ 'is-invalid': errors.invited_name }"/>
          <div class="invalid-feedback">{{ errors.invited_name }}</div>
        </div>
        <div class="col-12 mb-1">
          <label>Employee Email</label>
          <Field  name="invited_email" type="email" class="form-control"
                 :class="{ 'is-invalid': errors.invited_email }"/>
          <div class="invalid-feedback">{{ errors.invited_email }}</div>
        </div>

        <div class="col-12 mb-1">
          <label>Company</label>
          <Field name="company_id" as="select" class="form-control" :class="{ 'is-invalid': errors.company_id }">
            <option value="">Select company</option>
            <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
          </Field>
          <div class="invalid-feedback">{{ errors.company_id }}</div>
        </div>

        <div class="col-12 mt-3">
          <div class="d-grid gap-2">
            <button class="btn btn-success btn-block" type="button" disabled v-if="loadingButton">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
            <button type="submit" class="btn btn-success" v-else>Save</button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import apiService from '@/services/apiService';

export default {
  components: {
    Form,
    Field,
  },
  data() {
    return {
      invitation: {
        invited_name: '',
        invited_email: '',
        company_id: '', // This will hold the selected company_id
      },
      schema: Yup.object().shape({
        invited_name: Yup.string().required('Employee name is required'),
        invited_email: Yup.string().email('Invalid email format').required('Employee email is required'),
        company_id: Yup.string().required('Company is required'),
      }),
      companies: [], // Array to store fetched companies
      loadingButton: false,
    };
  },
  mounted() {
    this.getCompanies(); // Fetch companies when component mounts
  },
  methods: {
    async getCompanies() {
      try {
        const response = await apiService.get('/companies'); // Adjust endpoint as per your API
        this.companies = response.data; // Assuming response.data is an array of company objects [{ id, name }]
      } catch (error) {
        console.error('Error fetching companies:', error);
        // Handle error
      }
    },
    async onSubmit(values, {resetForm}) {
      let invitationData = values;
      resetForm();
      this.loadingButton = true;
      this.saveInvitation(invitationData);
    },
    async saveInvitation(invitationData) {
      const invitation= invitationData
      invitation.app_url=window.location.origin+'/employee-validate';
      console.log(invitation);
      try {
        const response = await apiService.post('/users/invite-employee', invitation); // Adjust endpoint as per your API
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Invitation sent successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        this.$emit('invitation-saved');
      } catch (error) {
        console.error('Error sending Invitation. please retry later', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error sending Invitation. please retry later',
          showConfirmButton: false,
          timer: 3000,
        });
      }
      this.loadingButton = false;
    },
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
