import { useAuth } from '~/composables/useAuth';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export default defineNuxtPlugin(async (nuxtApp) => {
  // 라우트 가드 설정
  nuxtApp.hook('app:mounted', () => {
    const auth = useAuth();
    const router = useRouter();
    
    // 페이지 이동 전 권한 체크
    router.beforeEach((
      to: RouteLocationNormalized, 
      from: RouteLocationNormalized, 
      next: NavigationGuardNext
    ) => {
      // 인증이 필요한 페이지들
      const authRequired = [
        '/profile',
        '/projects',
        '/jobs',
      ];
      
      // 현재 경로가 인증 필요 경로 중 하나와 매칭되면 인증 필요
      const requiresAuth = authRequired.some(path => to.path.startsWith(path));
      
      // 인증이 필요하고, 로그인되지 않은 경우
      if (requiresAuth && !auth.isAuthenticated()) {
        // 로그인 페이지로 리다이렉트
        return next({
          path: '/auth/login',
          query: { redirect: to.fullPath }
        });
      }
      
      // 이미 로그인된 상태에서 로그인/회원가입 페이지로 가려고 할 때
      if ((to.path === '/auth/login' || to.path === '/auth/register') && auth.isAuthenticated()) {
        return next('/'); // 홈으로 리다이렉트
      }
      
      next(); // 계속 진행
    });
  });
}); 