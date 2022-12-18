const profileAvatarArea = document.querySelector("#profileAvatarArea");
const profileName = document.querySelector("#profileName");
const profileSpeak = document.querySelector("#profileSpeak");
const profileLearn = document.querySelector("#profileLearn");
const profileContact = document.querySelector("#profileContact");
const profileSummaryContent = document.querySelector("#profileSummaryContent");
const profileInterestContent = document.querySelector("#profileInterestContent");
const profileGoalsContent = document.querySelector("#profileGoalsContent");
const profilePreferencesContent = document.querySelector("#profilePreferencesContent");

let profileId = localStorage.getItem("profileId");

let isLoggedIn;
localStorage.getItem("isLoggedIn") === "true" ? isLoggedIn = true : isLoggedIn = false;

let profileData;

loggedInCheck();

axios.get(`http://localhost:3000/friends/${profileId}?_expand=user`)
.then(response => {
    profileData = response.data;
    console.log(profileData);
    renderProfileHeader();
    renderLanguage();
    renderProfileContact();
    renderProfileIntro();
})
.catch(error => {
    console.log(error);
})

function renderProfileHeader() {
    profileAvatarArea.innerHTML = `
        <div class="col-9 border rounded-circle">
            <img class="avatar__img d-block rounded-circle" src="${profileData.avatar}" alt="${profileData.displayName}">
        </div>
    `;

    profileName.innerHTML = `
        ${profileData.displayName}
    `;
}

function renderLanguage() {
    profileSpeak.innerHTML = profileData.user.speak.map(i => {
        return `
            <li class="row mb-1">
                <p class="col me-1 mb-0 fs-7">
                    ${i.language}
                </p>
                <p class="col mb-0 fs-7">
                    ${i.level}
                </p>
            </li>
        `;
    }).join("");

    profileLearn.innerHTML = profileData.user.learn.map(i => {
        return `
            <li class="row mb-1">
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

function renderProfileContact() {
    profileContact.innerHTML = profileData.contact.map(i => {
        return `
            <li class="d-flex flex-column flex-sm-row flex-md-column mb-2 mb-sm-0 mb-md-2">
                <div class="col">
                    ${renderContactIcon(i.method)}
                    ${i.method}
                </div>
                <p class="col mb-0 text-primary">
                    ${i.account}
                </p>
            </li>
        `;
    }).join("");
}

function renderContactIcon(method) {
    switch(method) {
        case "Email":
            return `<i class="bi bi-envelope me-1"></i>`;
        case "WhatsApp":
            return `<i class="bi bi-whatsapp me-1"></i>`;
        case "Telegram":
            return `<i class="bi bi-telegram"></i>`;
        case "Line":
            return `<i class="bi bi-line me-1"></i>`;
        case "Skype":
            return `<i class="bi bi-skype me-1"></i>`;
    }
}

function renderProfileIntro() {
    profileSummaryContent.innerHTML = profileData.summary;
    profileInterestContent.innerHTML = profileData.interest;
    profileGoalsContent.innerHTML = profileData.goals;
    profilePreferencesContent.innerHTML = profileData.preferences;
}

function loggedInCheck() {
    if(!isLoggedIn) {
        alert("You are not logged in");
        location.href = "../html/login.html";
    }
}