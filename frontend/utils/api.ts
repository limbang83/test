/**
 * API 통신을 위한 유틸리티 함수
 */

// 기본 설정 가져오기
const getBaseUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiBaseUrl;
};

/**
 * API 요청을 보내는 기본 함수
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  
  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API 요청 실패: ${response.status}`);
  }
  
  return response.json();
}

/**
 * GET 요청
 */
export function get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return fetchApi<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * POST 요청
 */
export function post<T>(
  endpoint: string, 
  data?: any, 
  options: RequestInit = {}
): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT 요청
 */
export function put<T>(
  endpoint: string, 
  data?: any, 
  options: RequestInit = {}
): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE 요청
 */
export function del<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return fetchApi<T>(endpoint, { ...options, method: 'DELETE' });
} 