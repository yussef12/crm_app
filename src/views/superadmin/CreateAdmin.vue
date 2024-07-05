<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" ref="form">
      <div class="row">
        <div class="col-4 mb-1">
          <label>Full name</label>
          <Field name="name" type="text" class="form-control"
                 :class="{ 'is-invalid': errors.name }"/>
          <div class="invalid-feedback">{{ errors.name }}</div>
        </div>
        <div class="col-4 mb-1">
          <label>Email</label>
          <Field name="email" type="email" class="form-control"
                 :class="{ 'is-invalid': errors.email }"/>
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div class="col-4 mb-1">
          <label>Birth date</label>
          <Field name="birth_date" type="date" class="form-control"
                 :class="{ 'is-invalid': errors.birth_date }"/>
          <div class="invalid-feedback">{{ errors.birth_date }}</div>
        </div>
        <div class="col-4 mb-1">
          <label>Phone number</label>
          <Field name="phone_number" type="text" class="form-control"
                 :class="{ 'is-invalid': errors.phone_number }"/>
          <div class="invalid-feedback">{{ errors.phone_number }}</div>
        </div>
        <div class="col-4 mb-1">
          <label>Address</label>
          <textarea name="address" rows="2" class="form-control"
                    :class="{ 'is-invalid': errors.address }"/>
          <div class="invalid-feedback">{{ errors.address }}</div>
        </div>
        <div class="col-4 mb-1">
          <label>Password</label>
          <Field name="password" type="password" class="form-control"
                 :class="{ 'is-invalid': errors.password }"/>
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div class="col-4 mb-1">
          <label>Confirm Password</label>
          <Field name="confirm_password" type="password" class="form-control"
                 :class="{ 'is-invalid': errors.confirm_password }"/>
          <div class="invalid-feedback">{{ errors.confirm_password }}</div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-3">
          <button class="btn btn-success btn-lg" type="button" disabled v-if="loadingButton">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
          <button type="submit" class="btn btn-success btn-lg" v-else>Save</button>
          <button type="button" class="btn btn-secondary btn-lg ms-1" @click="resetForm">Reset</button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import apiService from "@/services/apiService";
import Swal from "sweetalert2";

export default {
  components: {
    Form,
    Field,
  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      birth_date: Yup.date()
          .nullable()
          .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'Must be at least 18 years old')
          .typeError('Invalid date format'),
      phone_number: Yup.string().nullable()
          .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      address: Yup.string().nullable(),
      password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters'),
      confirm_password: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
    });

    return {
      schema,
      loadingButton: false,
    };
  },
  methods: {
    async onSubmit(values) {
      let admin = values;
      this.loadingButton = true;
      await this.saveAdmin(admin);
      this.loadingButton = false;
    },
    async saveAdmin(admin) {
      try {
        const response = await apiService.post('users/create-superadmin', admin);
        console.log(response);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Super admin created successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset the form after successful submission
        this.resetForm();
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Super admin creation failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    resetForm() {
      this.$refs.form.resetForm(); // Reset the form using VeeValidate's resetForm method
    },
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
