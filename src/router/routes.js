import LoginPage from '../views/LoginPage.vue'
import DashboardLayout from "@/layout/DashboardLayout.vue";
import ProfileDetails from  "@/views/users/ProfileDetails.vue";
import NotFound from '@/views/NotFound.vue';

const routes = [

    {
        path: '/:pathMatch(.*)*',
        component: NotFound,

    },
    {
        path: '/',
        name: 'home',
        component: LoginPage,
        meta: { auth: false }
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
        meta: { auth: false }
    },
    {
        path: '/dashboard/:pathMatch(.*)*',
        component: NotFound
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardLayout,
        meta: { auth: true,title:'Dashboard' },

        children: [
            {
                path: 'profile',
                name: 'profile',
                component: ProfileDetails,
                meta: { auth: true,title:'Profile details' },


            },
        ],
    },


]


export default routes
