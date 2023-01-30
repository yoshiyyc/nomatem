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
* As JSON Server and Vercel only provide a mock environment and the data written in cannot be saved permanently (data will not be saved after users exit the site), some data is pre-written in JSON database for demo purposes
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
* After successful registration, the users will be redirected to the login form and are able to log in using the newly registered email and password

　 
* 可讓新使用者利用註冊表單註冊使用者資訊
* 使用 Validate.js 避免空白欄位註冊
* 成功註冊後，使用者會被導向登入表單，並可使用之前註冊的使用者帳密登入


#

### Account - 帳號
<img src="https://imgur.com/syWWh1d.png" width="400">  

* Enable users to update their user information (general / discussion board / language friends) throught the forms in the account pages
* Validate.js is integrated to prevent empty inputs of mandatory fields
* The user can simply add or delete language / contact fields based on their situations
* If an avatar URL is not provided, the website will automatically use default image as avatar

　 
* 可讓使用者利用帳號頁面的表單更新使用者資訊（基本、討論板、語言夥伴）
* 使用 Validate.js 避免必填欄位空白
* 使用者可自由依自身情況來增減語言／聯絡資訊欄位
* 如沒有提供頭像縮圖網址，網站將會自動使用預設圖片作為頭像



#

### Discussion Board - 討論板
<img src="https://imgur.com/8M9b4FK.jpeg" width="400">  

* Able to filter posts based on languages or search by text
* List post details including post language, thumbnails, post title, post author, view number, comment number, and last updated time, and sort the posts based on the last updated time
* 10 posts are listed per page, the others are placed in other pages that can be access through the page number list
* Display the language levels of all the users in a post

　 
* 可依語言分類文章或使用關鍵字搜尋文章
* 列出討論區文章資訊，包含文章語言、文章縮圖、文章主題、文章作者、瀏覽數、留言數、更新時間，並以最後更新時間排序討論區文章
* 一頁可放 10 篇文章，其餘文章則放在其他頁面，可由下方的頁碼列表前往瀏覽
* 列出文章內所有使用者的語言程度

#

### Posts Creation & Reply - 發文＆回覆
<img src="https://imgur.com/tVAihKx.png" width="400">  

* The user can only create post / comment after logging in (If the user is not logged in, he/she will be redirected to the log in page)
* The user will need to fill out the post language, post title, post content, and agree to the forum rules before creating a post (Validate.js is used for empty inputs validation)
* When commenting a post, the original post content will be shown on the page for ease to reply
* If the thumbnail URL is not provided, the website will automatically use default image as thumbnail
* After posting/commenting, the post details on the discussion board page will be updated (e.g. comment number, last updated time, etc.)

　 
* 使用者需登入才能發文／留言（如在登出狀態，使用者會被導向登入頁面）
* 使用者需填入文章語言、文章主題、文章內容，及同意板規才可發文（使用 Validate.js 檢測必填欄位）
* 回覆文章時，原本的文章內容將會顯示在頁面上以方便針對內容回覆
* 如沒有提供文章縮圖網址，網站將會自動使用預設圖片作為縮圖
* 在發文／回覆文章後，討論板的文章資訊將會更新（例：留言數、更新時間等）



#

### Language Friends - 語言夥伴
<img src="https://imgur.com/jBLbGbI.png" width="400">  

* Displays simple information (name, avatar, summary, language levels) of users who agree to display their info on the page
* Enable filtering users based on proficient languges and languages to learn
* The user can only access the profile detail page after logging in
* 10 users are listed per page, the others are placed in other pages that can be access through the page number list

　 
* 顯示同意將資訊公開在此網頁的使用者資訊（名字、頭像、簡介、語言程度）
* 可依善擅長語言及想學習的語言過濾使用者
* 使用者需登入才能瀏覽詳細的語言夥伴頁面
* 一頁可放 10 篇語言夥伴資訊，其餘夥伴資訊則放在其他頁面，可由下方的頁碼列表前往瀏覽

