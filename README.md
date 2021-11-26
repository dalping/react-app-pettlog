# react-app-pettlog
https://radiant-hamlet-78297.herokuapp.com/

[FrontEnd]
Html/Css,Javascript,React.js

[BackEnd]
* Server : Node.js Express
* DB : MongoDB
* Storage : Cloudinary

[Hosting]
heroku

===========================

To-Do List
* 구독하기 (팔로잉, 팔로워)
* 포스트 공유 기능
* 포스트 검색(제목,내용,제목+내용,작성자) 기능
* getPost호출 시 페이징 최적화 작업 

Bugs
* 메인에서 새로고침 하면 포스트 props로 userId받지 못해 에러 발생

===========================

2021.9.29
* post UI design
* post, 사진 업로드 구현

2021.9.30
* 좋아요 기능 구현
* 서버 라우터 분류

2021.10.1 
* 댓글 기능 구현
* 이미지 업로드 딜레이 수정
* post 삭제 구현

2021.10.3
* (해결) 댓글 작성 시 닉네임이 출력되지 않는 현상 수정
* (해결) post 삭제 버튼 밀려서 작동

2021.10.4
* 답댓글 기능 구현
* Comment Layout, post font 개선

2021.10.5
* 다수 이미지(최대 3장) 업로드 및 post에 다수 이미지 출력
* post 삭제 시 서버에서도 이미지 삭제 처리
* 내 post만 보기

2021.10.8
* (해결) 메인에서 새로고침 하면 포스트 props로 userId받지 못해 에러 발생

2021.10.10
* 무한 스크롤 구현 
* post작성 시 이미지의 파일 용량, 확장자 제한

2021.10.11
* 프로필 사진 구현
* 작성자 닉네임 클릭 시 [구독, 유저의 포스트 보기, 쪽지 보내기] 출력

2021.10.12~14
* heroku 배포 환경설정
* post UI 및 모바일 UI 셋팅

2021.10.16
* 쪽지 보내기, 쪽지함 구현

2021.10.31
* 유저별 포스트 페이지 구현
* 이미지 Storage를 로컬서버에서 Cloudinary로 이동
* 반응형 UI 개선

2021.11.01
* 1차 배포

===========================
