import LoginPage from '../views/LoginPage.vue'
import DashboardLayout from "@/layout/DashboardLayout.vue";
import ProfileDetails from "@/views/users/ProfileDetails.vue";
import NotFound from '@/views/NotFound.vue';
import CompanyListing from '@/views/superadminspace/company/CompanyListing.vue';
import AdminListing from "@/views/superadminspace/superadmin/AdminListing.vue";
import EmployeeListing from "@/views/superadminspace/employee/EmployeeListing.vue";
import CreateAdmin from "@/views/superadminspace/superadmin/CreateAdmin.vue";
import InvitationListing from "@/views/superadminspace/invitation/InvitationListing.vue";
import EmployeeValidation from "@/views/EmployeeValidation.vue";
import apiService from "@/services/apiService";
import LogsListing from "@/views/administratorspace/LogsListing.vue";
import EmployeeOfComayListing from "@/views/employeespace/EmployeeOfComayListing.vue";

const validateToken = async (token) => {
    const url = `${process.env.VUE_APP_BASE_API}/is-invitation-link-valid`;
    try {
        const response = await apiService.post(url, {token});
        return response.data.is_valid;
    } catch (error) {
        return false;
    }
};
const routes = [

    {
        path: '/:pathMatch(.*)*',
        component: NotFound,

    },
    {
        path: '/',
        name: 'home',
        component: LoginPage,
        meta: {auth: false}
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
        meta: {auth: false}
    },
    {
        path: '/employee-validate/:token',
        name: 'employee.validation',
        component: EmployeeValidation,
        props: true,
        meta: {auth: false},
        beforeEnter: async (to, from, next) => {
            const token = to.params.token;
            const isValid = await validateToken(token);
            if (isValid) {
                next();
            } else {
                next('/not-found');
            }
        }
    },
    {
        path: '/dashboard/:pathMatch(.*)*',
        component: NotFound
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardLayout,
        meta: {auth: true, title: 'Dashboard', requiredRoles: ['superadmin', 'employee', 'administrator']},
        children: [
            {
                path: '/profile',
                name: 'profile',
                component: ProfileDetails,
                meta: {auth: true, title: 'Profile details', requiredRoles: ['superadmin', 'employee']},

            },
        ],
    },

    {
        path: '/admin',
        name: 'admin',
        component: DashboardLayout,
        meta: {auth: true, title: 'Dashboard', requiredRoles: ['superadmin']},

        children: [
            {
                path: 'companies',
                name: 'admin.companies',
                component: CompanyListing,
                meta: {auth: true, title: 'Companies Listing', requiredRoles: ['superadmin']},

            },
            {
                path: 'superadmin',
                name: 'admin.superadmins',
                component: AdminListing,
                meta: {auth: true, title: 'Super Admins Listing', requiredRoles: 'superadmin'},
            },
            {
                path: 'employees',
                name: 'admin.employees',
                component: EmployeeListing,
                meta: {
                    auth: true,
                    title: 'Employee Listing',
                    requiredRoles: ['superadmin']
                },
            },
            {
                path: 'create',
                name: 'admin.create',
                component: CreateAdmin,
                meta: {
                    auth: true,
                    title: 'Create super Admin',
                    requiredRoles: ['superadmin']
                },
            },
            {
                path: 'invitations',
                name: 'admin.invitations',
                component: InvitationListing,
                meta: {
                    auth: true,
                    title: 'Invitation Listing',
                    requiredRoles: ['superadmin']
                },

            }
        ],
    },
    {
        path: '/employee',
        name: 'employee',
        component: DashboardLayout,
        meta: {auth: true, title: 'Dashboard', requiredRoles: ['employee']},

        children: [
            {
                path: 'company-employees',
                name: 'company-employees',
                component: EmployeeOfComayListing,
                meta: {auth: true, title: 'Company employees Listing', requiredRoles: ['employee']},

            },
        ],
    },
    {
        path: '/administrator',
        name: 'administrator',
        component: DashboardLayout,
        meta: {auth: true, title: 'Dashboard', requiredRoles: ['administrator']},

        children: [
            {
                path: 'logs',
                name: 'logs',
                component: LogsListing,
                meta: {auth: true, title: 'Logs Listing', requiredRoles: ['administrator']},

            },
        ],
    },

]


export default routes
