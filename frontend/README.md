# 프로컷(ProCut) 플랫폼 프론트엔드

이 프로젝트는 Nuxt.js를 사용한 프로컷(ProCut) 플랫폼의 프론트엔드 부분입니다. 정적 사이트 생성(SSG) 방식으로 구성되어 있습니다.

## 설치 방법

```bash
# 의존성 설치
npm install
```

## 개발 모드로 실행

```bash
# 개발 서버 실행 (localhost:3000)
npm run dev
```

## 정적 사이트 생성 (SSG)

```bash
# 정적 사이트 생성
npm run generate
```

생성된 파일은 `.output/public` 디렉토리에 저장됩니다. 이 파일들은 어떤 정적 호스팅 서비스(Netlify, Vercel, GitHub Pages 등)에도 배포할 수 있습니다.

## 생성된 정적 사이트 미리보기

```bash
# 생성된 사이트 미리보기
npm run preview
```

## 환경 변수 설정

백엔드 API와 통신하기 위해 다음과 같은 환경 변수를 설정할 수 있습니다:

- `NUXT_PUBLIC_API_BASE_URL`: 백엔드 API 기본 URL (기본값: `http://localhost:3000/api`)

이 환경 변수는 `.env` 파일에 설정하거나 호스팅 서비스의 환경 변수 설정에서 구성할 수 있습니다.

## 빌드된 사이트 배포하기

빌드된 `.output/public` 디렉토리의 내용을 선택한 정적 호스팅 서비스에 업로드하면 됩니다.

### Netlify 배포 예시

```
# netlify.toml
[build]
  command = "npm run generate"
  publish = ".output/public"
```

### Vercel 배포 예시

```
# vercel.json
{
  "buildCommand": "npm run generate",
  "outputDirectory": ".output/public"
}
```

## 기술 스택

- Nuxt.js 3 (SSG 모드)
- Tailwind CSS
- Chart.js
- Moment.js
