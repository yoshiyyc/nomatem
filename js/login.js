const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginBtn = document.querySelector("#loginBtn");

let data;
let token;
let userId;

loginBtn.addEventListener("click", e => {
    e.preventDefault();
    logIn();
})

function logIn() {
    axios.post("http://localhost:3000/login", {
        "email": loginEmail.value,
        "password": loginPassword.value
    })
    .then(response => {
        data = response.data;
        token = response.data.accessToken;
        userId = response.data.user.id;
        console.log(data);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        loginEmail.value = "";
        loginPassword.value = "";
        location.href = "../html/index.html";
    })
    .catch(error => {
        console.log(error);
    })
}