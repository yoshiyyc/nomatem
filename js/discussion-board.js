const discussionSearchbar = document.querySelector("#discussionSearchbar");
const searchbarBtn = document.querySelector(".searchbar__btn")
const btnPost = document.querySelector("#btnPost");
const dbTbody = document.querySelector("#dbTbody");
const dbLanguageSelect = document.querySelector("#dbLanguageSelect");
const dbPagination = document.querySelector("#dbPagination");
const pgLinkNumber = document.querySelectorAll(".pg__link-number");

let token = localStorage.getItem("token");
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

let dbData;
let pgNumber = 1;
let keyPostId;

// Onload - Get post data to render page
updateDbData();

// Click - Filter post language
dbLanguageSelect.addEventListener("change", e => {
    updateDbData();
})

// Click - Search the posts using keywords
searchbarBtn.addEventListener("click", e => {
    updateDbData();
})

// Click (Press) - Search the posts using keywords
discussionSearchbar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        updateDbData();
    }
});

// Click - Enter create post page / show alert if not logged in
btnPost.addEventListener("click", e => {
    e.preventDefault();
    if(isLoggedIn) {
        location.href = "../html/create-post.html";
    }
    else {
        alert("You need to log in before posting!");
    }
});

// Click - Enter post page
dbTbody.addEventListener("click", e => {
    if(e.target.classList.contains("post__link")) {
        e.preventDefault();
        keyPostId = e.target.dataset.postId;
        localStorage.setItem("postId", keyPostId);
        location.href = "../html/post.html";
    }
});

// Click - Choose different pages
dbPagination.addEventListener("click", e => {
    e.preventDefault();
    if(e.target.classList.contains("pg__link-number")) {
        pgLinkNumber.forEach(i => {
            i.classList.remove("active");
        });

        e.target.classList.add("active");

        pgNumber = e.target.dataset.pgNumber;
        updateDbData();
    }
});

// Function - Get post data to render page
function updateDbData() {
    if(dbLanguageSelect.value === "All") {
        axios.get(`https://nomatem-json-server-vercel.vercel.app/posts?_expand=user&q=${discussionSearchbar.value}&_sort=updatedTime&_order=desc&_page=${pgNumber}`)
            .then(response => {
                dbData = response.data;
                renderDbTable(dbData);
        })
        .catch(error => {
            console.log(error);
        });
    }
    else {
        axios.get(`https://nomatem-json-server-vercel.vercel.app/posts?_expand=user&q=${discussionSearchbar.value}&language=${dbLanguageSelect.value}&_sort=updatedTime&_order=desc&_page=${pgNumber}`)
            .then(response => {
                dbData = response.data;
                renderDbTable(dbData);
        })
        .catch(error => {
            console.log(error);
        });
    }

}

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
                    ${formatTime(i.updatedTime)}
                </td>
            </tr>
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