import {SHOW_LODADING_LOADER_MUTATION,SET_USER_TOKEN_DATA_MUTATION } from "@/store/constants";


export default {


    [SET_USER_TOKEN_DATA_MUTATION](state, payload) {

        state.email = payload.email;
        state.token = payload.token;
        state.userId = payload.userId;
        state.role = payload.role;

    },


    [SHOW_LODADING_LOADER_MUTATION](state, payload) {
        state.isLoading = payload;

    },


}