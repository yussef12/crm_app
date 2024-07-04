<template>
  <div v-if="!loading">
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <div class="row">
        <div class="col-4 mb-1">
          <label>Full name</label>
          <Field v-model="profile.name" name="name" type="text" class="form-control"
                 :class="{ 'is-invalid': errors.name }"/>
          <div class="invalid-feedback">{{ errors.name }}</div>
        </div>
        <div class="col-4 mb-1">
          <label>email</label>
          <Field v-model="profile.email" name="email" type="email" class="form-control"
                 :class="{ 'is-invalid': errors.email }"/>
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>

        <div class="col-4 mb-1">
          <label>Birth date</label>
          <Field v-model="profile.birth_date" name="birth_date" type="date" class="form-control"
                 :class="{ 'is-invalid': errors.birth_date }"/>
          <div class="invalid-feedback">{{ errors.birth_date }}</div>
        </div>
        <div class="col-4 mb-1">
          <label>Phone number</label>
          <Field v-model="profile.phone_number" name="phone_number" type="text" class="form-control"
                 :class="{ 'is-invalid': errors.phone_number }"/>
          <div class="invalid-feedback">{{ errors.phone_number }}</div>
        </div>
        <div class="col-4 mb-1">
          <label> Address</label>
          <textarea v-model="profile.address" name="address" type="text" rows="2" class="form-control"
                    :class="{ 'is-invalid': errors.address }"/>
          <div class="invalid-feedback">{{ errors.address }}</div>
        </div>

      </div>
      <div class="row">
        <div class="col-3">
          <button class="btn btn-success btn-lg"  type="button" disabled v-if="loadingButton">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
          <button type="submit" class="btn btn-success btn-lg" v-else>save</button>
          <button type="button" class="btn btn-secondary btn-lg ms-1" @click="reset">reset</button>
        </div>
      </div>

    </Form>
  </div>
  <div v-else>
    <Skeleton/>
  </div>

</template>

<script>
import {Form, Field} from 'vee-validate';
import Skeleton from '@/components/Skeleton.vue'
import * as Yup from 'yup';
import {mapGetters} from "vuex";
import {GET_USER_ID, GET_USER_ROLE} from "@/store/constants";
import apiService from "@/services/apiService"
import Swal from "sweetalert2";

export default {
  components: {
    Form,
    Field,
    Skeleton

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
      birth_date: Yup.date()
          .nullable()
          .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'Must be at least 18 years old')
          .typeError('Invalid date format'),
      phone_number: Yup.string().nullable()
          .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      address: Yup.string().nullable(),

    });

    return {
      schema,
      profile: {},
      loading: true,
      loadingButton:false,
    }
  },
  methods: {
    onSubmit(values) {
      let profile = values;
      this.loadingButton=true;
      this.updateProfile(profile);

    },
    async getAuthProfile() {
      try {
        const response = await apiService.post('/me')
        this.profile = response.data.user;
        this.loading=false;
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "something wrong, Profile page can not be loaded",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async updateProfile(profile) {

      try {
        const response = await apiService.put('/update-user', profile)
        console.log(response)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Profile update has been failed",
          showConfirmButton: false,
          timer: 1500,
        });


      }
      this.loadingButton=false;

    },
    reset(){
      this.loading=true;
      this.getAuthProfile();
    },
  },
  mounted() {
    this.getAuthProfile()

  }
}
</script>
