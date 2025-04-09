import axios from 'axios';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  
  const api = axios.create({
    baseURL: 'http://localhost:3005/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // 요청 인터셉터
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // 응답 인터셉터
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // 인증 오류 시 처리
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // 로그인 페이지로 리다이렉트
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login';
        }
      }
      return Promise.reject(error);
    }
  );
  
  return {
    provide: {
      api
    }
  };
}); 