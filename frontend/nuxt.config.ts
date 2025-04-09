// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // 서버 설정 추가
  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

  css: [
    '~/assets/css/main.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  image: {
    format: ['webp']
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'ProCut 플랫폼',
      meta: [
        { name: 'description', content: '건설업 종사자 전용 플랫폼, ProCut에서 일거리를 찾고 관리하세요.' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' }
      ]
    }
  },

  // 런타임 환경 설정
  runtimeConfig: {
    // 서버 측에서만 사용 가능한 private 키
    jwtSecret: process.env.JWT_SECRET,
    
    // 클라이언트에서도 사용 가능한 public 키
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3000/api'
    }
  },

  routeRules: {
    // 인증이 필요한 페이지들
    '/profile/**': { ssr: false },
    '/projects/**': { ssr: false },
    '/jobs/**': { ssr: false },
  },

  // 자동 임포트 설정
  imports: {
    dirs: ['stores', 'utils', 'composables']
  },

  compatibilityDate: '2025-04-09'
})