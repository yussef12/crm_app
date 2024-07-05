import LoginPage from '../views/LoginPage.vue'
import DashboardLayout from "@/layout/DashboardLayout.vue";
import ProfileDetails from  "@/views/users/ProfileDetails.vue";
import NotFound from '@/views/NotFound.vue';
import CompanyListing from '@/views/company/CompanyListing.vue';
import AdminListing from "@/views/superadmin/AdminListing.vue";
import EmployeeListing from "@/views/employee/EmployeeListing.vue";
import CreateAdmin from "@/views/superadmin/CreateAdmin.vue";
import InvitationListing from "@/views/invitation/InvitationListing.vue";

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
        name:'dashboard',
        component: DashboardLayout,
        meta: { auth: true,title:'Dashboard' },
    },
    {
        path: '/admin',
        name: 'admin',
        component: DashboardLayout,
        meta: { auth: true,title:'Dashboard' },

        children: [
            {
                path: 'profile',
                name: 'admin.profile',
                component: ProfileDetails,
                meta: { auth: true,title:'Profile details' },

            },
            {
                path: 'companies',
                name: 'admin.companies',
                component: CompanyListing,
                meta: { auth: true,title:'Companies Listing' },

            },
            {
                path: 'superadmin',
                name: 'admin.superadmins',
                component: AdminListing,
                meta: { auth: true,title:'Super Admins Listing' },
            },
            {
                path: 'employees',
                name: 'admin.employees',
                component: EmployeeListing,
                meta: { auth: true,title:'Employee Listing' },
            },
            {
                path: 'create',
                name: 'admin.create',
                component: CreateAdmin,
                meta: { auth: true,title:'Create super Admin' },
            },
            {
                path: 'invitations',
                name: 'admin.invitations',
                component: InvitationListing,
                meta: { auth: true,title:'Invitation Listing' },

            }
        ],
    },


]


export default routes
