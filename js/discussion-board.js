const discussionSearchbar = document.querySelector("#discussionSearchbar");
const searchbarBtn = document.querySelector(".searchbar__btn")
const btnPost = document.querySelector("#btnPost");
const dbTbody = document.querySelector("#dbTbody");
const dbLanguageSelect = document.querySelector("#dbLanguageSelect");

let token = localStorage.getItem("token");

let dbData;
let keyPostId;

let isLoggedIn;
localStorage.getItem("isLoggedIn") === "true" ? isLoggedIn = true : isLoggedIn = false;

axios.get("http://localhost:3000/posts?_expand=user&_sort=updatedTime&_order=desc")
    .then(response => {
        dbData = response.data;
        renderDbTable(dbData);
    })
    .catch(error => {
        console.log(error);
    });


searchbarBtn.addEventListener("click", e => {
    searchPost();
})

discussionSearchbar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchPost();
    }
});

btnPost.addEventListener("click", e => {
    e.preventDefault();
    if(isLoggedIn) {
        location.href = "../html/create-post.html";
    }
    else {
        alert("You need to log in before posting!");
    }
});

// Click - Filter post language
dbLanguageSelect.addEventListener("change", e => {
    filterLanguage(dbLanguageSelect.value);
})

// Click - Enter post page
dbTbody.addEventListener("click", e => {
    if(e.target.classList.contains("post__link")) {
        e.preventDefault();
        keyPostId = e.target.dataset.postId;
        localStorage.setItem("postId", keyPostId);
        location.href = "../html/post.html";
    }
});


// Function - Render discussion board table
function renderDbTable(data) {
    dbTbody.innerHTML = data.map(i => {
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
                    ${formatTime(i.postTime)}
                </td>
            </tr>
        `;
    }).join("");
}

function searchPost() {
    axios.get(`http://localhost:3000/posts?_expand=user&q=${discussionSearchbar.value}&_sort=updatedTime&_order=desc`)
    .then(response => {
        dbData = response.data;
        renderDbTable(dbData);
    })
    .catch(error => {
        console.log(error);
    });
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


// Function - Filter post language
function filterLanguage(language) {
    let languageList;

    if(language === "All") {
        languageList = dbData;
    }
    else {
        languageList = dbData.filter(i => {
            return i.language === language;
        })
    }

    renderDbTable(languageList);
}