
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";


export default {
    namespaced:true,
   state(){
       return {
           token:JSON.parse(localStorage.getItem('userData'))?.token ?? null,
           email:JSON.parse(localStorage.getItem('userData'))?.email ?? null,
           userId:JSON.parse(localStorage.getItem('userData'))?.userId ?? null,
           role :JSON.parse(localStorage.getItem('userData'))?.role ??null,
           isLoading: false,
       }
   },

    mutations,
    getters,
    actions,
}