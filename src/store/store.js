import {createStore} from "vuex";
import auth from "./modules/auth/index";
import company from "./modules/company/index";
import {SHOW_ERROR_MESSAGE_MUTATION, SHOWING_LOADER_MUTATION} from "@/store/constants";

const store = createStore({

        modules: {
            auth,
            company
        },
        state() {
            return {
                isLoading: false,
                loginErrorMessage:'',
            }

        },
        mutations: {
            [SHOWING_LOADER_MUTATION](state,payload){
                state.isLoading = payload;
            },
            [SHOW_ERROR_MESSAGE_MUTATION](state,payload){
                state.loginErrorMessage = payload;
            }
        },

    }
);
export default store;