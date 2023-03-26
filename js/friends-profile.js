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
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

let profileData;

// Onload - Check if the user is logged in to see this page 
loggedInGatekeeper();

// Onload - Get user data to render page
axios.get(`https://nomatem-json-server-vercel.vercel.app/friends/${profileId}?_expand=user`)
.then(response => {
    profileData = response.data;
    renderProfileHeader();
    renderLanguage();
    renderProfileContact();
    renderProfileIntro();
})
.catch(error => {
    console.log(error);
})

// Function - Render profile header
function renderProfileHeader() {
    // Render avatar
    profileAvatarArea.innerHTML = `
        <div class="col-9 border rounded-circle">
            <img class="avatar__img d-block rounded-circle" src="${profileData.avatar}" alt="${profileData.displayName}">
        </div>
    `;

    // Render display name
    profileName.innerHTML = `
        ${profileData.displayName}
    `;
}

// Function - Render languages
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

// Function - Render contacts
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

// Function - Render the icons for contacts accordingly
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

// Function - Render profile intro
function renderProfileIntro() {
    profileSummaryContent.innerHTML = profileData.summary;
    profileInterestContent.innerHTML = profileData.interest;
    profileGoalsContent.innerHTML = profileData.goals;
    profilePreferencesContent.innerHTML = profileData.preferences;
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