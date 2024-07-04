<template>
  <div v-if="!loading">
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
          <Field v-model="company.size" name="size" as="select" class="form-control"
                 :class="{ 'is-invalid': errors.size }">
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
  <div v-else>
    <Skeleton/>
  </div>
</template>

<script>
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import {mapGetters, mapMutations} from 'vuex';
import {GET_SELECTED_COMPANY_GETTER, SET_SELECTED_COMPANY_MUTATION} from '@/store/constants';
import apiService from '@/services/apiService';
import Swal from 'sweetalert2';
import Skeleton from '@/components/Skeleton.vue';
export default {
  components: {
    Skeleton,
    Form,
    Field,
  },
  computed: {
    ...mapGetters('company', {
      company: GET_SELECTED_COMPANY_GETTER,
    }),
  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required('Company name is required'),
      size: Yup.string().required('Size is required'),
    });

    return {
      schema,
      loadingButton: false,
    };
  },
  methods: {
    ...mapMutations('company',{
      setCompany:SET_SELECTED_COMPANY_MUTATION
    }),
    async onSubmit(values, {resetForm}) {
      let company = values;
      resetForm();
      this.loadingButton = true;
      await this.updateCompany(company);
    },
    async updateCompany(company) {
      try {
        const response = await apiService.put('/companies/'+this.company.id, company);
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Company updated successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        this.setCompany(company);
        this.$emit('company-saved');

      } catch (error) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'company update has been failed',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      this.loadingButton = false;
    },
  },
  mounted() {
  }

};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
