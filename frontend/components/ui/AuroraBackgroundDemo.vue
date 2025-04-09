<template>
  <AuroraBackground>
    <div
      ref="contentRef"
      class="relative flex flex-col gap-4 items-center justify-center px-4"
      :style="animationStyle"
    >
      <div class="text-3xl md:text-7xl font-bold dark:text-white text-center">
        인테리어필름시공 종사자를 위한 통합 관리 플랫폼
      </div>
      <div class="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        ProCut - 구인/구직, 업무 관리, 커뮤니티, 기술 지원까지 모두 한 곳에서
      </div>
      <button class="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-6 py-3">
        지금 시작하기
      </button>
    </div>
  </AuroraBackground>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import AuroraBackground from './AuroraBackground.vue';

const contentRef = ref(null);
const isVisible = ref(false);
const animationStyle = computed(() => {
  return {
    opacity: isVisible.value ? 1 : 0,
    transform: `translateY(${isVisible.value ? 0 : 40}px)`,
    transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
    transitionDelay: '0.3s'
  };
});

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });
  
  if (contentRef.value) {
    observer.observe(contentRef.value);
  }
  
  // 페이지 로드 시 애니메이션 즉시 시작
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script> 