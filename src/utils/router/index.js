import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from "@/stores/AuthStore.js";

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
              path: 'register',
              name: 'app_register',
              component: () => import('@/modules/app/views/Account/RegisterView.vue'),
              meta: {guestOnly: true}
            },
            {
              path: 'login',
              name: 'app_login',
              component: () => import('@/modules/app/views/Account/LoginView.vue'),
              meta: {guestOnly: true}
            },
            {
              path: 'logout',
              name: 'app_logout',
              component: () => import('@/modules/app/views/Account/LogoutView.vue'),
              beforeEnter: (to, from, next) => {
                if (from.name === 'app_login') {
                  next({name: 'app_home'});
                } else {
                  next();
                }
              }
            },
            {
              path: 'account/activation/:token',
              name: 'app_account_activation',
              component: () => import('@/modules/app/views/Account/ActivationView.vue'),
              props: true,
              meta: {guestOnly: true}
            },
            {
              path: 'account/password/forgotten',
              name: 'app_account_password_forgotten',
              component: () => import('@/modules/app/views/Account/PasswordForgottenView.vue'),
              meta: {guestOnly: true}
            },
            {
              path: 'account/password/:token',
              name: 'app_account_password',
              component: () => import('@/modules/app/views/Account/PasswordView.vue'),
              props: true,
              meta: {guestOnly: true}
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
        },
        {
          component: () => import('@app/components/AppView.vue'),
          path: '/external',
          children: [
            {
              path: 'github',
              name: 'external_github',
              beforeEnter(to, from, next) {
                window.open('https://github.com/ownHackathon', '_blank');
                next(false);
              }
            },
            {
              path: 'discord',
              name: 'external_discord',
              beforeEnter(to, from, next) {
                window.open('https://discord.gg/uzqB4YmdTy', '_blank');
                next(false);
              }
            }
          ]
        }
      ]
    }
);

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next({name: 'app_login'});
  }

  if (to.meta.guestOnly && authStore.isLoggedIn) {
    return next({name: 'app_home'});
  }

  next();
});

export default router;
