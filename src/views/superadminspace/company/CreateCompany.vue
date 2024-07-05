<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors}">
      <div class="row">
        <div class="col-12 mb-1">
          <label>Company name</label>
          <Field v-model="company.name" name="name" type="text" class="form-control"
                 :class="{ 'is-invalid': errors.name }"/>
          <div class="invalid-feedback">{{ errors.name }}</div>
        </div>

        <div class="col-12 mb-1">
          <label>Size</label>
          <Field name="size" as="select" class="form-control" :class="{ 'is-invalid': errors.size }">
            <option value="">Select size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="big">Big</option>
          </Field>
          <div class="invalid-feedback">{{ errors.size }}</div>
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
import {mapGetters} from 'vuex';
import {GET_USER_ID, GET_USER_ROLE} from '@/store/constants';
import apiService from '@/services/apiService';
import Swal from 'sweetalert2';

export default {
  components: {
    Form,
    Field,
  },
  computed: {
    ...mapGetters('auth', {
      role: GET_USER_ROLE,
      id: GET_USER_ID,
    }),
  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required('Company name is required'),
      size: Yup.string().required('Size is required'),
    });

    return {
      schema,
      company: {
        name: '',
        size: 'small'
      },
      loadingButton: false,
    };
  },
  methods: {
    onSubmit(values, { resetForm }) {
      let company = values;
      resetForm();
      this.loadingButton = true;
      this.saveCompany(company);
    },
    async saveCompany(company) {
      try {
        const response = await apiService.post('/companies', company);
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Company created successfully',
          showConfirmButton: false,
          timer: 1500,
        });

      } catch (error) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'company creation has been failed',
          showConfirmButton: false,
          timer: 1500,
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
