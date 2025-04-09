import 'vue-toast-notification/dist/theme-default.css';
import { useToast } from 'vue-toast-notification';

export default defineNuxtPlugin((nuxtApp) => {
  // 클라이언트 측에서만 실행
  if (process.client) {
    const toast = useToast({
      position: 'top-right',
      duration: 3000,
      pauseOnHover: true
    });
    
    return {
      provide: {
        toast: {
          success: (message: string) => toast.success(message),
          error: (message: string) => toast.error(message),
          info: (message: string) => toast.info(message),
          warning: (message: string) => toast.warning(message),
        }
      }
    };
  }
}); 