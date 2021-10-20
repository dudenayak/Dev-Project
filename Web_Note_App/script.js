console.log("To-Do-list-Web");
showNotes();

//-------------------------------------------- function to add notes in local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        notes: addTxt.value,
        title: addTitle.value
    };
    // --------------------------------------------------by me- empty notes are not added
    // notesObj.push(myObj);
    if (addTxt.value != 0 || addTitle.value != 0) {
        notesObj.push(myObj);
    }
    // --------------------------------------------------/by me- empty notes are not added
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";

    showNotes();
});

//---------------------------------------------------- function to display a note
function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard card row mx-3 my-3" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.notes}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `..Please Add some notes to show..`
    }
}

//----------------------------------------------------- function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    // console.log("delete Note", index);
}

//------------------------------------------------ function to search a note
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    inputVal = search.value;
    // console.log("searching", inputVal);

    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});