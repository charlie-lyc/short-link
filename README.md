# short-links Toy Project

### BE : Express
### DB : MySQL
### FE : React
### Deploy : https://shortlinks-app.herokuapp.com/


[ API ] 

POST  /short-links                => URL을 short ID로 변환 

GET   /short-links/:shortId       => short ID로 해당 데이터를 조회

GET   /short-links?size=50&page=2 => 50개의 데이터 단위로 스킵하고, 해당 페이지의 데이터를 조회

GET   /r/:shortId                 => short ID로 원래 URL로 이동

GET   /a/:aliasName               => alias name으로 원래 URL로 이동

PATCH /short-links/:shortId       => short ID의 데이터에 alias name을 추가

DELETE /short-links/:shortId      => short ID로 해당 데이터 
