# mariaDB 접속정보
- profilm.mycafe24.com:profilm
- id : profilm
- password : dntjd9713!!

# 데이터베이스 스키마 (주요 엔티티)
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