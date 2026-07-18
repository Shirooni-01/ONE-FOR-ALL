// ======================================
// ELEMENTS
// ======================================

const newNoteBtn = document.getElementById("newnote");
const searchBtn = document.getElementById("searchnote");

const noteForm = document.getElementById("noteform");
const searchForm = document.getElementById("searchform");

const titleCards = document.querySelectorAll(".titleslist");
const noteCards = document.querySelectorAll(".noteslist");

const editButtons = document.querySelectorAll(".editnote");
const editForms = document.querySelectorAll(".editnote_form");

const deleteForms = document.querySelectorAll(".deletenote_form");

const titleInput = document.getElementById("title");
const noteInput = document.getElementById("note");
const searchInput = document.getElementById("search");


// ======================================
// SHOW / HIDE CREATE FORM
// ======================================

newNoteBtn.addEventListener("click", () => {

    searchForm.style.display = "none";

    if (noteForm.style.display === "block") {

        noteForm.style.display = "none";

    }

    else {

        noteForm.style.display = "block";

        titleInput.focus();

        noteForm.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }

});


// ======================================
// SHOW / HIDE SEARCH FORM
// ======================================

searchBtn.addEventListener("click", () => {

    noteForm.style.display = "none";

    if (searchForm.style.display === "block") {

        searchForm.style.display = "none";

    }

    else {

        searchForm.style.display = "block";

        searchInput.focus();

        searchForm.scrollIntoView({

            behavior: "smooth"

        });

    }

});


// ======================================
// OPEN NOTE
// ======================================

titleCards.forEach((card, index) => {

    card.addEventListener("click", () => {

        noteCards.forEach((note, i) => {

            if (i !== index) {

                note.style.display = "none";

            }

        });

        if (noteCards[index].style.display === "block") {

            noteCards[index].style.display = "none";

        }

        else {

            noteCards[index].style.display = "block";

            noteCards[index].scrollIntoView({

                behavior: "smooth",
                block: "center"

            });

        }

    });

});


// ======================================
// EDIT NOTE
// ======================================

editButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        if (editForms[index].style.display === "block") {

            editForms[index].style.display = "none";

        }

        else {

            editForms[index].style.display = "block";

            const input = editForms[index].querySelector("input[type=text]");

            if (input) input.focus();

        }

    });

});


// ======================================
// DELETE CONFIRMATION
// ======================================

deleteForms.forEach(form => {

    form.addEventListener("submit", function (e) {

        const confirmDelete = confirm(

            "Delete this note permanently?"

        );

        if (!confirmDelete) {

            e.preventDefault();

        }

    });

});


// ======================================
// ESC CLOSES PANELS
// ======================================

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        noteForm.style.display = "none";

        searchForm.style.display = "none";

        editForms.forEach(form => {

            form.style.display = "none";

        });

    }

});


// ======================================
// CTRL + N
// ======================================

document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key.toLowerCase() === "n") {

        e.preventDefault();

        noteForm.style.display = "block";

        titleInput.focus();

    }

});


// ======================================
// CTRL + F
// ======================================

document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key.toLowerCase() === "f") {

        e.preventDefault();

        searchForm.style.display = "block";

        searchInput.focus();

    }

});


// ======================================
// CTRL + S
// ======================================

document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key.toLowerCase() === "s") {

        if (noteForm.style.display === "block") {

            e.preventDefault();

            document.getElementById("submit").click();

        }

    }

});


// ======================================
// AUTO RESIZE TEXTAREA
// ======================================

document.querySelectorAll("textarea").forEach(area => {

    area.addEventListener("input", function () {

        this.style.height = "auto";

        this.style.height = this.scrollHeight + "px";

    });

});


// ======================================
// CHARACTER COUNTER
// ======================================

if (noteInput) {

    const counter = document.createElement("small");

    counter.style.display = "block";

    counter.style.marginBottom = "15px";

    counter.style.color = "#94a3b8";

    noteInput.parentNode.insertBefore(counter, noteInput.nextSibling);

    function updateCounter() {

        counter.textContent =

            noteInput.value.length + " Characters";

    }

    noteInput.addEventListener("input", updateCounter);

    updateCounter();

}


// ======================================
// SIMPLE SEARCH FILTER
// ======================================

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        titleCards.forEach(card => {

            const title =

                card.innerText.toLowerCase();

            card.parentElement.style.display =

                title.includes(value)

                    ? "block"

                    : "none";

        });

    });

}


// ======================================
// AUTO HIDE SEARCH RESULT
// ======================================

const searched = document.querySelector(".searchednote");

if (searched) {

    setTimeout(() => {

        searched.style.opacity = "0";

        setTimeout(() => {

            searched.style.display = "none";

        }, 500);

    }, 12000);

}


// ======================================
// PAGE LOADED
// ======================================

window.addEventListener("load", () => {

    document.body.classList.add("fade-in");

});