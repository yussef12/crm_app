import {GET_USER_TOKEN_DATA,GET_USER_EMAIL,GET_USER_ROLE,GET_USER_ID,IS_USER_AUTHENTICATE_GETTER} from "@/store/constants";


export default {


    [GET_USER_TOKEN_DATA]:state=>{
        return state.token
    },
    [GET_USER_EMAIL]:state=>{
        return state.email
    },
    [GET_USER_ROLE]:state=>{
        return state.role;
    },
    [GET_USER_ID]:state=>{
        return state.userId;
    },
    [IS_USER_AUTHENTICATE_GETTER]:state=>{
        return !!state.token;
    }
}