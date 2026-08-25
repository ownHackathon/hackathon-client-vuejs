import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from "@/stores/AuthStore.js";
import {WorkspaceService} from "@/modules/app/service/WorkspaceService.js";

const router = createRouter({
      history: createWebHistory('/'),
      scrollBehavior(to) {
        if (to.hash) {
          return {
            el: to.hash,
            behavior: 'smooth', // Ermöglicht flüssiges Scrollen
          }
        }
        return {top: 0}
      },
      routes: [
        {
          component: () => import('@app/components/AppView.vue'),
          path: '/app',
          children: [
            {
              path: '/:pathMatch(.*)*',
              name: 'app_path_not_found',
              component: () => import('@app/views/NotFoundView.vue'),
            },
            {
              path: '',
              name: 'app_home',
              component: () => import('@app/views/HomeView.vue')
            },
            {
              path: 'dashboard',
              name: 'app_dashboard',
              component: () => import('@app/views/DashboardView.vue'),
              meta: { requiresAuth: true }
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
              path: 'account',
              meta: {guestOnly: true},
              children: [
                {
                  path: 'activation/:token',
                  name: 'app_account_activation',
                  component: () => import('@/modules/app/views/Account/ActivationView.vue'),
                  props: true,
                },
                {
                  path: 'password/forgotten',
                  name: 'app_account_password_forgotten',
                  component: () => import('@/modules/app/views/Account/PasswordForgottenView.vue'),
                },
                {
                  path: 'password/:token',
                  name: 'app_account_password',
                  component: () => import('@/modules/app/views/Account/PasswordView.vue'),
                  props: true,
                },
              ]
            },
            {
              path: 'workspace',
              meta: {requiresAuth: true},
              children: [
                {
                  path: 'list/me',
                  name: 'app_workspace_me',
                  component: () => import('@/modules/app/views/Workspace/OwnWorkspacesView.vue'),
                  beforeEnter: async (to, from, next) => {
                    try {
                      const response = await WorkspaceService.getOwnWorkspaces({ first: 0, rows: 1 });
                      if (response.totalItems === 0) {
                        next({ name: 'app_workspace_create' });
                      } else {
                        next();
                      }
                    } catch (error) {
                      next();
                    }
                  }
                },
                {
                  path: 'create',
                  name: 'app_workspace_create',
                  component: () => import('@/modules/app/views/Workspace/WorkspaceCreate.vue')
                },
                {
                  path: ':slug',
                  name: 'app_workspace_detail',
                  component: () => import('@/modules/app/views/Workspace/WorkspaceView.vue'),
                  props: true,
                }
              ]
            },
            {
              path: 'markdown-guide',
              name: 'app_md_guide',
              component: () => import('@app/views/MarkdownGuideView.vue')
            },

          ],
        },
        {
          path: '/',
          redirect: 'app'
        },
        {
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
                window.open('https://discord.gg/ZHEaP9p3', '_blank');
                next(false);
              }
            },
            {
              path: 'stoat',
              name: 'external_stoat',
              beforeEnter(to, from, next) {
                window.open('https://stt.gg/mQSxccXZ', '_blank');
                next(false);
              }
            },
            {
              path: 'fluxer',
              name: 'external_fluxer',
              beforeEnter(to, from, next) {
                window.open('https://fluxer.gg/hlSqL7uB', '_blank');
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
