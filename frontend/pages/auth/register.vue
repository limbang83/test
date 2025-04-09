<template>
  <div class="min-h-screen bg-slate-900 py-12 px-4">
    <div class="max-w-2xl mx-auto bg-slate-800 rounded-lg shadow-lg p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-white">회원가입</h1>
        <p class="text-gray-400 mt-2">ProCut 플랫폼의 회원이 되어 다양한 서비스를 이용해보세요</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="space-y-4">
          <h2 class="text-lg font-medium text-white border-b border-slate-700 pb-2">계정 정보</h2>
          
          <!-- 이메일 -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-200">이메일 <span class="text-red-500">*</span></label>
            <div class="flex gap-2">
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                required
                class="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="name@example.com"
              />
              <Button 
                type="button" 
                @click="checkEmailDuplicate" 
                variant="outline" 
                class="border-cyan-500 text-cyan-500 hover:bg-cyan-950"
              >
                중복확인
              </Button>
            </div>
            <p v-if="emailChecked && !emailDuplicate" class="text-green-500 text-xs mt-1">사용 가능한 이메일입니다.</p>
            <p v-if="emailChecked && emailDuplicate" class="text-red-500 text-xs mt-1">이미 사용 중인 이메일입니다.</p>
          </div>
          
          <!-- 비밀번호 -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-200">비밀번호 <span class="text-red-500">*</span></label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              required
              @input="validatePassword"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="••••••••"
            />
            <div class="mt-2 space-y-1 text-xs">
              <p class="font-medium text-gray-300">비밀번호 요구사항:</p>
              <p :class="passwordValidation.minLength ? 'text-green-500' : 'text-gray-400'">
                <span v-if="passwordValidation.minLength">✓</span>
                <span v-else>•</span>
                최소 8자 이상
              </p>
              <p :class="passwordValidation.hasLowerCase ? 'text-green-500' : 'text-gray-400'">
                <span v-if="passwordValidation.hasLowerCase">✓</span>
                <span v-else>•</span>
                소문자(a-z) 포함
              </p>
              <p :class="passwordValidation.hasNumber ? 'text-green-500' : 'text-gray-400'">
                <span v-if="passwordValidation.hasNumber">✓</span>
                <span v-else>•</span>
                숫자(0-9) 포함
              </p>
              <p :class="passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-gray-400'">
                <span v-if="passwordValidation.hasSpecialChar">✓</span>
                <span v-else>•</span>
                특수문자(!@#$%^&*) 포함
              </p>
            </div>
          </div>
          
          <!-- 비밀번호 확인 -->
          <div class="space-y-2">
            <label for="passwordConfirm" class="block text-sm font-medium text-gray-200">비밀번호 확인 <span class="text-red-500">*</span></label>
            <input 
              type="password" 
              id="passwordConfirm" 
              v-model="passwordConfirm" 
              required
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="••••••••"
            />
            <p v-if="passwordConfirm && password !== passwordConfirm" class="text-red-500 text-xs mt-1">
              비밀번호가 일치하지 않습니다.
            </p>
          </div>
        </div>
        
        <div class="space-y-4">
          <h2 class="text-lg font-medium text-white border-b border-slate-700 pb-2">개인 정보</h2>
          
          <!-- 닉네임 -->
          <div class="space-y-2">
            <label for="nickname" class="block text-sm font-medium text-gray-200">닉네임 <span class="text-red-500">*</span></label>
            <div class="flex gap-2">
              <input 
                type="text" 
                id="nickname" 
                v-model="nickname" 
                required
                class="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="사용할 닉네임"
              />
              <Button 
                type="button" 
                @click="checkNicknameDuplicate" 
                variant="outline" 
                class="border-cyan-500 text-cyan-500 hover:bg-cyan-950"
              >
                중복확인
              </Button>
            </div>
            <p v-if="nicknameChecked && !nicknameDuplicate" class="text-green-500 text-xs mt-1">사용 가능한 닉네임입니다.</p>
            <p v-if="nicknameChecked && nicknameDuplicate" class="text-red-500 text-xs mt-1">이미 사용 중인 닉네임입니다.</p>
          </div>
          
          <!-- 연락처 -->
          <div class="space-y-2">
            <label for="phone" class="block text-sm font-medium text-gray-200">연락처 <span class="text-red-500">*</span></label>
            <div class="flex gap-2">
              <input 
                type="tel" 
                id="phone" 
                v-model="phone" 
                required
                class="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="010-0000-0000"
              />
              <Button 
                type="button" 
                variant="outline" 
                class="border-cyan-500 text-cyan-500 hover:bg-cyan-950"
              >
                인증하기
              </Button>
            </div>
            <p class="text-xs text-gray-400">'-' 없이 숫자만 입력해주세요</p>
          </div>
          
          <!-- 활동지역 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-200">활동지역 <span class="text-red-500">*</span></label>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="(region, index) in regions" 
                :key="index"
                @click="toggleRegion(region)"
                :class="[
                  'px-3 py-1 rounded-full text-sm cursor-pointer transition-colors',
                  selectedRegions.includes(region) 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                ]"
              >
                {{ region }}
              </div>
            </div>
            <p class="text-xs text-gray-400">복수 선택 가능합니다</p>
          </div>
          
          <!-- 숙련도 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-200">숙련도 <span class="text-red-500">*</span></label>
            <div class="grid grid-cols-3 gap-2">
              <div 
                v-for="(level, index) in skillLevels" 
                :key="index"
                @click="skillLevel = level.value"
                :class="[
                  'px-3 py-2 rounded-md text-center cursor-pointer transition-colors',
                  skillLevel === level.value 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                ]"
              >
                {{ level.label }}
              </div>
            </div>
          </div>
          
          <!-- 경력 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-200">경력 <span class="text-red-500">*</span></label>
            <div class="flex gap-2">
              <div class="flex-1">
                <label class="block text-xs text-gray-400 mb-1">시작 년도</label>
                <select 
                  v-model="careerStartYear"
                  class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option v-for="year in years" :key="year" :value="year">{{ year }}년</option>
                </select>
              </div>
              <div class="flex-1">
                <label class="block text-xs text-gray-400 mb-1">시작 월</label>
                <select 
                  v-model="careerStartMonth"
                  class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option v-for="month in 12" :key="month" :value="month">{{ month }}월</option>
                </select>
              </div>
            </div>
            <p class="text-xs text-gray-400">현재 기준으로 {{ calculateCareer() }}</p>
          </div>
        </div>
        
        <!-- 약관 동의 -->
        <div class="space-y-3 pt-4">
          <div class="flex items-center">
            <input 
              type="checkbox" 
              id="termsAll" 
              v-model="termsAll"
              @change="handleTermsAllChange"
              class="h-4 w-4 rounded border-gray-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
            <label for="termsAll" class="ml-2 block text-sm font-medium text-white">
              전체 약관에 동의합니다
            </label>
          </div>
          
          <div class="flex items-center pl-6">
            <input 
              type="checkbox" 
              id="termsService" 
              v-model="termsService"
              @change="handleTermsChange"
              class="h-4 w-4 rounded border-gray-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
            <label for="termsService" class="ml-2 block text-sm text-gray-300">
              서비스 이용약관 동의 <span class="text-red-500">*</span>
            </label>
            <Button variant="link" class="text-xs text-cyan-500 ml-auto">보기</Button>
          </div>
          
          <div class="flex items-center pl-6">
            <input 
              type="checkbox" 
              id="termsPrivacy" 
              v-model="termsPrivacy"
              @change="handleTermsChange"
              class="h-4 w-4 rounded border-gray-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
            <label for="termsPrivacy" class="ml-2 block text-sm text-gray-300">
              개인정보 처리방침 동의 <span class="text-red-500">*</span>
            </label>
            <Button variant="link" class="text-xs text-cyan-500 ml-auto">보기</Button>
          </div>
          
          <div class="flex items-center pl-6">
            <input 
              type="checkbox" 
              id="termsMarketing" 
              v-model="termsMarketing"
              @change="handleTermsChange"
              class="h-4 w-4 rounded border-gray-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
            <label for="termsMarketing" class="ml-2 block text-sm text-gray-300">
              마케팅 정보 수신 동의 (선택)
            </label>
          </div>
        </div>
        
        <Button type="submit" class="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 text-lg" :disabled="loading">
          <span v-if="loading">처리 중...</span>
          <span v-else>회원가입</span>
        </Button>
        
        <p class="text-center text-sm text-gray-400">
          이미 계정이 있으신가요?
          <NuxtLink to="/auth/login" class="text-cyan-500 hover:text-cyan-400 font-medium">
            로그인
          </NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Button } from '~/components/ui/button';

definePageMeta({
  title: '회원가입 - ProCut 플랫폼',
  description: 'ProCut 플랫폼 회원가입 페이지',
});

// 회원가입 폼 데이터
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const nickname = ref('');
const phone = ref('');
const skillLevel = ref('APPRENTICE'); // 기본값: 조공

// 로딩 상태
const loading = ref(false);

// 이메일, 닉네임 중복 확인 상태
const emailChecked = ref(false);
const emailDuplicate = ref(false);
const nicknameChecked = ref(false);
const nicknameDuplicate = ref(false);

// 활동지역
const regions = ['서울', '경기', '인천', '대전', '세종', '충남', '충북', '강원', '부산', '울산', '대구', '경북', '경남', '전남', '전북', '광주', '제주'];
const selectedRegions = ref<string[]>([]);

// 숙련도
const skillLevels = [
  { label: '조공', value: 'APPRENTICE' },
  { label: '준기공', value: 'JUNIOR' },
  { label: '기공', value: 'MASTER' },
];

// 경력
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
const careerStartYear = ref(currentYear);
const careerStartMonth = ref(1);

// 약관 동의
const termsAll = ref(false);
const termsService = ref(false);
const termsPrivacy = ref(false);
const termsMarketing = ref(false);

// 비밀번호 실시간 검증
const validatePassword = () => {
  if (!password.value) return;
  
  passwordValidation.minLength = password.value.length >= 8;
  passwordValidation.hasLowerCase = /[a-z]/.test(password.value);
  passwordValidation.hasNumber = /\d/.test(password.value);
  passwordValidation.hasSpecialChar = /[!@#$%^&*]/.test(password.value);
  
  passwordValidation.isValid = 
    passwordValidation.minLength && 
    passwordValidation.hasLowerCase && 
    passwordValidation.hasNumber && 
    passwordValidation.hasSpecialChar;
};

// 비밀번호 유효성 상태
const passwordValidation = ref({
  minLength: false,
  hasLowerCase: false,
  hasNumber: false,
  hasSpecialChar: false,
  isValid: false
});

// 이메일 중복 확인
const checkEmailDuplicate = async () => {
  if (!email.value) {
    alert('이메일을 입력해주세요.');
    return;
  }

  // 이메일 형식 검증
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email.value)) {
    alert('유효한 이메일 주소를 입력해주세요.');
    return;
  }

  try {
    loading.value = true;
    // 이메일 중복 확인은 필요하지만 API가 완성되지 않았으므로 임시로 성공 처리
    // 실제 개발 환경에서는 아래 API 호출을 사용해야 합니다
    /*
    const { $api } = useNuxtApp();
    const response = await $api.get(`/users/check-email?email=${encodeURIComponent(email.value)}`);
    emailDuplicate.value = response.data.exists;
    */
    
    // 임시로 항상 사용 가능한 것으로 설정
    emailChecked.value = true;
    emailDuplicate.value = false;
    
    console.log('이메일 중복 확인 완료:', email.value);
  } catch (error) {
    console.error('이메일 중복 확인 오류:', error);
    // 개발 단계에서는 오류 무시하고 진행
    emailChecked.value = true;
    emailDuplicate.value = false;
  } finally {
    loading.value = false;
  }
};

// 닉네임 중복 확인
const checkNicknameDuplicate = () => {
  if (!nickname.value) {
    alert('닉네임을 입력해주세요.');
    return;
  }
  
  // 임시로 항상 사용 가능하다고 설정 (실제로는 API 호출 필요)
  nicknameChecked.value = true;
  nicknameDuplicate.value = false;
};

// 활동지역 토글
const toggleRegion = (region: string) => {
  if (selectedRegions.value.includes(region)) {
    selectedRegions.value = selectedRegions.value.filter(r => r !== region);
  } else {
    selectedRegions.value.push(region);
  }
};

// 약관 전체 동의 처리
const handleTermsAllChange = () => {
  termsService.value = termsAll.value;
  termsPrivacy.value = termsAll.value;
  termsMarketing.value = termsAll.value;
};

// 개별 약관 동의 시 전체 동의 상태 업데이트
const handleTermsChange = () => {
  termsAll.value = termsService.value && termsPrivacy.value && termsMarketing.value;
};

// 경력 계산
const calculateCareer = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  let years = currentYear - careerStartYear.value;
  let months = currentMonth - careerStartMonth.value;
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return `${years}년 ${months}개월의 경력`;
};

// 회원가입 처리
const handleRegister = async () => {
  // 필수 약관 동의 확인
  if (!termsService.value || !termsPrivacy.value) {
    alert('필수 약관에 동의해주세요.');
    return;
  }
  
  // 중복 확인 여부 체크
  if (!emailChecked.value) {
    alert('이메일 중복 확인을 해주세요.');
    return;
  }
  
  if (!nicknameChecked.value) {
    alert('닉네임 중복 확인을 해주세요.');
    return;
  }
  
  // 비밀번호 확인
  if (password.value !== passwordConfirm.value) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  
  // 비밀번호 정책 검증
  validatePassword();

  if (!passwordValidation.isValid) {
    let errorMsg = '비밀번호는 다음 조건을 충족해야 합니다:\n';
    if (!passwordValidation.minLength) errorMsg += '- 최소 8자 이상\n';
    if (!passwordValidation.hasLowerCase) errorMsg += '- 소문자 포함\n';
    if (!passwordValidation.hasNumber) errorMsg += '- 숫자 포함\n';
    if (!passwordValidation.hasSpecialChar) errorMsg += '- 특수문자(!@#$%^&*) 포함\n';
    
    alert(errorMsg);
    return;
  }
  
  // 활동지역 선택 확인
  if (selectedRegions.value.length === 0) {
    alert('활동지역을 하나 이상 선택해주세요.');
    return;
  }
  
  try {
    loading.value = true;
    const { $api, $toast } = useNuxtApp();
    
    // 경력 시작일 포맷팅
    const workHistoryDate = `${careerStartYear.value}-${String(careerStartMonth.value).padStart(2, '0')}-01`;
    
    // 회원가입 API 호출
    const response = await $api.post('/auth/register', {
      email: email.value,
      password: password.value,
      name: nickname.value,  // name 필드로 변경 (백엔드에서 name을 사용)
      mobile: phone.value.replace(/-/g, ''),  // 하이픈 제거
      skill_level: skillLevel.value,
      work_history: workHistoryDate,  // ISO 형식 날짜 문자열
      // 선택한 지역 이름을 그대로 전송 - 백엔드에서 이름으로 ID를 찾아 처리
      regions: selectedRegions.value
    });
    
    console.log('회원가입 성공:', response.data);
    
    // 성공 메시지 표시
    $toast?.success('회원가입이 완료되었습니다. 로그인해주세요.');
    
    // 로그인 페이지로 이동
    navigateTo('/auth/login');
  } catch (error) {
    console.error('회원가입 오류:', error);
    const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
    alert(errorMessage);
  } finally {
    loading.value = false;
  }
};
</script> 