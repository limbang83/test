import { ref, readonly } from 'vue';

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  mobile: string;
  skill_level: string;
  work_history: string;
  regions: string[];
}

export const useAuth = () => {
  const { $api } = useNuxtApp();
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  // 사용자 상태 복원
  const restoreUser = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        user.value = JSON.parse(storedUser);
      }
    } catch (err) {
      console.error('Failed to restore user:', err);
    }
  };
  
  // 로그인
  const login = async (payload: LoginPayload) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await $api.post('/auth/login', payload);
      const { accessToken, user: userData } = response.data;
      
      // 토큰과 사용자 정보 저장
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      user.value = userData;
      return response.data;
    } catch (err: any) {
      console.error('Login error:', err);
      error.value = err.response?.data?.message || '로그인에 실패했습니다. 다시 시도해주세요.';
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  // 회원가입
  const register = async (payload: RegisterPayload) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await $api.post('/auth/register', payload);
      return response.data;
    } catch (err: any) {
      console.error('Register error:', err);
      error.value = err.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.';
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  // 로그아웃
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    user.value = null;
    
    // 로그인 페이지로 리다이렉트
    navigateTo('/auth/login');
  };
  
  // 현재 사용자가 로그인 되어 있는지 확인
  const isAuthenticated = () => {
    return !!user.value && !!localStorage.getItem('token');
  };
  
  // 이메일 중복 확인
  const checkEmailDuplicate = async (email: string) => {
    try {
      const response = await $api.get(`/users/check-email?email=${email}`);
      return response.data;
    } catch (err) {
      console.error('Email check error:', err);
      throw err;
    }
  };
  
  // 초기화 (클라이언트 측에서만 실행)
  if (process.client) {
    restoreUser();
  }
  
  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    login,
    register,
    logout,
    isAuthenticated,
    checkEmailDuplicate
  };
}; 