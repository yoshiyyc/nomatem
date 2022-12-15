const indexDbTbody = document.querySelector("#indexDbTbody");

let dbData;

axios.get("http://localhost:3000/posts?_expand=user&_limit=5")
    .then(response => {
        dbData = response.data;
        renderDbTable(dbData);
    })
    .catch(error => {
        console.log(error);
    })

// Function - Render discussion board table
function renderDbTable(data) {
    indexDbTbody.innerHTML = data.map(i => {
        return `
            <tr>
                <td class="col-1 text-center">
                    ${i.language}
                </td>
                <td class="col-1">
                    <a class="d-block" href="#">
                    <img class="d-block mx-auto my-auto"
                    src=${i.thumbnailImg}
                    alt="${i.title}">
                    </a>
                </td>
                <td class="col-6">
                    <a class="d-block" href="${i.url}">
                        ${i.title}
                    </a>
                    <span class="d-block fs-7">
                        ${i.user.db.username}
                    </span>
                </td>
                <td class="col-1 text-center fs-7">
                    ${i.viewNum}
                </td>
                <td class="col-1 text-center fs-7">
                    ${i.commentNum}
                </td>
                <td class="col-1 text-center fs-7">
                    ${formatTime(i.postTime)}
                </td>
            </tr>
        `;
    }).join("");
}


// Function - Format timestamp to regular date & time
function formatTime(timestamp) {
    let dateTime = new Date(timestamp);

    let year = dateTime.getFullYear();
    let month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    let date = dateTime.getDate().toString().padStart(2, "0");
    let hour = dateTime.getHours();
    let minute = dateTime.getMinutes();

    return `${year}/${month}/${date} ${hour <= 12 ? hour : hour - 12}:${minute.toString().padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
}