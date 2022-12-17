const inputLearn = document.querySelector("inputLearn");
const inputTeach = document.querySelector("inputTeach");
const btnFilter = document.querySelector("#btnFilter");
const friendsList = document.querySelector("#friendsList");

let data;

axios.get("http://localhost:3000/friends?_expand=user&_sort=updatedTime&_order=desc")
.then(response => {
    data = response.data;
    console.log(data);
    renderFriendsList();
})
.catch(error => {
    console.log(error);
})

btnFilter.addEventListener("click", e => {
    filterLanguage;
});

function renderFriendsList() {
    friendsList.innerHTML = data.map(i => {
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
                        <a class="col col-sm-6 btn btn-secondary d-block py-3 py-sm-2 border-0 rounded-0 rounded-bottom-start-sm" href="../html/friends-profile.html">
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

function filterLanguage() {
    
}


/* Connect button
<button class="col col-sm-6 btn btn-secondary d-block py-3 py-sm-2 border-0 rounded-0 rounded-bottom rounded-sm-0 rounded-bottom-end-sm" type="button">
    Connect
</button>
*/