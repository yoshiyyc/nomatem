const postTitle = document.querySelector("#postTitle");
const originalPostArea = document.querySelector("#originalPostArea");
const replyArea = document.querySelector("#replyArea");
const btnReply = document.querySelector(".btn--reply");

let token = localStorage.getItem("token");
let postId = localStorage.getItem("postId");
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

let postData;

// Onload - Call function to render the page
loadPage();

// Click - Enter create reply page / show alert if not logged in
btnReply.addEventListener("click", e => {
    e.preventDefault();
    if(isLoggedIn) {
        location.href = "../html/reply-post.html";
    }
    else {
        Swal.fire({
            title: "Log In Needed",
            text: "You need to log in before replying a post!",
            icon: "warning",
            confirmButtonText: "Log In",
        })
        .then((result) => {
            location.href = "../html/login.html";
        });
    }
});

// Function - Load page
async function loadPage() {
    // Get initial post data
    await axios.get(`https://nomatem-json-server-vercel.vercel.app/posts/${postId}`)
    .then(response => {
        postData = response.data; 
    })
    .catch(error => {
        console.log(error);
    });

    // Change view number
    await axios.patch(`https://nomatem-json-server-vercel.vercel.app/posts/${postId}`, {
        "viewNum": postData.viewNum + 1
    })
    .then(response => {

    })
    .catch(error => {
        console.log(error);
    })

    // Render page
    await axios.get(`https://nomatem-json-server-vercel.vercel.app/posts/${postId}?_expand=user`)
    .then(response => {
        postData = response.data; 
        renderTitle();
        renderOP();
    })
    .catch(error => {
        console.log(error);
    });

    // Get comment data
    await axios.get(`https://nomatem-json-server-vercel.vercel.app/comments?postId=${postId}&_expand=user`)
    .then(response => {
        commentData = response.data; 
        renderReply();
    })
    .catch(error => {
        console.log(error);
    });
}

// Function - Render title
function renderTitle() {
    postTitle.innerHTML = postData.title;
}

// Function - Render op
function renderOP() {
    originalPostArea.innerHTML = `
        <div class="row d-flex flex-column flex-sm-row border border-primary my-4">
            <div class="col-12 col-sm-3 d-flex flex-row flex-sm-column justify-content-around align-items-center px-2 py-2 py-md-3 border-bottom border-primary border-bottom-sm-0 border-end-sm border-sm-primary">
                <div class="col-3 col-sm-5 d-flex flex-column justify-content-center align-items-center w-sm-100">
                    <div class="avatar__img-container col-6 d-flex mb-1">
                        <div class="border rounded-circle">
                            <img class="avatar__img d-block rounded-circle"
                        src="${postData.user.db.avatar}" alt="${postData.user.db.username}">
                        </div>
                    </div>
                    <p class="my-2 text-center text-primary fw-bold">
                        ${postData.user.db.username}
                    </p>
                </div>
                <ul class="col-5 col-sm-7 list-unstyled mb-0 w-sm-100">
                    ${renderLanguage(postData.user.speak)}       
                </ul>
            </div>
            <div class="col-12 col-sm-9">
                <div class="d-flex justify-content-between align-items-center px-3 py-2 py-md-3 w-100">
                    <p class="mb-0 me-auto fs-7">
                        ${formatTime(postData.postTime)}
                    </p>
                    </div>
                    <p class="px-3 py-2">
                        ${formatNewLine(postData.content)}
                    </p>
            </div>
        </div>
    `;
}

// Function - Render the comments
function renderReply() {
    replyArea.innerHTML = commentData.map(i => {
        return `
            <li class="row d-flex flex-column flex-sm-row border border-primary my-4">
                <div class="col-12 col-sm-3 d-flex flex-row flex-sm-column justify-content-around align-items-center px-2 py-2 py-md-3 border-bottom border-primary border-bottom-sm-0 border-end-sm border-sm-primary">
                    <div class="col-3 col-sm-5 d-flex flex-column justify-content-center align-items-center w-sm-100">
                        <div class="avatar__img-container col-6 d-flex mb-1">
                            <div class="border rounded-circle">
                                <img class="avatar__img d-block rounded-circle" src="${i.user.db.avatar}" alt="${i.user.db.username}">
                            </div>
                        </div>
                        <p class="my-2 text-center text-primary fw-bold">
                            ${i.user.db.username}
                        </p>
                    </div>
                    <ul class="col-5 col-sm-7 list-unstyled mb-0 w-sm-100">
                        ${renderLanguage(i.user.speak)}
                    </ul>
                </div>
                <div class="col-12 col-sm-9">
                    <div class="d-flex justify-content-between align-items-center px-3 py-2 py-md-3 w-100">
                        <p class="mb-0 me-auto fs-7">
                            ${formatTime(i.commentTime)}
                        </p>
                    </div>
                    <p class="px-3 py-2">
                        ${formatNewLine(i.content)}
                    </p>
                </div>
            </li>
        `
    }).join("");
}

// Function - Render languages
function renderLanguage(data) {
    return data.map(i => {
        return `
            <li class="d-flex flex-column flex-lg-row mb-1 mb-lg-0">
                <p class="col mb-0 px-3 text-lg-end fs-7">
                    ${i.language}
                </p>
                <p class="col mb-0 px-3 fs-7">
                    ${i.level}
                </p>
            </li>
        `;
        }).join("");
} 

// Function - Format timestamp to regular date & time
function formatTime(timestamp) {
    let dateTime = new Date(timestamp);

    let year = dateTime.getFullYear();
    let month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    let date = dateTime.getDate().toString().padStart(2, "0");
    let hour = dateTime.getHours();
    let minute = dateTime.getMinutes();

    return `${year}/${month}/${date} ${hour <= 12 ? hour : hour - 12}:${minute.toString().padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
}

// Function - Format string from JSON (add new lines)
function formatNewLine(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
}

