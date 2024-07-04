import {SET_SELECTED_COMPANY_MUTATION} from "@/store/constants";


export default {


    [SET_SELECTED_COMPANY_MUTATION](state, payload) {

        state.selectedCompany = payload;

    },



}