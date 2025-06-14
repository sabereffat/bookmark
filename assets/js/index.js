var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var validName = false;
var validURL = false;

var bookmarks = [];

if (localStorage.getItem('bookmarksDB')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarksDB'))
    displayBookmarks();
}

function submitBtn() {
    if (validName && validURL) {
        var bookmark = {
            name: siteName.value,
            url: siteURL.value
        }
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarksDB', JSON.stringify(bookmarks));
        clearInputs();
        displayBookmarks();

    }
    else {
        alert('please type a valid name & url.')
    }
}

function clearInputs() {
    siteName.value = '';
    siteURL.value = '';
    siteName.classList.remove("is-invalid");
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-invalid");
    siteURL.classList.remove("is-valid");
}

function displayBookmarks() {
    var all_bookmarks = ``;

    for (let i = 0; i < bookmarks.length; i++) {

        all_bookmarks += `
        
        <tr>
                        <td>${i + 1}</td>
                        <td>${bookmarks[i].name}</td>
                        <td>
                            <a href="${bookmarks[i].url}" target="_blank"><button class="btn btn-visit" data-index="0">
                                <i class="fa-solid fa-eye pe-2"></i>Visit
                            </button></a>
                        </td>
                        <td>
                            <button class="btn btn-delete pe-2" onclick="deleteBookmark(${i})">
                                <i class="fa-solid fa-trash-can"></i>
                                Delete
                            </button>
                        </td>
                    </tr>
        
        `;
    }
    tableContent.innerHTML = all_bookmarks;
}

function deleteBookmark(id) {
    bookmarks.splice(id, 1);
    localStorage.setItem('bookmarksDB', JSON.stringify(bookmarks));
    displayBookmarks();

}

function validateName(name) {
    if (name != '') {
        var nameRegex = /^\w{3,}(\s+\w+)*$/;
        if (nameRegex.test(name)) {
            siteName.classList.add("is-valid");
            siteName.classList.remove("is-invalid");
            validName = true;
        } else {
            siteName.classList.add("is-invalid");
            siteName.classList.remove("is-valid");
        }
    } else {
        siteName.classList.remove("is-invalid");
        siteName.classList.remove("is-valid");
    }

}
function validateURL(url) {
    if (url != '') {
        var urlRegex = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?[\w\-\.=&#%]+)?(#[\w\-]+)?$/i;
        if (urlRegex.test(url)) {
            siteURL.classList.add("is-valid");
            siteURL.classList.remove("is-invalid");
            validURL = true;
        } else {
            siteURL.classList.add("is-invalid");
            siteURL.classList.remove("is-valid");
        }
    } else {
        siteURL.classList.remove("is-invalid");
        siteURL.classList.remove("is-valid");
    }

}
