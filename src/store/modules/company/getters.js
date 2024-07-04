import {
    GET_SELECTED_COMPANY_GETTER
} from "@/store/constants";


export default {


    [GET_SELECTED_COMPANY_GETTER]: state => {
        return state.selectedCompany
    },

}