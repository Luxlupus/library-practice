
const myLibrary = [];

let bookCount = 0;

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    }


function addBookToLibrary(author, title, pages, read, myLibrary) {
    let newBook = new Book(author, title, pages, read);
    // Check if myLibrary is provided and is an array
    //if (!Array.isArray(myLibrary)) {
    //    myLibrary = [];
    //}
    myLibrary.push(newBook);
    return myLibrary;
}

function showBook(array, index) {

    let el = array[index];
    let bookCase = document.createElement('section')
    bookCase.setAttribute("id", "book"+index);
    bookCase.setAttribute("class", "cards");
    const showcase = document.getElementById("showcase");
    showcase.appendChild(bookCase);
    
    for(prop in el){
        let card = document.createElement('p');
        card.innerText = `${prop.toUpperCase()}: ${el[prop]}`;
        card.setAttribute("class", `${prop}`);
        bookCase.appendChild(card);
    }

    el.changeRead = function () {
        const bookCase = document.getElementById("book" + index);
        const readState = bookCase.querySelector(".read");
            if(readState.textContent === "READ: false"){
            readState.textContent = "READ: true";
            }
            else if(readState.textContent === "READ: true"){
            readState.textContent = "READ: false";
            }
        }
    
    let readBtn = document.createElement('button');
    readBtn.setAttribute("class", "changeRead");
    readBtn.textContent = "READ";
    readBtn.setAttribute("class", "button")
    bookCase.appendChild(readBtn);
    readBtn.onclick = el.changeRead;

    let removeBtn = document.createElement('button');
    removeBtn.setAttribute("class", "button");
    removeBtn.textContent = "REMOVE";
    bookCase.appendChild(removeBtn); 

    // Add event listener to removeBtn
    removeBtn.addEventListener('click', () => {
        const bookToRemove = document.getElementById("book"+index);
        myLibrary.splice(index, 1);
        bookToRemove.remove();
        bookCount = decreaseBookCount(bookCount);
        console.log(bookCount);
    });
}

/*
To remove the event listener correctly, you need to use a named function 
that you can reference in both addEventListener and removeEventListener.
In this version, clickHandler is a named function that is defined separately from the event listeners.
It's then passed as the second argument to both addEventListener and removeEventListener.
This ensures that the same function instance is used for both adding and removing the event listener. 
*/
/*
function clickHandler(e) {
    showBook(myLibrary);
    window.removeEventListener('click', clickHandler);
}
window.addEventListener('click', clickHandler);
*/

function resetForm() {
    const form = document.getElementById("forms");
    let author = document.getElementById("author")
    let title = document.getElementById("title")
    let pages = document.getElementById("pages")
    let read = document.getElementById("read")
    author.value = "";
    title.value = "";
    pages.value = null;
    read.checked = false;
}

function openForm() {
    const form = document.getElementById("forms");
    form.classList.remove("hidden");
}
function closeForm() {
    const form = document.getElementById("forms");
    form.classList.add("hidden");
    resetForm()
}

function increaseBookCount(count) {
    return count + 1;
}

function decreaseBookCount(count) {
    return count - 1;
}

const newBookBtn = document.getElementById("newBookBtn");
newBookBtn.addEventListener('click', openForm);

const addBtn = document.getElementById("submitBtn");

addBtn.addEventListener('click', () => {
    let author = document.getElementById("author").value;
    let title = document.getElementById("title").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    addBookToLibrary(author, title, pages, read, myLibrary);
    console.log(myLibrary);
    closeForm();
    showBook(myLibrary, bookCount);
    bookCount = increaseBookCount(bookCount);
    console.log(bookCount);
});

