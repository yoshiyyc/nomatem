const publishForm = document.querySelector("#publishForm");
const publishArea = document.querySelector("#publishArea");
const publishFriend = document.querySelector("#publishFriend");
const lfForm = document.querySelector("#lfForm");
const lfName = document.querySelector("#lfName");
const lfAvatar = document.querySelector("#lfAvatar");
const lfAvatarInput = document.querySelector("#lfAvatarInput");
const lfInfoMessage = document.querySelectorAll(".lfInfo-message");
const btnContact = document.querySelector("#btnContact");
const contactBody = document.querySelector("#contactBody");
const lfSummary = document.querySelector("#lfSummary");
const lfInterest = document.querySelector("#lfInterest");
const lfGoals = document.querySelector("#lfGoals");
const lfPreferences = document.querySelector("#lfPreferences");
const btnUpdateLf = document.querySelector("#btnUpdateLf");

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");
let lfId = userId.replace("u", "f");

let friendsData;
let isChecked = false;

let contactArr = [
    {
        "contactId": Date.now(),
        "method": "",
        "account": ""
    }
];


axios.get(`http://localhost:3000/friends/${lfId}`)
    .then(response => {
        friendsData = response.data;
        console.log(friendsData);
        isChecked = friendsData.isPublish;
        lfSummary.value = friendsData.summary;
        lfInterest.value = friendsData.interest;
        lfGoals.value = friendsData.goals;
        lfPreferences.value = friendsData.preferences;

        console.log(friendsData.contact);

        if(friendsData.contact.length) {
            contactArr = friendsData.contact;
        }
        renderContact();

        renderLf();
    })
    .catch(error => {
        console.log(error);
    })


publishArea.addEventListener("click", e => {
    isChecked = !isChecked;
    if(e.target.classList.contains("publish__switch")) {
        publishProfile();
    };
});

// Click - Add more speak fields
btnContact.addEventListener("click", e => {
    addContact();
});

// Click - Delete speak fields
contactBody.addEventListener("click", e => {
    if (e.target.classList.contains("btn--delete")) {
        deleteContact(e.target.dataset.id);
    }
});

btnUpdateLf.addEventListener("click", e => {
    e.preventDefault();
    validateForm();
});


function renderLf() {
    // Render the publish part
    let checkedContent = "";

    isChecked ? checkedContent = "checked" : checkedContent = "";

    publishArea.innerHTML = `
        <input id="publishFriend" class="publish__switch form-check-input d-block me-4" type="checkbox"
        role="switch" ${checkedContent}>
        <label for="publishFriend" class="form-check-label d-block">
            Publish my profile on the language friends list.
        </label>
    `;

    // Render the language friends info part
    lfName.value = friendsData.displayName;
    lfAvatar.setAttribute("src", `${friendsData.avatar}`);
    lfAvatar.setAttribute("alt", `${friendsData.displayName}`);
    lfAvatarInput.setAttribute("value", `${friendsData.avatar}`);
    lfAvatarInput.value = "";

    // Render contact
    renderContact();
}

function publishProfile() {
    if(isChecked === true) {
        alert("Friend profile published!");
    }
    else {
        alert("Friend profile closed!");
    }

    updateLf();
}

function updateLf() {
    if(!lfAvatarInput.value) {
        lfAvatarInput.setAttribute("value", "../img/undraw_nature_m5ll.svg");
    }

    rememberContact();

    axios.patch(`http://localhost:3000/friends/${lfId}`, {
        "userId": userId,
        "isPublish": isChecked,
        "updatedTime": Date.now(),
        "displayName": lfName.value,
        "avatar": lfAvatarInput.value ? lfAvatarInput.value : friendsData.avatar,
        "contact": contactArr,
        "summary": lfSummary.value,
        "interest": lfInterest.value,
        "goals": lfGoals.value,
        "preferences": lfPreferences.value 
        
    })
        .then(response => {
            friendsData = response.data;
            renderLf();
        })
        .catch(error => {
            console.log(error)
        });
}

// Function - Add more contact fields
function addContact() {
    rememberContact();

    contactArr.push(
        {
            "contactId": Date.now(),
            "method": "",
            "account": ""
        }
    );

    renderContact();
}

// Function - Delete contact fields
function deleteContact(id) {
    rememberContact();

    contactArr = contactArr.filter(i => {
        return `contact${i.contactId}` !== id;
    })

    renderContact();
}

// Function - Remember current contact inputs
function rememberContact() {
    contactArr.forEach(i => {
        const contactMethod = document.querySelector(`#contactMethod${i.contactId}`);
        const contactAccount = document.querySelector(`#contactAccount${i.contactId}`);

        i.method = contactMethod.value;
        i.account = contactAccount.value;
    });

    contactArr = contactArr.filter(i => {
        return i.method && i.account;
    });
}

// Function - Render speak fields
function renderContact() {
    contactBody.innerHTML = contactArr.map(i => {
        return `
            <li id="contact${i.contactId}" class="contact__item row d-flex align-items-center my-3">
                <div class="col-5">
                    <select id="contactMethod${i.contactId}" class="form-select">
                        <option selected disabled value="">
                            Contact Method
                        </option>
                        <option>
                            Email
                        </option>
                        <option>
                            WhatsApp
                        </option>
                        <option>
                            Telegram
                        </option>
                        <option>
                            Line
                        </option>
                        <option>
                            Skype
                        </option>
                    </select>
                </div>
                <div class="col-5">
                    <input id="contactAccount${i.contactId}" type="text" class="form-control" placeholder="Contact account">
                </div>
                <div class="col-1 mx-auto">
                    <i class="btn--delete acc-general__btn--point bi bi-x-circle d-block h5 mb-0 p-0 text-center" data-id="contact${i.contactId}"></i>
                </div>
            </li>
        `
    }).join("");

    contactArr.forEach(i => {
        if (i.method !== "" && i.account !== "") {
            const contactMethod = document.querySelector(`#contactMethod${i.contactId}`);
            const contactAccount = document.querySelector(`#contactAccount${i.contactId}`)

            contactMethod.value = i.method;
            contactAccount.value = i.account;
        }
    })
}

// Function - Use validate.js to validate the form inputs
function validateForm() {
    let constraints = {
        lfName: {
            presence: {
                message: "^This field is required."
            }
        }
    };

    let errorMessage = validate(lfForm, constraints);

    if (errorMessage) {
        lfInfoMessage.forEach(i => {
            errorMessage[i.dataset.message] 
                ? i.innerHTML = errorMessage[i.dataset.message]
                : i.innerHTML = "";
        });
    }
    else {
        lfInfoMessage.forEach(i => {
            i.innerHTML = "";
        });
        updateLf();
        alert("Information updated!");
    }
}