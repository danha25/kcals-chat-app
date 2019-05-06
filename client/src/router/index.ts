import Vue from 'vue';
import VueRouter from 'vue-router';

import LoginBox from '../components/login/LoginBox.vue';
import Messaging from '../components/messaging/Messaging.vue';
import NotFound from '../components/NotFound.vue';

Vue.use(VueRouter);

const router: VueRouter = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: LoginBox
        },
        {
            path: '/:namespace/:type/:id',
            component: Messaging,
            props: true,
            beforeEnter: (to, from, next) => {
                const type = to.params.type;
                if (type === 'channel' || type === 'direct') next(); else next('/not-found');
            }
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});

export default router;