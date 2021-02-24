
// 데이터 대기서버 : server.js
// Cushion 데이터를 받아서 Mongodb에 insert함.
// pm2로 스크립트 무한동작중...

// pm2 확인
pm2 list


// 몽고db 시작
mongo

// DB "kist" 사용
use kist

// Collection "cushion"의 모든 데이터 조회
db.cushion.find()

// Collection "cushion"의 모든 데이터 제거 (조심, 다지워짐)
db.cushion.remove({"id":1})









//// JUST 참고로
// use kist로 "kist" DB에 접속해서 권한있는 user 생성했음.
db.createUser({ user:'kist', pwd:'kistWRLimrc', roles: [ { "role" : "userAdminAnyDatabase", "db" : "admin" }, { "role" : "dbAdminAnyDatabase", "db" : "admin" }, { "role" : "readWriteAnyDatabase", "db" : "admin" } ] })
// "cushion" Collection 생성
db.createCollection("cushion")
// "cushion" Collection의 데이터 개수 확인
db.cushion.count()
