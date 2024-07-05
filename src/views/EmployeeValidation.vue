
<template>
 <div class="validation-container">
   <div class="validation">
     <div class="row justify-content-center">
       <div class="col-8 bg-light p-5">
         <h3>Validate your invitaion</h3>
         <p>Please complete all required fields, so you could be able to validate your account to be able to get connected to our crm as a employee</p>
         <div class="container">

           <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" ref="form">
             <div class="row">
               <div class="col-4 mb-1">
                 <label>Full name</label>
                 <Field name="name" type="text" class="form-control"
                        :class="{ 'is-invalid': errors.name }"/>
                 <div class="invalid-feedback">{{ errors.name }}</div>
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

               <div class="row justify-content-start">
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
             </div>
             <div class="row mt-3">
               <div class="col-3">
                 <button class="btn btn-success btn-lg" type="button" disabled v-if="loadingButton">
                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                   Loading...
                 </button>
                 <button type="submit" class="btn btn-success btn-block" v-else>Save</button>
               </div>
             </div>
           </Form>
         </div>
       </div>

     </div>

   </div>
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
  props:{
    token: {
      type: String,
      required: true
    }
  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required('Full name is required'),
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
      let employee = values;
      employee.token = this.token
      this.loadingButton = true;
      await this.saveEmployee(employee);
      this.loadingButton = false;
    },
    async saveEmployee(employee) {
      try {
        const response = await apiService.post('validate-employee-creation', employee);
        console.log(response);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "congratulation ! employee  validate successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        this.resetForm();

        this.$router.push({ name: 'LoginPage' })

        // Reset the form after successful submission
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Employee validation failed",
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

</style>