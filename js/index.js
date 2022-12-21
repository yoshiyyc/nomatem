const bannerBtnGroup = document.querySelector("#bannerBtnGroup");
const endBtnGroup = document.querySelector("#endBtnGroup");
const indexDbTbody = document.querySelector("#indexDbTbody");
const indexFriendsList = document.querySelector("#indexFriendsList");

let userId = localStorage.getItem("userId");
let token = localStorage.getItem("token");
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

let dbData;
let lfData;
let keyProfileId;

// Onload - Call function to render buttons 
renderBtn();

// Onload - Get data for discussion board
axios.get("https://nomatem-json-server-vercel.vercel.app/posts?_expand=user&_sort=updatedTime&_order=desc&_limit=5")
    .then(response => {
        dbData = response.data;
        renderDbTable(dbData);
    })
    .catch(error => {
        console.log(error);
    })

// Onload - Get data for language friends
axios.get("https://nomatem-json-server-vercel.vercel.app/friends?_expand=user&isPublish=true&_sort=updatedTime&_order=desc&_limit=6")
    .then(response => {
        lfData = response.data;
        renderFriendsList();
    })
    .catch(error => {
        console.log(error);
    })


// Click - Enter post page
indexDbTbody.addEventListener("click", e => {
    if(e.target.classList.contains("post__link")) {
        e.preventDefault();
        keyPostId = e.target.dataset.postId;
        localStorage.setItem("postId", keyPostId);
        location.href = "../html/post.html";
    }
});

// Click - Enter friends profile page / show alert if not logged in
indexFriendsList.addEventListener("click", e => {
    e.preventDefault();

    if(e.target.classList.contains("profile__link")) {
        if(isLoggedIn) {
            keyProfileId = e.target.dataset.profileId;
            localStorage.setItem("profileId", keyProfileId);
            location.href = "../html/friends-profile.html";
        }
        else {
            alert("You need to log in before viewing a profile!");
        }
    }
})

// Function - Render discussion board table
function renderDbTable(data) {
    indexDbTbody.innerHTML = data.map(i => {
        return `
            <tr>
                <td class="col-1 text-center">
                    ${i.language}
                </td>
                <td class="col-1">
                    <a class="d-block" href="../html/post.html">
                    <img class="post__link d-block mx-auto my-auto"
                    src=${i.thumbnailImg}
                    alt="${i.title}" data-post-id="${i.id}">
                    </a>
                </td>
                <td class="col-6">
                    <a class="post__link d-block" href="../html/post.html" data-post-id="${i.id}">
                        ${i.title}
                    </a>
                    <span class="d-block fs-7">
                        ${i.user.db.username}
                    </span>
                </td>
                <td class="col-1 text-center fs-7">
                    ${i.viewNum}
                </td>
                <td class="col-1 text-center fs-7">
                    ${i.commentNum}
                </td>
                <td class="col-1 text-center fs-7">
                    ${formatTime(i.updatedTime)}
                </td>
            </tr>
        `;
    }).join("");
}

// Function - Render language friends list
function renderFriendsList() {
    indexFriendsList.innerHTML = lfData.map(i => {
        return `
            <li class="col">
                <div class="card h-100 border-primary shadow-sm">
                    <div class="card-header d-flex justify-content-between mb-0 text-white bg-primary">
                        <button class="text-white bg-transparent border-0">
                            <i class="bi bi-heart d-block"></i>
                        </button>
                        <h5 class="text-center my-auto">
                            ${i.displayName}
                        </h5>
                        <button class="text-white bg-transparent border-0">
                            <i class="bi bi-three-dots-vertical d-block"></i>
                        </button>
                    </div>
                    <div class="card-body container py-0">
                        <div class="row d-flex flex-column flex-sm-row justify-content-start justify-content-sm-between align-items-center py-2 border-bottom">
                            <div class="col-6 col-sm-5 d-flex justify-content-center align-items-center my-2 my-sm-0">
                                <div class="avatar__img-container">
                                    <img class="avatar__img friends__avatar d-block border rounded-circle"
                                src="${i.avatar}" alt="${i.displayName}">
                                </div>
                            </div>
                            <p class="col-12 col-sm-7 friends__summary px-2 mb-0">
                                ${i.summary}
                            </p>
                        </div>
                        <div class="row d-flex flex-column flex-md-row justify-content-start justify-content-md-between align-items-start pt-2 pb-3">
                            <div class="col my-1 my-md-0">
                                <p class="mb-0 fw-semibold">
                                    Speak
                                </p>
                                <ul class="list-unstyled">
                                    ${renderLanguage(i.user.speak)}
                                </ul>
                            </div>
                            <div class="col my-1 my-md-0">
                                <p class="mb-0 fw-semibold">
                                    Learning
                                </p>
                                <ul class="list-unstyled">
                                    ${renderLanguage(i.user.learn)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer btn-group d-flex flex-column flex-sm-row p-0 bg-transparent border-0 rounded-0" role="group" aria-label="Language Friends Buttons">
                        <a class="profile__link col col-sm-6 btn btn-secondary d-block py-3 py-sm-2 border-0 rounded-0 rounded-bottom" data-profileId=${i.id} href="../html/friends-profile.html">
                            Profile
                        </a>
                    </div>
                </div>
            </li>
        `;
    }).join("");
}

// Function - Create new language
function renderLanguage(data) {
    return data.map(i => {
        return `
            <li class="d-flex">
                <p class="col me-1 mb-0 fs-7">
                    ${i.language}
                </p>
                <p class="col mb-0 fs-7">
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

// Function - Render the buttons on the banner / footer section
function renderBtn() {

    // Recheck login status
    axios.get(`https://nomatem-json-server-vercel.vercel.app/users/${userId}`, {
        headers: {
            "authorization": `Bearer ${token}`,
        }
    })
        .then(response => {
            let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

            if(isLoggedIn) {
                bannerBtnGroup.innerHTML = `
                    <a class="col-9 col-md-5 btn btn-outline-secondary mx-0 mx-md-0 my-2 my-md-0 py-2 border border-2 border-secondary shadow-sm"
                href="../html/discussion-board.html" role="button">
                        Discussion Board
                    </a>
                    <a class="col-9 col-md-5 btn btn-outline-tertiary mx-0 mx-md-auto my-2 my-md-0 py-2 border border-2 border-tertiary shadow-sm" href="../html/language-friends.html" role="button">
                        Language Friends
                    </a>
                `
        
                endBtnGroup.innerHTML = "";
            }
            else {
                bannerBtnGroup.innerHTML = `
                    <a class="col-9 col-md-5 btn btn-outline-secondary mx-0 mx-md-0 my-2 my-md-0 py-2 border border-2 border-secondary shadow-sm" href="../html/register.html" role="button">
                        Get Started
                    </a>
                    <a class="col-9 col-md-5 btn btn-outline-tertiary mx-0 mx-md-auto my-2 my-md-0 py-2 border border-2 border-tertiary shadow-sm" href="../html/login.html" role="button">
                        Log In
                    </a>
                `
        
                endBtnGroup.innerHTML = `
                    <a class="col-9 col-sm-6 col-md-5 btn btn-outline-secondary d-block mx-1 my-2 py-2 border border-2 border-secondary shadow-sm" href="../html/register.html" role="button">
                        Get Started
                    </a>
                    <a class="col-9 col-sm-6 col-md-5 btn btn-outline-tertiary d-block mx-1 my-2 py-2 border border-2 border-tertiary shadow-sm" href="../html/login.html" role="button">
                        Log In
                    </a>
                `;
            }


        })
        .catch(error => {
            console.log(error);
            if(error.response.data === "jwt expired" || error.response.data === 
            "Missing token") {
                localStorage.setItem("isLoggedIn", false);
            }
        })
}