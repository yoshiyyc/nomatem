const generalForm = document.querySelector("#generalForm");
const generalFName = document.querySelector("#generalFName");
const generalLName = document.querySelector("#generalLName");
const generalEmail = document.querySelector("#generalEmail");
const generalPassword = document.querySelector("#generalPassword");
const generalInfoMessage = document.querySelectorAll(".generalInfo-message");
const btnUpdateGeneral = document.querySelector("#btnUpdateGeneral");
const btnSpeak = document.querySelector("#btnSpeak");
const speakBody = document.querySelector("#speakBody");
const btnLearn = document.querySelector("#btnLearn");
const learnBody = document.querySelector("#learnBody");
const btnUpdateLanguage = document.querySelector("#btnUpdateLanguage");

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

let userData;

let speakArr = [
  {
    "speakId": Date.now(),
    "language": "",
    "level": ""
  }
];

let learnArr = [
  {
    "learnId": Date.now(),
    "language": "",
    "level": ""
  }
];

// Onload - Check if the user is logged in to see this page 
loggedInGatekeeper();

// Onload - Get user information and render
axios.get(`https://nomatem-json-server-vercel.vercel.app/users/${userId}?`, {
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

    if (userData.speak.length) {
      speakArr = userData.speak;
    }
    renderSpeak();

    if (userData.learn.length) {
      learnArr = userData.learn;
    }
    renderLearn();
  })
  .catch(error => {
    console.log(error);
  })


// Click - Update the general information
btnUpdateGeneral.addEventListener("click", e => {
  e.preventDefault();
  validateGeneralForm();
});

// Click - Add more speak fields
btnSpeak.addEventListener("click", e => {
  addSpeak();
});

// Click - Delete speak fields
speakBody.addEventListener("click", e => {
  if (e.target.classList.contains("btn--delete")) {
    deleteSpeak(e.target.dataset.id);
  }
});

// Click - Add more learn fields
btnLearn.addEventListener("click", e => {
  addLearn();
});

// Click - Delete learn fields
learnBody.addEventListener("click", e => {
  if (e.target.classList.contains("btn--delete")) {
    deleteLearn(e.target.dataset.id);
  }
});

// Click - Update language fields
btnUpdateLanguage.addEventListener("click", e => {
  e.preventDefault();
  updateLanguage();
});

// Function - Add more speak fields
function addSpeak() {
  rememberSpeak();

  speakArr.push(
    {
      "speakId": Date.now(),
      "language": "",
      "level": ""
    }
  );

  renderSpeak();
}

// Function - Delete speak fields
function deleteSpeak(id) {
  rememberSpeak();

  speakArr = speakArr.filter(i => {
    return `speak${i.speakId}` !== id;
  })

  renderSpeak();
}

// Function - Remember current speak inputs
function rememberSpeak() {
  speakArr.forEach(i => {
    const generalSpeak = document.querySelector(`#generalSpeak${i.speakId}`);
    const speakLevel = document.querySelector(`#speakLevel${i.speakId}`);

    i.language = generalSpeak.value;
    i.level = speakLevel.value;
  });

  speakArr = speakArr.filter(i => {
    return i.language && i.level;
  });
}

// Function - Render speak fields
function renderSpeak() {
  speakBody.innerHTML = speakArr.map(i => {
    return `
				<li id="speak${i.speakId}" class="speak__item row d-flex align-items-center my-4 my-md-3">
          <div class="col-11 row">
            <div class="col-12 col-md-6 mb-2 mb-md-0">
                <select id="generalSpeak${i.speakId}" class="form-select">
                    <option selected disabled value="">
                        Language
                    </option>
                    <option>
                        English
                    </option>
                    <option>
                        Chinese
                    </option>
                    <option>
                        Japanese
                    </option>
                </select>
            </div>
            <div class="col-12 col-md-6">
              <select id="speakLevel${i.speakId}" class="form-select">
                <option selected disabled value="">
                  Level
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
          </div>
          <div class="col-1 me-auto mx-md-auto">
              <i class="btn--delete acc-general__btn--point bi bi-x-circle d-block h5 mb-0 p-0 text-center" data-id="speak${i.speakId}"></i>
          </div>
		    </li>     
			`
  }).join("");

  speakArr.forEach(i => {
    if (i.language !== "" && i.level !== "") {
      const generalSpeak = document.querySelector(`#generalSpeak${i.speakId}`);
      const speakLevel = document.querySelector(`#speakLevel${i.speakId}`)

      generalSpeak.value = i.language;
      speakLevel.value = i.level;
    }
  })
}

// Function - Add more learn fields
function addLearn() {
  rememberLearn();

  learnArr.push(
    {
      "learnId": Date.now(),
      "language": "",
      "level": ""
    }
  );

  renderLearn();
}

// Function - Delete learn fields
function deleteLearn(id) {
  rememberLearn();

  learnArr = learnArr.filter(i => {
    return `learn${i.learnId}` !== id;
  })

  renderLearn();
}

// Function - Remember current learn inputs
function rememberLearn() {
  learnArr.forEach(i => {
    const generalLearn = document.querySelector(`#generalLearn${i.learnId}`);
    const learnLevel = document.querySelector(`#learnLevel${i.learnId}`);

    i.language = generalLearn.value;
    i.level = learnLevel.value;
  });

  learnArr = learnArr.filter(i => {
    return i.language && i.level;
  })
}

// Function - Render learn fields
function renderLearn() {
  learnBody.innerHTML = learnArr.map(i => {
    return `
        <li id="learn${i.learnId}" class="learn__item row d-flex align-items-center my-4 my-md-3">
        <div class="col-11 row">
          <div class="col-12 col-md-6 mb-2 mb-md-0">
              <select id="generalLearn${i.learnId}" class="form-select">
                  <option selected disabled value="">
                      Language
                  </option>
                  <option>
                      English
                  </option>
                  <option>
                      Chinese
                  </option>
                  <option>
                      Japanese
                  </option>
              </select>
          </div>
          <div class="col-12 col-md-6">
            <select id="learnLevel${i.learnId}" class="form-select">
              <option selected disabled value="">
                Level
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
        </div>
        <div class="col-1 me-auto mx-md-auto">
            <i class="btn--delete acc-general__btn--point bi bi-x-circle d-block h5 mb-0 p-0 text-center" data-id="learn${i.learnId}"></i>
        </div>
      </li>
    `
  }).join("");

  learnArr.forEach(i => {
    if (i.language !== "" && i.level !== "") {
      const generalLearn = document.querySelector(`#generalLearn${i.learnId}`);
      const learnLevel = document.querySelector(`#learnLevel${i.learnId}`)

      generalLearn.value = i.language;
      learnLevel.value = i.level;
    }
  })
}

// Function - Write the language information into db.json
function updateLanguage() {
  rememberSpeak();
  rememberLearn();


  axios.patch(`https://nomatem-json-server-vercel.vercel.app/users/${userId}?`, {
    "speak": speakArr,
    "learn": learnArr
  }, {
    headers: {
      "authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      Swal.fire({
        title: 'Information updated!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
        .then((result) => {
          renderSpeak();
          renderLearn();
          location.href = "../html/account-general.html";
        });
    })
    .catch(error => {
      console.log(error)
    });
}

// Function - Update the account general information
function updateGeneral() {
  axios.patch(`https://nomatem-json-server-vercel.vercel.app/users/${userId}?`, {
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
      Swal.fire({
        title: 'Information updated!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
        .then((result) => {
          location.href = "../html/account-general.html";
        });
    })
    .catch(error => {
      console.log(error)
    });
}

// Function - Use validate.js to validate the form inputs
function validateGeneralForm() {
  let constraints = {
    generalFName: {
      presence: {
        message: "^This field is required."
      }
    },
    generalLName: {
      presence: {
        message: "^This field is required."
      }
    },
    generalEmail: {
      presence: {
        message: "^This field is required."
      },
      email: {
        message: "^This is not a valid email address."
      }
    },
    generalPassword: {
      presence: {
        message: "^This field is required."
      }
    }
  };

  let errorMessage = validate(generalForm, constraints);

  if (errorMessage) {
    generalInfoMessage.forEach(i => {
      errorMessage[i.dataset.message]
        ? i.innerHTML = errorMessage[i.dataset.message]
        : i.innerHTML = "";
    });
  }
  else {
    generalInfoMessage.forEach(i => {
      i.innerHTML = "";
    });
    updateGeneral();
  }
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