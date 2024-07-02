import {
    LOGIN_ACTION,
    SET_USER_TOKEN_DATA_MUTATION,
    SHOW_LODADING_LOADER_MUTATION,
    LOGOUT_ACTION
} from "@/store/constants";
import apiService from '@/services/apiService';


export default {
    [LOGOUT_ACTION](context) {
        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
            email: null,
            token: null,
            userId: null,
            role:null,
        });
        localStorage.removeItem('userData');

    },


    async [LOGIN_ACTION](context,palyload){

        context.commit(SHOW_LODADING_LOADER_MUTATION,true);

        try {
           const response = await apiService.post('/login',palyload);
        if(response.status===200){
            console.log(response.data.token);
            let tokenData = {
                email: response.data.user.email,
                token: response.data.token,
                userId: response.data.user.id,
                role: response.data.role.name,
            };
            localStorage.setItem('userData', JSON.stringify(tokenData));

            context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
            context.commit(SHOW_LODADING_LOADER_MUTATION,false);


        }
       } catch (error) {
            if(error?.response.status==401){
                throw 'email or password are not valid';
            }

       }




   }
}