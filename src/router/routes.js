import LoginPage from '../views/LoginPage.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
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
        path: '/dashboard',
        name: 'Dashboard',
        meta: { auth: true },
        component: Dashboard,

        children: [

        ],
    },

]


export default routes
