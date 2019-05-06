import Vue from 'vue';
import VueRouter from 'vue-router';

import LoginBox from '../components/login/LoginBox.vue';
import Messaging from '../components/messaging/Messaging.vue';

Vue.use(VueRouter);

const router: VueRouter = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: LoginBox
        },
        {
            path: '/:namespace',
            component: Messaging
        }
    ]
});

export default router;