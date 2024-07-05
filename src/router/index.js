import {createRouter, createWebHistory} from 'vue-router'
import routes from './routes'
import store from '@/store/store';
import {IS_USER_AUTHENTICATE_GETTER, GET_USER_ROLE} from '@/store/constants';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    if (
        'auth' in to.meta &&
        to.meta.auth &&
        !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/login');
    } else if (
        'auth' in to.meta &&
        !to.meta.auth &&
        store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/dashboard');
    } else {

        const userRole = store.getters[`auth/${GET_USER_ROLE}`] ;
        const requiredRoles = to.meta.requiredRoles; // Access array of required roles from route meta

        if (requiredRoles && Array.isArray(requiredRoles) && requiredRoles.length > 0) {
            // Check if user has any of the required roles
            const hasRequiredRole = requiredRoles.includes(userRole);

            if (hasRequiredRole) {
                next(); // Proceed to the route if user has any of the required roles
            } else {
                next({ path: '/403' }); // Redirect to forbidden page if user does not have required roles
            }
        } else {
            next(); // Proceed if no specific role is required
        }
    }
});

export default router