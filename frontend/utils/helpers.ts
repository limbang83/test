/**
 * Tailwind CSS 클래스를 조건부로 결합하는 유틸리티 함수
 */
export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
} 