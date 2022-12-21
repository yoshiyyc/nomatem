const newPostForm = document.querySelector("#newPostForm");
const newPostLanguage = document.querySelector("#newPostLanguage");
const newPostTitle = document.querySelector("#newPostTitle");
const newPostThumbnail = document.querySelector("#newPostThumbnail");
const newPostContent = document.querySelector("#newPostContent");
const newPostAgreement = document.querySelector("#newPostAgreement");
const createPostInfoMessage = document.querySelectorAll(".createPostInfo-message");
const newPostBtn = document.querySelector("#newPostBtn");

let userId = localStorage.getItem("userId");
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

let postData;
let postNum = 0;

// Onload - Check if the user is logged in to see this page 
loggedInGatekeeper();

// Click - Create post
newPostBtn.addEventListener("click", e => {
    e.preventDefault();
    loggedInGatekeeper();
    validateForm();
})

// Function - Create Post
async function createPost() {
    // Axios - Get total post number
    await axios.get("https://nomatem-json-server-vercel.vercel.app/posts")
        .then(response => {
            postNum = response.data.length + 1;
        })
        .catch(error => {
            console.log(error);
        });

    // Axios - Post a post
    await axios.post("https://nomatem-json-server-vercel.vercel.app/posts", {
        "id": `p${Date.now()}${postNum}`,
        "title": newPostTitle.value,
        "userId": userId,
        "language": newPostLanguage.value,
        "postTime": Date.now(),
        "updatedTime": Date.now(),
        "viewNum": 0,
        "commentNum": 0,
        "thumbnailImg": newPostThumbnail.value ? newPostThumbnail.value : "../img/undraw_nature_m5ll.svg",
        "content": newPostContent.value,
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

// Function - Use validate.js to validate the form inputs
function validateForm() {
    let constraints = {
        newPostLanguage: {
            presence: {
                message: "^This field is required."
            }
        },
        newPostTitle: {
            presence: {
                message: "^This field is required."
            }
        },
        newPostContent: {
            presence: {
                message: "^This field is required."
            }
        },
        newPostAgreement: {
            presence: {
                message: "^This field is required."
            },
            inclusion: {
                within: [true],
                message: "^This field is required."
            }
        }
    };

    let errorMessage = validate(newPostForm, constraints);

    if (errorMessage) {
        createPostInfoMessage.forEach(i => {
            errorMessage[i.dataset.message] 
                ? i.innerHTML = errorMessage[i.dataset.message]
                : i.innerHTML = "";
        });
    }
    else {
        createPostInfoMessage.forEach(i => {
            i.innerHTML = "";
        });
        createPost();
    }
}

// Function - Only allow actions to be executed after logged in
function loggedInGatekeeper() {
    if(!isLoggedIn) {
        alert("You are not logged in");
        location.href = "../html/login.html";
    }
}