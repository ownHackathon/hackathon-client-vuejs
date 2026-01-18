import {createRouter, createWebHistory} from 'vue-router';
import {useTokenStore} from "@/stores/TokenStore.js";

const router = createRouter({
      history: createWebHistory('/'),
      routes: [
        {
          component: () => import('@app/components/AppView.vue'),
          path: '/app',
          children: [
            {
              path: '/',
              redirect: '/app'
            },
            {
              path: '',
              name: 'app_home',
              component: () => import('@app/views/HomeView.vue')
            },
            {
              path: 'login',
              name: 'app_login',
              component: () => import('@app/views/LoginView.vue'),
              meta: { guestOnly: true }
            },
            {
              path: 'logout',
              name: 'app_logout',
              component: () => import('@app/views/LogoutView.vue'),
              beforeEnter: (to, from, next) => {
                if (from.name === 'app_login') {
                  next({ name: 'app_home' });
                } else {
                  next();
                }
              },
              meta: { requiresAuth: true }
            },
            {
              path: 'test',
              name: 'app_test',
              component: () => import('@app/views/TestView.vue')
            },
            {
              path: '/:pathMatch(.*)*',
              name: 'app_path_not_found',
              component: () => import('@app/views/404NotFoundView.vue'),
            },
          ]
        }
      ]
    }
);

router.beforeEach((to, from, next) => {
  const tokenStore = useTokenStore();
  const isAuthenticated = !!tokenStore.getRefreshToken;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'app_login' });
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return next({ name: 'app_home' });
  }

  next();
});

export default router;
