<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-slate-800 rounded-lg shadow-lg p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-white">로그인</h1>
        <p class="text-gray-400 mt-2">ProCut 플랫폼에 오신 것을 환영합니다</p>
      </div>
      
      <!-- 오류 메시지 -->
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-md text-red-200 text-sm">
        {{ errorMessage }}
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-200">이메일</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="name@example.com"
            :disabled="loading"
          />
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between">
            <label for="password" class="block text-sm font-medium text-gray-200">비밀번호</label>
            <a href="#" class="text-sm text-cyan-500 hover:text-cyan-400">비밀번호 찾기</a>
          </div>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="••••••••"
            :disabled="loading"
          />
        </div>
        
        <div class="flex items-center">
          <input 
            type="checkbox" 
            id="remember" 
            v-model="remember"
            class="h-4 w-4 rounded border-gray-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500"
            :disabled="loading"
          />
          <label for="remember" class="ml-2 block text-sm text-gray-300">
            로그인 상태 유지
          </label>
        </div>
        
        <Button 
          type="submit" 
          class="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 transition-colors"
          :disabled="loading"
        >
          <span v-if="loading">처리 중...</span>
          <span v-else>로그인</span>
        </Button>
      </form>
      
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-slate-800 text-gray-400">또는</span>
        </div>
      </div>
      
      <button 
        @click="handleKakaoLogin" 
        class="w-full flex items-center justify-center gap-2 bg-[#FEE500] text-black font-medium py-2 rounded-md hover:bg-[#FAD700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="loading"
      >
        <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" alt="Kakao" class="w-5 h-5" />
        카카오로 로그인
      </button>
      
      <p class="mt-6 text-center text-sm text-gray-400">
        계정이 없으신가요?
        <NuxtLink to="/auth/register" class="text-cyan-500 hover:text-cyan-400 font-medium">
          회원가입
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '~/components/ui/button';
import { useAuth } from '~/composables/useAuth';
import { useRoute, useRouter } from 'vue-router';

definePageMeta({
  title: '로그인 - ProCut 플랫폼',
  description: 'ProCut 플랫폼 로그인 페이지',
});

const email = ref('');
const password = ref('');
const remember = ref(false);
const loading = ref(false);
const errorMessage = ref('');

// 라우트 파라미터 가져오기 (리다이렉션 경로)
const route = useRoute();
const router = useRouter();
const redirectPath = route.query.redirect as string || '/';

const auth = useAuth();

const handleLogin = async () => {
  try {
    loading.value = true;
    errorMessage.value = '';
    
    // 로그인 API 호출
    await auth.login({
      email: email.value,
      password: password.value
    });
    
    // 로그인 성공 후 리다이렉트
    router.push(redirectPath);
  } catch (error: any) {
    console.error('로그인 실패:', error);
    errorMessage.value = error.response?.data?.message || '이메일 또는 비밀번호가 올바르지 않습니다.';
  } finally {
    loading.value = false;
  }
};

const handleKakaoLogin = () => {
  // TODO: 카카오 로그인 로직 구현
  console.log('카카오 로그인 시도');
  // 카카오 SDK 연동
};
</script> 