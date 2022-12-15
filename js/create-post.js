const newPostLanguage = document.querySelector("#newPostLanguage");
const newPostTitle = document.querySelector("#newPostTitle");
const newPostThumbnail = document.querySelector("#newPostThumbnail");
const newPostContent = document.querySelector("#newPostContent");
const newPostAgreement = document.querySelector("#newPostAgreement");
const newPostBtn = document.querySelector("#newPostBtn");

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");

let postData;
let postNum = 0;

newPostBtn.addEventListener("click", e => {
    e.preventDefault();
    createPost();
})

async function createPost() {
    await axios.get("http://localhost:3000/posts")
        .then(response => {
            postNum = response.data.length + 1;
        })
        .catch(error => {
            console.log(error);
        });

    await axios.post("http://localhost:3000/posts", {
        "id": `p${postNum}`,
        "url": "#",
        "title": newPostTitle.value,
        "userId": userId,
        "language": newPostLanguage.value,
        "postTime": Date.now(),
        "updatedTime": Date.now(),
        "viewNum": 0,
        "commentNum": 0,
        "thumbnailImg": newPostThumbnail.value ? newPostThumbnail.value : "../img/undraw_nature_m5ll.svg",
        "content": newPostContent.value,
        "comments": []
    })
        .then(response => {
            postData = response.data;
            alert("Congratulations! You have created a post");
            location.href = "../html/discussion-board.html";
        })
        .catch(error => {
            console.log(error);
        });
}