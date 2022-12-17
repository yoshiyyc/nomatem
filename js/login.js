const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginInfoMessage = document.querySelectorAll(".loginInfo-message");
const loginBtn = document.querySelector("#loginBtn");

let data;
let token;
let userId;

loginBtn.addEventListener("click", e => {
    e.preventDefault();
    validateForm();
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
        localStorage.setItem("isLoggedIn", true);
        loginEmail.value = "";
        loginPassword.value = "";
        location.href = "../html/index.html";
    })
    .catch(error => {
        console.log(error);
    })
}

// Function - Use validate.js to validate the form inputs
function validateForm() {
    let constraints = {
        loginEmail: {
            presence: {
                message: "^This field is required."
            },
            email: {
                message: "^This is not a valid email address."
            }
        },
        loginPassword: {
            presence: {
                message: "^This field is required."
            }
        }
    };

    let errorMessage = validate(loginForm, constraints);

    if (errorMessage) {
        loginInfoMessage.forEach(i => {
            errorMessage[i.dataset.message] 
                ? i.innerHTML = errorMessage[i.dataset.message]
                : i.innerHTML = "";
        });
    }
    else {
        loginInfoMessage.forEach(i => {
            i.innerHTML = "";
        });
        logIn();
    }
}