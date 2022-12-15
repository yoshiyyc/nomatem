const dbUsername = document.querySelector("#dbUsername");
const dbAvatar = document.querySelector("#dbAvatar");
const dbAvatarInput = document.querySelector("#dbAvatarInput");
const btnUpdateDb = document.querySelector("#btnUpdateDb");

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");

let userData;

btnUpdateDb.addEventListener("click", e => {
    e.preventDefault();
    updateDb();
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
    dbAvatarInput.value = userData.db.avatar;
}

function updateDb() {
    if(!dbAvatarInput.value) {
        dbAvatarInput.setAttribute("value", "../img/undraw_nature_m5ll.svg");
        dbAvatarInput.value = "../img/undraw_nature_m5ll.svg"
    }

    axios.patch(`http://localhost:3000/600/users/${userId}`, {
        "db": {
            "username": dbUsername.value,
            "avatar": dbAvatarInput.value
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