# 프로컷(ProCut) 플랫폼 PRD

## 1. 개요  
- **프로젝트명**: 프로컷(ProCut) 플랫폼  
- **목적**: 인테리어필름시공 종사자 및 업체를 위한 통합 관리 플랫폼 (구인/구직, 업무 관리, 커뮤니티, 기술 지원, 교육 지원, 구매)  
- **주요 타깃**:  
  - 인테리어필름 관련 종사자(발주처포함)
  - 기술자(조공, 준기공, 기공)  
  - 외주 업체 및 중고장터 이용자  
  - 전체이용 예상 고객수 : 5,000명 이상

## 2. 기능 요구사항  

### 2.1 로그인/회원가입 
 
#### 2.1.1 로그인
- **기능 설명**:  
  - 이메일 + 비밀번호 기반 회원가입 및 로그인 
  - 소셜 로그인(카카오)
- **기술 구현**:
  - 세션 기반 인증 방식 사용
  - 세션 타임아웃: 1시간

#### 2.1.2 회원가입 
- **필수 정보**:  
  - 이메일 (중복 확인), 비밀번호 (bcrypt 암호화)  
  - 닉네임 (중복 확인), 연락처 (핸드폰 인증)  
  - 활동지역 (복수 선택), 숙련도 (조공/준기공/기공), 경력 (시작월을 선택하여 현재기준 경력산정)
- **기술 구현**:
  - 핸드폰 인증 (NICE PASS) 나중 구현
  - 비밀번호 정책: 최소 8자, 소문자 포함, 숫자 포함, 특수문자 포함

#### 2.1.3 프로필 관리  
- **기능 설명**:  
  - 프로필 사진 업로드
  - 활동지역/숙련도/경력 수정  
  - 비밀번호/이메일/연락처 변경 (재인증 필수)  
- **비즈니스 규칙**:  
  - 숙련도 변경은 월 1회만 허용
- **기술 구현**:
  - 이미지 업로드: 서버 저장, 최대 10MB 이하
  - 파일 업로드 시 확장자 검사 : MIME TYPE 검사해서 jsp, asp, php, js, ts, exe, msi, sh 등 실행가능한 파일 업로드 제한

### 2.2 업무 관리  

#### 2.2.1 일정관리
- **기능 설명**:  
  - 캘린더 기반 일정 작성/수정/삭제 (구인/구직과 완벽한 연계)
  - 구직 노출 일정 설정 (설정 일자 자동 구직 매칭)
  - 매출/매입 데이터 연동 (PJT별, 구인요청자별 자동 계산)  
  - 일정 알림 (푸시알림)
- **기술 구현**:
  - 캘린더 UI: React Big Calendar 또는 FullCalendar 라이브러리 사용
  - App Push 알림 시스템: Firebase Cloud Messaging 연동 ( 가입필요 )
  - 크론 작업: 예정된 알림 전송을 위한 스케줄러

#### 2.2.2 매출/매입 관리
- **기능 설명**:  
  - PJT별, 월별 재료비/인건비/경비 분류  
  - 통계자료 시각화 지원
- **기술 구현**:
  - 데이터 시각화: Chart.js 또는 D3.js 사용
  - 엑셀 내보내기: exceljs 또는 유사 라이브러리 사용
  - 데이터 집계: SQL 집계 함수 활용 (mySQL)

### 2.3 커뮤니티  

#### 2.3.1 구인
- **기능 설명**:  
  - 구인글 list 제공
  - 구인글 등록:  
    - 프로젝트명, 현장 주소 (네이버 지도 API 연동), 일시, 모집 인원 (숙련도 필터), 특이사항 등록  
    - 긴급 구인 알림 (구직자 위치기반 실시간 푸시) 
    - 구직자 지원시 구인자에게 AppPush 알림
- **기술 구현**:
  - 지도 API: Naver Map API 연동
  - 실시간 알림: AppPush (Firebase Cloud Messaging 이용)
  - 검색 기능: mySQL의 SQL Query 사용

#### 2.3.2 구직
- **기능 설명**: 
  - 프로필 자동 연동 (활동지역/숙련도 기준 매칭)  
  - 일정관리 연동(구직 노출 일정 연계)
  - 지원/채택 알림 (알림 푸시)  
  - 검색필터 : mySQL의 SQL Query 사용
  - 알림설정(구인글의 지역, 조건 설정하여 충족하는 글 생성시 알람 푸시)
  - 구인 채택 알림 (알림 푸시)
- **기술 구현**:
  - 매칭 알고리즘: 위치기반 + 숙련도 + 일정 가용성 고려
  - 필터링: mySQL의 SQL Query 사용

#### 2.3.3 외주
- **기능 설명**:  
  - 부분/턴키 외주 등록 (참여자 선택 시스템)  
  - 프로젝트명, 기간, 주소(지도 API 연동), 페이, 사진 자료, 특이사항 등록
  - 지원/채택 알림(알림푸시)
- **기술 구현**:
  - 다중 이미지 업로드 기능

#### 2.3.4 중고장터
- **기능 설명**:  비중이 낮음
  - 물품 등록(사진, 내용, 금액, 거래지역 입력)
  - 거래 완료 상태 관리  
  - 채팅 기능
- **기술 구현**:
  - 실시간 채팅: Socket.io 또는 Firebase Realtime Database
  - 이미지 캐러셀: React Slick 또는 Swiper 라이브러리

### 2.4 기술 지원  

#### 2.4.1 실측 프로그램
- **기능 설명**:  
  - 음성 입력 → 항목별 사이즈 자동 기입 STT 라이르러리 사용 (오입력방지를 위한 재확인 시스템)  
  - 프로젝트별 데이터 저장/수정  
  - 실측한 자료기준 배치 프로그램, 견적 프로그램 이동 탭제공
- **기술 구현**:
  - 음성인식: Web Speech API 또는 외부 API(예: Google Speech-to-Text) 연동
  - 데이터 저장: 로컬 스토리지 + 서버 동기화 구현

#### 2.4.2 배치 프로그램
- **알고리즘**:  
  - 프론트엔드 에서 계산에 필요한 데이터 입력받음
  - 기본정보를 백엔드로 전송 후 2D Bin Packing 알고리즘 (자동/수동 모드) 사용
  - 백엔드에서 계산된 결과값은 리턴
  - 백엔드에서 취득한 정보로 프론트엔드에서 출력
  - 추가 알고리즘 2개 제공(비교 선택 기능)
  - 알고리즘 배치 규칙 : 
     - 직사각형 기준 배치
     - 겹칩현상 제외
     - 로스율, 재단용이성 고려 배치
  - 배치 완료 후 정보제공(필름 사용량/배치조각 수량/로스율) 
- **조각list**:
  - 실측 프로그램 연동(선택)
  - 엑셀 자료 업로드/다운로드
  - 수동 list 추가 및 수정, 삭제
- **배치canvas**:
  - 조각list 기준 알고리즘을 통한 배치 시각화 표현
  - 조각의 중심에는 list정보 text 표현(명칭/size/수량(n/total))
  - 여백(loss물량)에 size정보 표현
  - list별 색상으로 구분(파스텔톤)
  - 수동으로 배치 이동(조각 상호간 겹침 안됨)
  - 출력기능(이미지출력/배치순서별 조각list엑셀 내보내기 및 라벨기를 통한 출력)
- **기술 구현**:
  - Canvas 렌더링: HTML5 Canvas API 또는 SVG (React 통합)
  - 알고리즘 구현: JavaScript/TypeScript 최적화 구현
  - Excel 처리: SheetJS 또는 exceljs 라이브러리

#### 2.4.3 견적 프로그램  
- **원가자료**:  
  - 원가자료 카케고리 추가, 수정,삭제
  - 원가자료 list 추가,수정,삭제
  - 원가구성(재료비, 인건비, 경비)
     - 재료비:list별 폭,길이를 입력하면 자동계산(원자재size를 기반하여 사용면적으로 계산하여 금액산출)
     - 인건비:list별 시간기입하면 자동계산(밑작업시간+랩핑시간)
     - 경비:투입인원별 경비 자동계산  
- **견적서 작성**: 
  - 기존견적 불러오기, 신규작성, 견적서 삭제
  - 견적작성 기본정보 항목(견적번호,발주처,PJT명,제출일자,연락처)
  - list별 항목 입력
     - 원가 자동 연동
     - 제출금액, 목표이익율 선정시 단가 자동계산
  - 견적 각종 금액 및 비율 정보 시각화 표현(재료비, 인건비, 경비, 이익금)
  - 출력기능(프린터, 엑셀내보기, PDF변환)
- **기술 구현**:
  - PDF 생성: jsPDF 또는 유사 라이브러리
  - 계산 엔진: 클라이언트 측 계산 + 서버 측 검증
  - URL link 방식도 구현

#### 2.4.4 시공 도움 서비스
- **시공예시 영상**:
  - 부분별 시공영상 제공(유튜브링크)
- **필름 및 부자재정보**:
  - 제조사별 필름 카다로그 및 정보제공  
- **교육**: 
  - 학원 연계정보 제공
- **기술 구현**:
  - YouTube 재생은 HTML5 로
  - PDF 뷰어 통합 (필름 카탈로그 제공)

### 2.5 구매  
- **필름/부자재구매**:  
  - 제조사별 카테고리 필터링  
  - 결제 시스템 
  - 배송 추적
- **재단서비스**:
  - 배치프로그램 연계  
  - 결제 시스템
  - 배송 추적
- **기술 구현**:
  - 결제 게이트웨이: PG 검색 후 연동
  - 배송 추적: 택배사 API 연동

### 2.6 고객센터
- **기능 설명**:  
  - 자주묻는질문
  - 실시간채팅
  - Q&A
- **기술 구현**:
  - 챗봇 서비스: 단순 질문에 대한 자동 응답 기능
  - 실시간 상담: Socket.io 기반 관리자-사용자 채팅

## 3. 기술 스택 및 구현 상세

### 3.1 프론트엔드
- **핵심 기술**: Nuxt.js
- **스타일링**: Tailwind CSS + inspira-ui + shadcn/vue 
- **주요 라이브러리**:
  - 차트: recharts 또는 Chart.js
  - 날짜/시간: moment 라이브러리 사용해줘
  - 테이블: TanStack Table
  - 지도: Naver Map SDK
  - 알림: react-toastify
  - 배치프로그램 canvas : Konva.js (https://konvajs.org/docs/sandbox/Objects_Snapping.html) 사용

### 3.2 백엔드
- **핵심 기술**: NestJS
- **데이터베이스**: mariaDB(mySQL)
- **ORM**: Prisma
- **API 타입**: RESTful API
- **주요 라이브러리**:
  - 파일 업로드: 서버에 저장
  - 검증: HTML5 valid 사용
  - 알림: Apppush
  - 로깅: 일별 + 시간별로 서버 저장

### 3.3 데이터베이스 스키마 (주요 엔티티)
0. BaseEntity 로 enabled created_at, created_id, update_at, update_id 이걸 넣어놓고 공통으로 관리되게 구현해줘
   - created_at, update_at 포맷은 YYYY-MM-DD HH:MI:SS 방식으로 해줘
1. **User**: 사용자 정보
   - id, email, password, name, mobile, regions[], skill_level, work_history, enabled created_at, created_id, update_at, update_id
   - mobile 은 유일한값으로 unique 설정 해줘
   - mobile 은 -를 빼고 저장하고 보여줄때는 -를 붙히는 방식으로 구현
2. **Project**: 프로젝트 정보
   - id, title, address, start_date, end_date, owner_id, status, enabled created_at, created_id, update_at, update_id
3. **JobPosting**: 구인 게시글
   - id, project_id, required_skills[], positions[], emergency, status, enabled created_at, created_id, update_at, update_id
4. **JobApplication**: 구직 지원
   - id, job_posting_id, applicant_id, status, enabled created_at, created_id, update_at, update_id
5. **Schedule**: 일정
   - id, user_id, title, start_date, end_date, type, related_id, enabled created_at, created_id, update_at, update_id
6. **FinancialRecord**: 매출/매입 기록
   - id, user_id, project_id, type, amount, category, date, created_at, update_at
7. **MarketItem**: 중고장터 물품
   - id, seller_id, title, description, price, images[], status, enabled created_at, created_id, update_at, update_id
8. **Message**: 메시지/채팅
   - id, sender_id, receiver_id, content, read, enabled created_at, created_id, update_at, update_id

### 3.4 API 엔드포인트 구조
- **/api/auth**: 인증 관련 (로그인, 회원가입, 토큰 갱신)
- **/api/users**: 사용자 관리
- **/api/projects**: 프로젝트 관리
- **/api/jobs**: 구인/구직
- **/api/schedule**: 일정 관리
- **/api/finances**: 매출/매입 관리
- **/api/market**: 중고장터
- **/api/messages**: 메시지/채팅
- **/api/tools**: 실측/배치/견적 프로그램
- **/api/edu**: 시공 도움 자료
- **/api/shop**: 구매 관련
- **/api/support**: 고객센터
- **/api/board**: 게시판

## 4. 개발 및 배포 로드맵

### 4.1 개발 우선순위
1. **MVP (1차)**
   - 회원가입/로그인
   - 구인/구직 기본 기능
   - 일정 관리 기본 기능
   - 프로필 관리
   - 배치 프로그램

2. **2차 개발**
   - 실측 프로그램
   - 견적 프로그램
   - 재무 관리
   - 외주 관리
   - 알림 시스템 고도화
   - 통계 및 시각화 고도화
  
3. **3차 개발**: 10주
   - 구매 시스템
   - 시공 도움 서비스
   - 고객센터
   - 성능 최적화

### 4.2 테스트 전략
- **단위 테스트**: Jest 사용 (코드 커버리지 70% 이상)
- **통합 테스트**: API 엔드포인트 테스트


### 4.3 배포 환경
- **모니터링**: Prometheus + Grafana
- **로깅**: ELK Stack 또는 Datadog

## 5. UI/UX 요구사항

### 5.1 주요 화면 레이아웃
- **대시보드**: 일정, 공지, 알림, 추천 구인/구직 정보를 한눈에 볼 수 있는 개인화된 화면
- **구인/구직**: 카드형 + 지도형 혼합 인터페이스
- **캘린더**: 월간/주간/일간 전환 가능한 인터페이스

## 6. 보안 요구사항
- **인증/인가**: 세션기반
- **데이터 보호**: 모든 개인정보 암호화 저장
- **접근제어**: 사용자별 ROLE 부여 시스템 구현

## 7. 확장성 고려사항
- **어플 버전 관리**: 업데이트 되었을때 앱 스토어로 이동 링크 제공
