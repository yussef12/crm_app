<template>
  <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
    <div class="row">
      <div class="col-4 mb-1">
        <label>Full name</label>
        <Field  v-model="profile.name"  name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }"/>
        <div class="invalid-feedback">{{ errors.name }}</div>
      </div>
      <div class="col-4 mb-1">
        <label>email</label>
        <Field  v-model="profile.email"  name="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }"/>
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <div class="col-4 mb-1">
        <label>Birth date</label>
        <Field  v-model="profile.birth_date" name="birth_date" type="date" class="form-control" :class="{ 'is-invalid': errors.birth_date }"/>
        <div class="invalid-feedback">{{ errors.birth_date }}</div>
      </div>
      <div class="col-4 mb-1">
        <label>Phone number</label>
        <Field  v-model="profile.phone_number"  name="phone_number" type="text" class="form-control" :class="{ 'is-invalid': errors.phone_number }"/>
        <div class="invalid-feedback">{{ errors.phone_number }}</div>
      </div>
      <div class="col-4 mb-1">
        <label> Address</label>
        <textarea  v-model="profile.address" name="address" type="text" rows="2" class="form-control" :class="{ 'is-invalid': errors.address }"/>
        <div class="invalid-feedback">{{ errors.address }}</div>
      </div>

    </div>
    <div class="row">
      <div class="col-4 mb-3">
        <label>Password</label>
        <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }"/>
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <div class="col-4 mb-3">
        <label>Confirm Password</label>
        <Field name="confirm_password" type="password" class="form-control"
               :class="{ 'is-invalid': errors.confirm_password }"/>
        <div class="invalid-feedback">{{ errors.confirm_password }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <button type="submit" class="btn btn-success btn-lg">save</button>
        <button type="submit" class="btn btn-secondary btn-lg ms-1">reset</button>
      </div>
    </div>

  </Form>

</template>

<script>
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import {mapGetters} from "vuex";
import {GET_USER_ID, GET_USER_ROLE} from "@/store/constants";
import apiService from "@/services/apiService"
import Swal from "sweetalert2";

export default {
  components: {
    Form,
    Field,

  },
  computed: {
    ...mapGetters('auth', {
      role: GET_USER_ROLE,
      id: GET_USER_ID
    }),


  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      birth_date: Yup.date().nullable(),
      phone_number: Yup.string().nullable()
          .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      address: Yup.string().nullable(),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
      confirm_password: Yup.string()
          .required('Confirm Password is required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    return {
      schema,
      profile: {},
      selectedAgent: null
    }
  },
  methods: {
    onSubmit(values) {
      let call = values;
      call.agent_id = this.selectedAgent ?? this.id;
      this.saveCall(call);

    },
    async getAuthProfile() {
      try {
        const response = await apiService.post('/me')

        console.log(response.data);
        this.profile = response.data.user;
      } catch (error) {
        console.log(error)

      }
    },
    async saveCall(call) {

      try {
        const response = await apiService.post('/calls', call)
        console.log(response)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Call created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Call failed to be created",
          showConfirmButton: false,
          timer: 1500,
        });


      }

    }
  },
  mounted() {
    this.getAuthProfile()

  }
}
</script>
