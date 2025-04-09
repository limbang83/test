# 기술 스택

## 1.프론트엔드
- **핵심 기술**: Nuxt.js
- **스타일링**: Tailwind CSS + inspira-ui + shadcn/vue 
- **주요 라이브러리**:
  - 차트: recharts 또는 Chart.js
  - 날짜/시간: moment 라이브러리 사용해줘
  - 테이블: TanStack Table
  - 지도: Naver Map SDK
  - 알림: react-toastify
  - 배치프로그램 canvas : Konva.js (https://konvajs.org/docs/sandbox/Objects_Snapping.html) 사용

## 2.백엔드
- **핵심 기술**: NestJS
- **데이터베이스**: mariaDB(mySQL)
- **ORM**: Prisma
- **API 타입**: RESTful API
- **주요 라이브러리**:
  - 파일 업로드: 서버에 저장
  - 검증: HTML5 valid 사용
  - 알림: Apppush
  - 로깅: 일별 + 시간별로 서버 저장

  ## 3. 파일구조
  - 프론트엔드(nuxt.js)와 백엔드(nestjs)를 한개의 project폴더안에서 관리함
  - 위 구성에 맞게 순차적으로 구성