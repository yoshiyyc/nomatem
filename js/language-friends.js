const friendsList = document.querySelector("#friendsList");

let friendsData;

axios.get("http://localhost:3000/friends?_expand=user")
.then(response => {
    friendsData = response.data;
    renderFriendsList();
})
.catch(error => {
    console.log(error);
})

function renderFriendsList() {
    friendsList.innerHTML = friendsData.map(i => {
        return `
            <li class="col">
                <div class="card h-100 border-primary shadow-sm">
                    <div class="card-header d-flex justify-content-between mb-0 text-white bg-primary">
                        <button class="text-white bg-transparent border-0">
                            <i class="bi bi-heart d-block"></i>
                        </button>
                        <h5 class="text-center my-auto">
                            ${i.user.languageFriend.displayName}
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
                                src="${i.user.languageFriend.avatar}" alt="${i.user.languageFriend.displayName}">
                                </div>
                            </div>
                            <p class="col-12 col-sm-7 friends__summary px-2 mb-0">
                                ${i.user.languageFriend.summary}
                            </p>
                        </div>
                        <div class="row d-flex flex-column flex-md-row justify-content-start justify-content-md-between align-items-start py-2">
                            <div class="col my-1 my-md-0">
                                <p class="mb-0 fw-semibold">
                                    Speak
                                </p>
                                <ul class="list-unstyled">
                                    <li class="d-flex">
                                        <p class="col me-1 mb-0 fs-7">
                                            English
                                        </p>
                                        <p class="col mb-0 fs-7">
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                        </p>
                                    </li>
                                    <li class="d-flex">
                                        <p class="col me-1 mb-0 fs-7">
                                            Portuguese
                                        </p>
                                        <p class="col mb-0 fs-7">
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star"></i>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div class="col my-1 my-md-0">
                                <p class="mb-0 fw-semibold">
                                    Learning
                                </p>
                                <ul class="list-unstyled">
                                    <li class="d-flex">
                                        <p class="col me-1 mb-0 fs-7">
                                            Chinese
                                        </p>
                                        <p class="col mb-0 fs-7">
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                        </p>
                                    </li>
                                    <li class="d-flex">
                                        <p class="col me-1 mb-0 fs-7">
                                            German
                                        </p>
                                        <p class="col mb-0 fs-7">
                                            <i class="bi bi-star-fill"></i>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer btn-group d-flex flex-column flex-sm-row p-0 bg-transparent border-0 rounded-0" role="group" aria-label="Language Friends Buttons">
                        <a class="col col-sm-6 btn btn-tertiary d-block py-3 py-sm-2 border-0 rounded-0 rounded-bottom-start-sm" href="../html/friends-profile.html">
                            Profile
                        </a>
                        <button class="col col-sm-6 btn btn-secondary d-block py-3 py-sm-2 border-0 rounded-0 rounded-bottom rounded-sm-0 rounded-bottom-end-sm" type="button">
                            Connect
                        </button>
                    </div>
                </div>
            </li>
        `;
    }).join("");
}