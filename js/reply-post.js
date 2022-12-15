const opArea = document.querySelector("#opArea");
const postLanguage = document.querySelector("#postLanguage");
const commentContent = document.querySelector("#commentContent");
const commentAgreement = document.querySelector("#commentAgreement");
const btnCreateComment = document.querySelector("#btnCreateComment");

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");
let postId = localStorage.getItem("postId");

let postData;
let commentData;
let commentNum = 0;

btnCreateComment.addEventListener("click", e => {
    e.preventDefault();
    createComment();
})

axios.get(`http://localhost:3000/posts/${postId}`)
.then(response => {
    postData = response.data;
    console.log(postData);
    renderPage();
})
.catch(error => {
    console.log(error);
})

function renderPage() {
    opArea.innerHTML = `
        <p class="mb-0 fw-bold">
            ${postData.title}
        </p>
        <hr>
        <p>
            ${formatNewLine(postData.content)}            
        </p>
    `;

    postLanguage.innerHTML = `
        ${postData.language}
    `
}

// Function - Format string from JSON (add new lines)
function formatNewLine(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
}


async function createComment() {
    await axios.get(`http://localhost:3000/comments`)
    .then(response => {
        commentData = response.data;
        commentNum = commentData.length;
    })
    .catch(error => {
        console.log(error);
    })

    await axios.post(`http://localhost:3000/comments`, {
        "id": `c${commentNum + 1}`,
        "postId": postId,
        "userId": userId,
        "commentTime": Date.now(),
        "content": commentContent.value    
    })
        .then(response => {
            commentData = response.data;
        })
        .catch(error => {
            console.log(error);
        });

    await axios.patch(`http://localhost:3000/posts/${postId}`, {
        "commentNum": commentNum + 1,
        "updatedTime": Date.now(),
    })
        .then(response => {
            postData = response.data;
            alert("Congratulations! You have made a comment");
            location.href = `../html/post.html`;
        })
        .catch(error => {
            console.log(error);
        });
}