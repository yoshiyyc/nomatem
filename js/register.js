const registerFName = document.querySelector("#registerFName");
const refisterLName = document.querySelector("#registerLName");
const registerEmail = document.querySelector("#registerEmail");
const registerPassword = document.querySelector("#registerPassword");
const registerBtn = document.querySelector("#registerBtn");

let data;
let userNum = 0;

registerBtn.addEventListener("click", e => {
    e.preventDefault();
    registerAccount();
});


async function registerAccount() {
    await axios.get("http://localhost:3000/users")
    .then(response => {
        userNum = response.data.length + 1;
    })
    .catch(error => {
        console.log(error);
    });


    await axios.post("http://localhost:3000/register", {
        "id": `u${userNum}`,
        "firstName": registerFName.value,
        "lastName": registerLName.value,
        "email": registerEmail.value,
        "password": registerPassword.value,
        "speak": [],
        "db": {
            "username": `user${userNum}`,
            "avatar": "../img/undraw_nature_m5ll.svg"
        }
    })
    .then(response => {
        data = response.data;
        console.log(response.data);
        alert("Successful registration!");
        registerEmail.value = "";
        registerPassword.value = "";
        location.href = "../html/login.html"
    })
    .catch(error => {
        console.log(error);
    });
}