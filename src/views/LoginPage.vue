<template>
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-6 card shadow p-5">
          <div>
            <div class="alert alert-danger py-3" v-if="loginErrorMessage !== ''">
              <p class="text-danger">{{ loginErrorMessage }}</p>
            </div>
            <Form @submit="onSubmit" :validation-schema="schema">
              <!-- Email input -->
              <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="form3Example3">Email address</label>
                <Field placeholder="Enter email" class="form-control form-control-lg" name="email" type="email"/>
                <span class="text-danger"> <ErrorMessage name="email"/></span>
              </div>
              <!-- Password input -->
              <div data-mdb-input-init class="form-outline mb-3">
                <label class="form-label" for="form3Example4">Password</label>

                <Field placeholder="Enter password" id="form3Example4" class="form-control form-control-lg"
                       name="password" type="password"/>
                <span class="text-danger"> <ErrorMessage name="password"/></span>


              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg"
                        style="padding-left: 2.5rem; padding-right: 2.5rem;">Login
                </button>

              </div>
            </Form>


          </div>
        </div>

      </div>
    </div>
  </section>
</template>
<script>
import {Form, Field, ErrorMessage} from 'vee-validate';
import * as yup from 'yup';
import {mapState, mapActions, mapMutations} from 'vuex';
import {LOGIN_ACTION, SHOW_LODADING_LOADER_MUTATION} from "@/store/constants";


export default {
  name: 'LoginPage',
  components: {
    Form, Field, ErrorMessage

  },
  data() {
    return {
      schema: yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(6),
      })
    };
  },

  methods: {
    ...mapActions('auth',{
      login:LOGIN_ACTION
    }),
    ...mapMutations('auth',{
      showLoading:SHOW_LODADING_LOADER_MUTATION
    }),
    async  onSubmit(values) {
       try {
         this.showLoading(false);
        await this.login(JSON.stringify(values, null, 2))
          this.$router.push('/dashboard');

      }catch (error){
         console.log(error)


      }

    }
  },
  computed: {
    ...mapState('auth', ['loginErrorMessage']),
  }

}
</script>
<style scoped>

.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}

.h-custom {
  height: calc(100% - 73px);
}

@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}


</style>