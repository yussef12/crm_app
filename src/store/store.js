import {createStore} from "vuex";
import auth from "./modules/auth/index";
import company from "./modules/company/index";
import {
    SHOW_LODADING_LOADER_MUTATION
} from "@/store/constants";

const store = createStore({

        modules: {
            auth,
            company
        },
        state() {
            return {
                isLoading: false,
            }

        },
        mutations: {
            [SHOW_LODADING_LOADER_MUTATION](state, payload) {
                state.isLoading = payload;
            },

        },

    }
);
export default store;