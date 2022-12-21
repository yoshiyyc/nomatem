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
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

let friendsData;
let isChecked = false;

let contactArr = [
    {
        "contactId": Date.now(),
        "method": "",
        "account": ""
    }
];

// Onload - Check if the user is logged in to see this page 
loggedInGatekeeper();

// Onload - Get friends data to render page
axios.get(`https://nomatem-json-server-vercel.vercel.app/friends/${lfId}`)
    .then(response => {
        friendsData = response.data;
        isChecked = friendsData.isPublish;
        lfSummary.value = friendsData.summary;
        lfInterest.value = friendsData.interest;
        lfGoals.value = friendsData.goals;
        lfPreferences.value = friendsData.preferences;

        if(friendsData.contact.length) {
            contactArr = friendsData.contact;
        }

        renderContact();
        renderLf();
    })
    .catch(error => {
        console.log(error);
    })

// Click - Publish the friends profile page
publishArea.addEventListener("click", e => {
    isChecked = !isChecked;
    if(e.target.classList.contains("publish__switch")) {
        publishProfile();
    };
});

// Click - Add more contact fields
btnContact.addEventListener("click", e => {
    addContact();
});

// Click - Delete contact fields
contactBody.addEventListener("click", e => {
    if (e.target.classList.contains("btn--delete")) {
        deleteContact(e.target.dataset.id);
    }
});

// Click - Update the lf information
btnUpdateLf.addEventListener("click", e => {
    e.preventDefault();
    validateForm();
});

// Function - Render the lf page
function renderLf() {
    // Render the publish part
    let checkedContent = isChecked ? "checked" : "";

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

// Function - Publish the langiage friends profile
function publishProfile() {
    if(isChecked) {
        alert("Friend profile published!");
    }
    else {
        alert("Friend profile closed!");
    }

    updateLf();
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

// Function - Update the lf information
function updateLf() {
    if(!lfAvatarInput.value) {
        lfAvatarInput.setAttribute("value", "../img/undraw_nature_m5ll.svg");
    }

    rememberContact();

    // Axios - Edit the friends profile information
    axios.patch(`https://nomatem-json-server-vercel.vercel.app/friends/${lfId}`, {
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