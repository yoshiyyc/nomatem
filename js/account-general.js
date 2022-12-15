const generalFName = document.querySelector("#generalFName");
const generalLName = document.querySelector("#generalLName");
const generalEmail = document.querySelector("#generalEmail");
const generalPassword = document.querySelector("#generalPassword");
const btnUpdateGeneral = document.querySelector("#btnUpdateGeneral");
const btnSpeak = document.querySelector("#btnSpeak");
const speakBody = document.querySelector("#speakBody");
const btnLearn = document.querySelector("#btnLearn");
const learnBody = document.querySelector("#learnBody");
const btnUpdateLanguage = document.querySelector("#btnUpdateLanguage");

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");

let userData;

let speakCounter = 1;
let speakCounterArr = [
    {
        speakCounter,
        "language": "",
        "level": ""
    }
];

let learnCounter = 1;
let learnCounterArr = [
    {
        learnCounter,
        "language": "",
        "level": ""
    }
];

btnUpdateGeneral.addEventListener("click", e => {
    e.preventDefault();
    updateGeneral();
});

btnSpeak.addEventListener("click", e => {
    addSpeak();
});

speakBody.addEventListener("click", e => {
    if (e.target.classList.contains("btn--delete")) {
        deleteSpeak(e.target.dataset.id);
    }
});

btnLearn.addEventListener("click", e => {
    addLearn();
});

learnBody.addEventListener("click", e => {
    if (e.target.classList.contains("btn--delete")) {
        deleteLearn(e.target.dataset.id);
    }
});

btnUpdateLanguage.addEventListener("click", e => {
    e.preventDefault();
    updateLanguage();
});

axios.get(`http://localhost:3000/600/users/${userId}?`, {
    headers: {
        "authorization": `Bearer ${token}`,
    }
})
    .then(response => {
        userData = response.data;
        generalFName.value = userData.firstName;
        generalLName.value = userData.lastName;
        generalEmail.value = userData.email;
        generalPassword.value = userData.password;

        speakCounterArr = userData.speak.map((i, index) => {
            return {
                "speakCounter": index,
                "language": i.language,
                "level": i.level
            }
        });
        renderSpeak();

        learnCounterArr = userData.learn.map((i, index) => {
            return {
                "learnCounter": index,
                "language": i.language,
                "level": i.level
            }
        });
        renderLearn();
    })
    .catch(error => {
        console.log(error);
    })

function updateGeneral() {
    axios.patch(`http://localhost:3000/600/users/${userId}?`, {
        "firstName": generalFName.value,
        "lastName": generalLName.value,
        "email": generalEmail.value,
        "password": generalPassword.value,
    }, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            alert("Information updated!");
        })
        .catch(error => {
            console.log(error)
        });
}



function addSpeak() {
    rememberSpeak();

    speakCounter++;
    speakCounterArr.push(
        {
            speakCounter,
            "language": "",
            "level": ""
        }
    );
    
    renderSpeak();
}

function deleteSpeak(id) {
    rememberSpeak();

    speakCounterArr = speakCounterArr.filter(i => {
        return `speak${i.speakCounter}` !== id;
    })

    renderSpeak();
}

function rememberSpeak() {
    speakCounterArr.forEach(i => {
        const generalSpeak = document.querySelector(`#generalSpeak${i.speakCounter}`);
        const speakLevel = document.querySelector(`#speakLevel${i.speakCounter}`);

        i.language = generalSpeak.value;
        i.level = speakLevel.value;
    });
}


function renderSpeak() {
    speakBody.innerHTML = speakCounterArr.map(i => {
        return `
        <li id="speak${i.speakCounter}" class="speak__item row d-flex align-items-center my-3">
        <div class="col-5">
            <select id="generalSpeak${i.speakCounter}" class="form-select generalSpeak__select">
                <option selected disabled>
                    Choose a language
                </option>
                <option>
                    English
                </option>
                <option>
                    Chinese
                </option>
            </select>
        </div>
        <div class="col-5">
            <select id="speakLevel${i.speakCounter}" class="form-select">
                <option selected disabled>
                    Choose a level
                </option>
                <option>
                    ★★★★
                </option>
                <option>
                    ★★★
                </option>
                <option>
                    ★★
                </option>
                <option>
                    ★
                </option>
            </select>
        </div>
        <div class="col-1 mx-auto">
            <i class="btn--delete acc-general__btn--point bi bi-x-circle d-block h5 mb-0 p-0 text-center" data-id="speak${i.speakCounter}"></i>
        </div>
    </li>     
        `
    }).join("");

    speakCounterArr.forEach(i => {
        if (i.language !== "" && i.level !== "") {
            const generalSpeak = document.querySelector(`#generalSpeak${i.speakCounter}`);
            const speakLevel = document.querySelector(`#speakLevel${i.speakCounter}`)

            generalSpeak.value = i.language;
            speakLevel.value = i.level;
        }
    })
}



function addLearn() {
    rememberLearn();

    learnCounter++;
    learnCounterArr.push(
        {
            learnCounter,
            "language": "",
            "level": ""
        }
    );
    
    renderLearn();
}

function deleteLearn(id) {
    rememberLearn();

    learnCounterArr = learnCounterArr.filter(i => {
        return `learn${i.learnCounter}` !== id;
    })

    renderLearn();
}

function rememberLearn() {
    learnCounterArr.forEach(i => {
        const generalLearn = document.querySelector(`#generalLearn${i.learnCounter}`);
        const learnLevel = document.querySelector(`#learnLevel${i.learnCounter}`);

        i.language = generalLearn.value;
        i.level = learnLevel.value;
    });
}


function renderLearn() {
    learnBody.innerHTML = learnCounterArr.map(i => {
        return `
        <li id="learn${i.learnCounter}" class="learn__item row d-flex align-items-center my-3">
        <div class="col-5">
            <select id="generalLearn${i.learnCounter}" class="form-select generalLearn__select">
                <option selected disabled>
                    Choose a language
                </option>
                <option>
                    English
                </option>
                <option>
                    Chinese
                </option>
            </select>
        </div>
        <div class="col-5">
            <select id="learnLevel${i.learnCounter}" class="form-select">
                <option selected disabled>
                    Choose a level
                </option>
                <option>
                    ★★★★
                </option>
                <option>
                    ★★★
                </option>
                <option>
                    ★★
                </option>
                <option>
                    ★
                </option>
            </select>
        </div>
        <div class="col-1 mx-auto">
            <i class="btn--delete acc-general__btn--point bi bi-x-circle d-block h5 mb-0 p-0 text-center" data-id="learn${i.learnCounter}"></i>
        </div>
    </li>     
        `
    }).join("");

    learnCounterArr.forEach(i => {
        if (i.language !== "" && i.level !== "") {
            const generalLearn = document.querySelector(`#generalLearn${i.learnCounter}`);
            const learnLevel = document.querySelector(`#learnLevel${i.learnCounter}`)

            generalLearn.value = i.language;
            learnLevel.value = i.level;
        }
    })
}


function updateLanguage() {
    rememberSpeak();
    rememberLearn();

    axios.patch(`http://localhost:3000/600/users/${userId}?`, {
        "speak": speakCounterArr.map(i => {
            return {
                "language": i.language,
                "level": i.level
            };
        }),
        "learn": learnCounterArr.map(i => {
            return {
                "language": i.language,
                "level": i.level
            };
        })
    }, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            alert("Information updated!");
        })
        .catch(error => {
            console.log(error)
        });
}