const dbForm = document.querySelector("#dbForm");
const dbUsername = document.querySelector("#dbUsername");
const dbAvatar = document.querySelector("#dbAvatar");
const dbAvatarInput = document.querySelector("#dbAvatarInput");
const dbInfoMessage = document.querySelectorAll(".dbInfo-message");
const btnUpdateDb = document.querySelector("#btnUpdateDb");

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");

let userData;

btnUpdateDb.addEventListener("click", e => {
    e.preventDefault();
    validateForm();
})


axios.get(`http://localhost:3000/600/users/${userId}?`, {
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
    })

function renderDb() {
    dbUsername.value = userData.db.username;
    dbAvatar.setAttribute("src", `${userData.db.avatar}`);
    dbAvatar.setAttribute("alt", `${userData.db.username}`);
    dbAvatarInput.setAttribute("value", `${userData.db.avatar}`);
    dbAvatarInput.value = "";
}

function updateDb() {
    if(!dbAvatarInput.value) {
        dbAvatarInput.setAttribute("value", "../img/undraw_nature_m5ll.svg");
    }

    axios.patch(`http://localhost:3000/600/users/${userId}`, {
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