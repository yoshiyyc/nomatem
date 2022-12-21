const dbForm = document.querySelector("#dbForm");
const dbUsername = document.querySelector("#dbUsername");
const dbAvatar = document.querySelector("#dbAvatar");
const dbAvatarInput = document.querySelector("#dbAvatarInput");
const dbInfoMessage = document.querySelectorAll(".dbInfo-message");
const btnUpdateDb = document.querySelector("#btnUpdateDb");

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

let userData;

// Onload - Check if the user is logged in to see this page 
loggedInGatekeeper();

// Onload - Get user data to render page
axios.get(`https://nomatem-json-server-vercel.vercel.app/users/${userId}?`, {
    headers: {
        "authorization": `Bearer ${token}`,
    }
})
    .then(response => {
        userData = response.data;
        renderDb();
    })
    .catch(error => {
        console.log(error);
    });

// Click - Update db information
btnUpdateDb.addEventListener("click", e => {
    e.preventDefault();
    validateForm();
});

// Function - Render the db page
function renderDb() {
    dbUsername.value = userData.db.username;
    dbAvatar.setAttribute("src", `${userData.db.avatar}`);
    dbAvatar.setAttribute("alt", `${userData.db.username}`);
    dbAvatarInput.setAttribute("value", `${userData.db.avatar}`);
    dbAvatarInput.value = "";
}

// Function - Write in the input values into db.json
function updateDb() {
    if(!dbAvatarInput.value) {
        dbAvatarInput.setAttribute("value", "../img/undraw_nature_m5ll.svg");
    }

    axios.patch(`https://nomatem-json-server-vercel.vercel.app/users/${userId}`, {
        "db": {
            "username": dbUsername.value,
            "avatar": dbAvatarInput.value ? dbAvatarInput.value : userData.db.avatar 
        }
    }, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            alert("Information updated!");
            renderDb();
            location.href = "../html/account-discussion-board.html";
        })
        .catch(error => {
            console.log(error)
        });
}

// Function - Use validate.js to validate the form inputs
function validateForm() {
    let constraints = {
        dbUsername: {
            presence: {
                message: "^This field is required."
            }
        }
    };

    let errorMessage = validate(dbForm, constraints);

    if (errorMessage) {
        dbInfoMessage.forEach(i => {
            errorMessage[i.dataset.message] 
                ? i.innerHTML = errorMessage[i.dataset.message]
                : i.innerHTML = "";
        });
    }
    else {
        dbInfoMessage.forEach(i => {
            i.innerHTML = "";
        });
        updateDb();
    }
}

// Function - Only allow actions to be executed after logged in
function loggedInGatekeeper() {
    // Recheck login status
    axios.get(`https://nomatem-json-server-vercel.vercel.app/users/${userId}`, {
        headers: {
            "authorization": `Bearer ${token}`,
        }
    })
        .then(response => {
            let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        })
        .catch(error => {
            console.log(error);
            if(error.response.data === "jwt expired" || error.response.data === 
            "Missing token") {
                localStorage.setItem("isLoggedIn", false);
            }
            alert("You are not logged in");
            location.href = "../html/login.html";
        })
}