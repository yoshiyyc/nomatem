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
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

let postData;
let commentData;
let commentNum = 0;
let postCommentNum = 0;

// Onload - Check if the user is logged in to see this page 
loggedInGatekeeper();

// Onload - Get OP data to render page
axios.get(`https://nomatem-json-server-vercel.vercel.app/posts/${postId}`)
.then(response => {
    postData = response.data;
    renderPage();
})
.catch(error => {
    console.log(error);
})

// Click - Create comments
btnCreateComment.addEventListener("click", e => {
    e.preventDefault();
    validateForm();
})

// Function - Render page
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

// Function - Create comments
async function createComment() {
    // Get the total number of comments
    await axios.get(`https://nomatem-json-server-vercel.vercel.app/comments`)
    .then(response => {
        commentData = response.data;
        commentNum = commentData.length + 1;
    })
    .catch(error => {
        console.log(error);
    })

    // Post comment
    await axios.post(`https://nomatem-json-server-vercel.vercel.app/comments`, {
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
    
    // Get updated comment data ()
    await axios.get(`https://nomatem-json-server-vercel.vercel.app/comments?postId=${postId}`)
    .then(response => {
        commentData = response.data; 
        postCommentNum = commentData.length;
    })
    .catch(error => {
        console.log(error);
    });

    // Update the comment number and upted time of OP
    await axios.patch(`https://nomatem-json-server-vercel.vercel.app/posts/${postId}`, {
        "commentNum": postCommentNum,
        "updatedTime": Date.now(),
    })
        .then(response => {
            postData = response.data;
            Swal.fire({
                title: "Congratulations",
                text: "You have made a comment!",
                icon: "success",
                confirmButtonText: "OK"
            })
                .then((result) => {
                    location.href = `../html/post.html`;
                });
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

// Function - Only allow actions to be executed after logged in
function loggedInGatekeeper() {
    if (!isLoggedIn) {
        Swal.fire({
            title: "You are not logged in",
            icon: "warning",
            confirmButtonText: "Log In"
        })
        .then((result) => {
            location.href = "../html/login.html";
        });
    }
}