# kdt2024_3_4
## 베리코멘드
### 인공지능 기반 플레이리스트 추천 및 음원 스트리밍 웹 플랫폼
----
> ## 제작 기간
> 2025.01.17 - 2025.02.13.

> ## 프로젝트 목표
> 1. 자바, 스프링, 리액트 등의 프레임워크를 활용한 풀스택 서비스 구현
> 2. 기존 음원사이트의 기능을 벤치마킹해 개인 맞춤형 플레이리스트 기능 제공에 집중한 음원 스트리밍 웹 플랫폼 개발
> 3. 사용자의 수요를 만족시키기 위한 감정 기반 음악 분석 딥러닝 모델 개발을 통해 인공지능을 활용한 플레이리스트 추천 시스템 구현
> 4. 음원 스트리밍 플랫폼에서의 월별 구독 서비스를 통한 수익 창출 모델 구현
> 5. 깃허브에서의 문서 버전 관리를 통한 팀 협업 능력 향상
> 6. 사용자 편의를 고려한 UI/UX 설계 및 반응형 웹 구현

> ## 프로젝트 내용
> ### 사용 기술
> * **Front-End** : React, Javascript
> * **Back-end** : Spring, node.js, Java
> * **Database** : MySQL
> * **Crawling** : Python
> * **AI (Deep Learning)** : Python, Colab
> * **API** : last.fm API, 카카오페이 결제 API, Google OAuth API 2.0
>   
> ### 웹사이트 구성
> * **메인화면**  
>   * 실시간 음원 차트 : *멜론 크롤링, Spring Batch*
>   * 플레이어 (회원만 이용 가능) : *node.js 서버(유튜브 영상 -> mp3 변환)*
>   * 노래 정보, 앨범 정보, 아티스트 정보 페이지로 이동
> 
> * **추천** (PREMIUM 회원만 이용 가능)
>   * 인공지능 활용 감정 기반 맞춤형 플레이리스트 : *Python*  
>   * 추천 플레이리스트 저장
>
> * **검색**
>   * 키워드 기반 음악 정보 검색<br />
> (곡명으로 검색 / 앨범명으로 검색 / 아티스트명으로 검색)
>
> * **마이페이지**
>   * 개인정보 수정 (비밀번호, 이메일, 별명)
>   * 구독정보 관리 (구독 상태 확인/결제/해지) : *카카오 결제 API (BASIC -> PREMIUM)*
>   * 플레이리스트 관리(생성/수정/삭제)
>
> * **로그인**
>   * OAuth 로그인(구글)
>   * 회원가입 / 일반 로그인 : *JWT 토큰*
>   * ID 찾기
>   * PW 찾기 : *SMTP(인증코드 확인 절차 후 임시 비밀번호 발급)*
>

> ## **시연 영상**<br />
> [![베리코멘드 시연 영상](http://img.youtube.com/vi/FF8keqVIBd8/0.jpg)](https://youtu.be/FF8keqVIBd8?t=0s)
