const registerForm = document.querySelector("#registerForm");
const registerFName = document.querySelector("#registerFName");
const registerLName = document.querySelector("#registerLName");
const registerEmail = document.querySelector("#registerEmail");
const registerPassword = document.querySelector("#registerPassword");
const registerInfoMessage = document.querySelectorAll(".registerInfo-message");
const registerBtn = document.querySelector("#registerBtn");

let data;
let userNum = 0;

registerBtn.addEventListener("click", e => {
    e.preventDefault();
    validateForm();
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
        "id": `u${Date.now()}${userNum}`,
        "firstName": registerFName.value,
        "lastName": registerLName.value,
        "email": registerEmail.value,
        "password": registerPassword.value,
        "speak": [],
        "learn": [],
        "db": {
            "username": `user${userNum}`,
            "avatar": "../img/undraw_nature_m5ll.svg"
        },
        "lf": {
            "isPublish": false,
            "updatedTime": Date.now(),
            "displayName": `user${userNum}`,
            "avatar": "../img/undraw_nature_m5ll.svg",
            "contact": [],
            "summary": "",
            "interest": "",
            "goals": "",
            "preferences": ""
        }
    })
    .then(response => {
        data = response.data;
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });

    await axios.post("http://localhost:3000/friends", {
        "id": `${data.user.id.replace("u", "f")}`,
        "userId": `${data.user.id}`,
        "isPublish": false,
        "updatedTime": Date.now(),
        "displayName": `user${userNum}`,
        "avatar": "../img/undraw_nature_m5ll.svg",
        "contact": [],
        "summary": "",
        "interest": "",
        "goals": "",
        "preferences": ""
        
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


// Function - Use validate.js to validate the form inputs
function validateForm() {
    let constraints = {
        registerFName: {
            presence: {
                message: "^This field is required."
            }
        },
        registerLName: {
            presence: {
                message: "^This field is required."
            }
        },
        registerEmail: {
            presence: {
                message: "^This field is required."
            },
            email: {
                message: "^This is not a valid email address."
            }
        },
        registerPassword: {
            presence: {
                message: "^This field is required."
            }
        }
    };

    let errorMessage = validate(registerForm, constraints);

    if (errorMessage) {
        registerInfoMessage.forEach(i => {
            errorMessage[i.dataset.message] 
                ? i.innerHTML = errorMessage[i.dataset.message]
                : i.innerHTML = "";
        });
    }
    else {
        registerInfoMessage.forEach(i => {
            i.innerHTML = "";
        });
        registerAccount();
    }
}