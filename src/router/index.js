import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import store from '@/store/store';
import { IS_USER_AUTHENTICATE_GETTER } from '@/store/constants';

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
        next();
    }
});
export default router