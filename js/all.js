export const navbarAccount = document.querySelector("#navbarAccount");

export let token = localStorage.getItem("token");
export let userId = localStorage.getItem("userId");
export let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

export let data;

// Function - Check if the page is logged in or not by checking error
export function checkLoggedIn() {
    console.log("isLoggedIn: ", isLoggedIn, "userId", userId, "token: ", token);
    if (userId && token) {
        console.log("Enter");
        localStorage.setItem("isLoggedIn", true);
        axios.get(`https://nomatem-json-server-vercel.vercel.app/users/${userId}`, {
            headers: {
                "authorization": `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("yes", response);
            })
            .catch(error => {
                console.log("no");
                console.log(error);
                if (error.response.data === "jwt expired" || error.response.data ===
                    "Missing token") {
                    localStorage.setItem("isLoggedIn", false);
                    updateNavbar();
                }
            })
    }
    else {
        console.log("no");
        localStorage.setItem("isLoggedIn", false);
        
    }
}

// Function - Check if it's logged in or not, then render navbar accordingly
export function updateNavbar() {
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
        axios.get(`https://nomatem-json-server-vercel.vercel.app/users/${userId}`, {
            headers: {
                "authorization": `Bearer ${token}`,
            }
        })
            .then(response => {
                data = response.data;
                renderNavbar();

                // For log out
                const logoutBtn = document.querySelector("#logoutBtn");
                logoutBtn.addEventListener("click", e => {
                    logoutAction();
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    //***** For admin purpose *****\\
    /*
    deleteComment(c123456);

    function deleteComment(id) {
        axios.delete(`https://nomatem-json-server-vercel.vercel.app/comments/${id}`)
            .then(response => {
            console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
    }
    */


    /*
    deletePost("p167981921793113");

    function deletePost(id) {
        axios.delete(`https://nomatem-json-server-vercel.vercel.app/posts/${id}`)
            .then(response => {
            console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
    }
    */
    

    /*
    deleteFriend("f123456");

    function deleteFriend(id) {
        axios.delete(`https://nomatem-json-server-vercel.vercel.app/friends/${id}`)
            .then(response => {
            console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
    }
    */

    /*
    deleteUser("u123456");

    function deleteUser(id) {
        axios.delete(`https://nomatem-json-server-vercel.vercel.app/users/${id}`)
            .then(response => {
            console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
    }
    */
    
}

// Function - Render navbar based on log in status
export function renderNavbar() {
    navbarAccount.innerHTML = `
        <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle d-flex justify-content-center align-items-center py-3 py-md-2 border border-md-0 link-light"
            href="../html/account-general.html" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <img class="header__avatar d-block me-3 rounded-circle"
                src="${data.db.avatar}"
                alt="${data.db.username}">
            <span class="d-block">
                ${data.db.username}
            </span>
        </a>
        <ul
            class="dropdown-menu list-unstyled text-center text-md-start mb-0 p-0 border rounded-0 rounded-md">
            <li>
                <a class="dropdown-item my-0 py-3 py-md-2 border border-md-0"
                    href="../html/account-general.html">
                    Account
                </a>
            </li>
            <li>
                <a id="logoutBtn" class="dropdown-item my-0 py-3 py-md-2 border border-md-0" href="#">
                    Log Out
                </a>
            </li>
        </ul>
    </div>
    <div class="dropdown mx-md-4">
        <a class="btn btn-light btn-sm dropdown-toggle my-0 py-3 py-md-1 w-100 rounded-0 rounded-md"
            href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Language
        </a>
        <ul class="dropdown-menu p-0 rounded-0 rounded-md border">
            <li>
                <a class="dropdown-item active py-3 py-sm-2 border border-md-0" aria-current="true"
                    href="../html/post-reply.html">
                    English
                </a>
            </li>
            <li>
                <a class="dropdown-item py-3 py-sm-2 border border-md-0" href="#">
                    Chinese
                </a>
            </li>
        </ul>
    </div>
        `;
}

// Function - Execute actions when log out
export function logoutAction() {
    console.dir(localStorage);
    localStorage.setItem("token", "");
    token = "";
    localStorage.setItem("userId", "");
    userId = "";
    console.dir(localStorage);

    localStorage.setItem("isLoggedIn", false);
    checkLoggedIn();
    location.reload();
}