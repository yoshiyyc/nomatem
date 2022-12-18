export const navbarAccount = document.querySelector("#navbarAccount");

export let token = localStorage.getItem("token");
export let userId = localStorage.getItem("userId");

export let data;

export function checkLoggedIn() {
    axios.get(`http://localhost:3000/600/users/${userId}`, {
        headers: {
            "authorization": `Bearer ${token}`,
        }
    })
        .then(response => {
            localStorage.setItem("isLoggedIn", true);
        })
        .catch(error => {
            console.log(error);
            if(error.response.data === "jwt expired" || error.response.data === 
            "Missing token") {
                localStorage.setItem("isLoggedIn", false);
            }
        })
}

export function updateNavbar() {
    let isLoggedIn;
    localStorage.getItem("isLoggedIn") === "true" ? isLoggedIn = true : isLoggedIn = false;

    if (isLoggedIn) {
        axios.get(`http://localhost:3000/600/users/${userId}`, {
            headers: {
                "authorization": `Bearer ${token}`,
            }
        })
            .then(response => {
                data = response.data;
                renderNavbar();

                const logoutBtn = document.querySelector("#logoutBtn");
                logoutBtn.addEventListener("click", e => {
                    logoutAction();
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    /*
    deleteComment(1);

    function deleteComment(id) {
        axios.delete(`http://localhost:3000/comments/${id}`)
            .then(response => {
            console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
    }
    */


    /*
    deletePost("p7");

    function deletePost(id) {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(response => {
            console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
    }
    */

    /*
    deleteFriend("f167125961598010");

    function deleteFriend(id) {
        axios.delete(`http://localhost:3000/friends/${id}`)
            .then(response => {
            console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
    }
    */

    /*
    deleteUser("u16712864814564");

    function deleteUser(id) {
        axios.delete(`http://localhost:3000/users/${id}`)
            .then(response => {
            console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
    }
    */
    

}

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

export function logoutAction() {
    localStorage.setItem("token", "");
    token = "";
    localStorage.setItem("userId", "");
    userId = "";

    checkLoggedIn();
    location.href = "../html/index.html";
}