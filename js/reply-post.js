const commentForm = document.querySelector("#commentForm");
const opArea = document.querySelector("#opArea");
const postLanguage = document.querySelector("#postLanguage");
const commentContent = document.querySelector("#commentContent");
const commentAgreement = document.querySelector("#commentAgreement");
const commentInfoMessage = document.querySelectorAll(".commentInfo-message")
const btnCreateComment = document.querySelector("#btnCreateComment");

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");
let postId = localStorage.getItem("postId");

let isLoggedIn;
localStorage.getItem("isLoggedIn") === "true" ? isLoggedIn = true : isLoggedIn = false;

let postData;
let commentData;
let commentNum = 0;

loggedInCheck();

btnCreateComment.addEventListener("click", e => {
    e.preventDefault();
    validateForm();
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
        commentNum = commentData.length + 1;
    })
    .catch(error => {
        console.log(error);
    })

    await axios.post(`http://localhost:3000/comments`, {
        "id": `c${Date.now()}${commentNum}`,
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


// Function - Use validate.js to validate the form inputs
function validateForm() {
    let constraints = {
        commentContent: {
            presence: {
                message: "^This field is required."
            }
        },
        commentAgreement: {
            presence: {
                message: "^This field is required."
            },
            inclusion: {
                within: [true],
                message: "^This field is required."
            }
        }
    };

    
    let errorMessage = validate(commentForm, constraints);

    if (errorMessage) {
        console.log(errorMessage);
        commentInfoMessage.forEach(i => {
            errorMessage[i.dataset.message] 
                ? i.innerHTML = errorMessage[i.dataset.message]
                : i.innerHTML = "";
        });
    }
    else {
        commentInfoMessage.forEach(i => {
            i.innerHTML = "";
        });
        createComment();
    }
}


function loggedInCheck() {
    if(!isLoggedIn) {
        alert("You are not logged in");
        location.href = "../html/login.html";
    }
}