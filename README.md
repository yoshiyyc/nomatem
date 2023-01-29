# nomatem
<img src="https://imgur.com/LqwfMZo.png" width="300">

<img src="https://imgur.com/RN5kvBI.jpg" width="400">  

  
  
|--------------------------|
### [>> Demo <<](https://yoshiyyc.github.io/nomatem/html/index.html)
Username: 111@gmail.com  

Password: 123456   
|--------------------------|　    

　 
　
### What Is NOMATEM?
NOMATEM is a language-learning-focused social platform built with JSON Server. The two main services include:  
* "Discussion Board" - Post & filter posts based on different languages
* "Language Friends Search" - Search a language partner based on your on language needs   

　 
### Skills Used
| Skills     | Description |
| ----------- | ----------- |
| UI Design | Planned for the overall visuals and utilized Whimsical and Figma for sitemap and wireframe creation.       |
| Layout   | Built an RWD website using HTML, CSS / SCSS while adapting Bootstrap and the grid system.        |
| Back End  | Mocked a REST API with JSON Server (-Auth) and implemented JWT registration / log-in verification.       |
| Front End | Developed with JavaScript while integrating Axios for API requests and Validate.js for form verification.      |  

　
### 關於 NOMATEM
NOMATEM 基於 JSON Server 製作的以語言交流為主題的複合式網站。兩大主要服務為： 
* 「討論板（論壇）」— 可依不同語言發文及分類文章
* 「語言夥伴」— 依自身語言需求搜尋交流對象

　 
### 使用技能
| 技能     | 描述 |
| ----------- | ----------- |
| 設計 | 使用 Whimsical 及 Figma 製作網站地圖及設計稿，規劃視覺圖及主顏色       |
| 切版   | 使用 HTML、CSS / SCSS、搭配 Bootstrap 及其格線系統製作響應式網頁        |
| 後端  | 使用 JSON Server (-Auth) 建立資料庫及模擬 API，搭載 JWT 註冊/登入驗證功能       |
| 前端 | 以 JavaScript 進行開發，使用套件包含可串接  API 的 Axios 及驗證表單的 Validate.js     |

　
---
### Data & API - 資料與 API 存取
<img src="https://imgur.com/RN5kvBI.jpg" width="400"> 

* Utilize JSON Server to mock a RESTful API and deployed the server on Vercel: https://github.com/yoshiyyc/nomatem-json-server-vercel
* JSON data is categorized into posts, friends (info for language friends), and users
* As JSON Server and Vercel only provide a mock environment and the data written in cannot be saved permanently (data will not be saved after users exit the site), there are some data pre-written in JSON database for demo purposes
* Utilized Axios for API access

　 
* 運用 JSON Server 模擬 RESTful API，並將該 server 部署在 Vercel 上：https://github.com/yoshiyyc/nomatem-json-server-vercel
* JSON Server 資料庫的資料被分為文章、好友（語言夥伴用的介紹）及使用者三大類
* 由於 JSON Server 及 Vercel 僅提供模擬環境，不能永久儲存寫入資料（資料將會在使用者離開該網站後消失），在此先將預設的資料放在 JSON Server 資料庫以供展示用途
* 使用 Axios 以串接 API

#

### Register & Log In - 註冊與登入
<img src="https://imgur.com/QdVcF9e.jpeg" width="400">  

* Enable new users to register their information through the register form
* Validate.js is integrated to prevent empty inputs
* After successful registration, the users will be redirected to the login form

　 
* 可讓新使用者利用註冊表單註冊使用者資訊
* 使用 Validate.js 避免空白欄位註冊
* 成功註冊後，使用者會被導向登入表單
