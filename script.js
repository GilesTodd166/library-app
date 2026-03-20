window.onload = function () {
  displayLibrary();
};

const cardContainer = document.getElementById("cards-container");

const dialog = document.querySelector("dialog");
const showButton = document.getElementById("addBook");
const closeButton = document.getElementById("close");
const submitButton = document.getElementById("submit");
const myForm = document.getElementById("bookForm");

// let myLibrary = [
//     {
//         title: "The Hobbit",
//         author: "J.R.R. Tolkein",
//         pages: 956,
//         genre: "Fantasy",
//         read: true,
//         id: crypto.randomUUID()
//     },
//     {
//         title: "Greenwood",
//         author: "Michael Christie",
//         pages: 617,
//         genre: "Sci-Fi",
//         read: false,
//         id: crypto.randomUUID()
//     }
// ];

// function Book(title, author, pages, genre, read) {
//     if (!new.target) {
//         throw Error('This is an error creating a new book')
//     };

//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.genre = genre;
//     this.read = (read === "true" || read === true);
//     this.id = crypto.randomUUID();
// };

class Book {
  constructor(title, author, pages, genre, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read === "true" || read === true;
    this.id = crypto.randomUUID();
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  addBook(book) {
    this.books.push(book);
  }
  removeBook(id) {
    this.id = id;
    this.books = this.books.filter((item) => item.id !== id);
  }
}

// Create instance of Library.
let library = new Library();

function addBookToLibrary(title, author, pages, genre, read, id) {
  library.addBook(new Book(title, author, pages, genre, read, id));
  console.log("book added");
  displayLibrary();
}

// Loop through myLibrary and display book entires.
function displayLibrary() {
  cardContainer.innerHTML = "";
  library.books.forEach((book) => {
    const newCard = document.createElement("div");
    newCard.setAttribute("id", "book-card");
    cardContainer.append(newCard);

    const title = document.createElement("div");
    title.setAttribute("id", "title");
    title.textContent = `Title: ${book.title}`;
    newCard.append(title);

    const author = document.createElement("div");
    author.setAttribute("id", "author");
    author.textContent = `Author: ${book.author}`;
    newCard.append(author);

    const pages = document.createElement("div");
    pages.setAttribute("id", "pages");
    pages.textContent = `Pages: ${book.pages}`;
    newCard.append(pages);

    const genre = document.createElement("div");
    genre.setAttribute("id", "genre");
    genre.textContent = `Genre: ${book.genre}`;
    newCard.append(genre);

    const read = document.createElement("div");
    read.setAttribute("id", "read");
    read.textContent = "Read: " + `${book.read ? "Has read" : "Has not read"}`;
    newCard.append(read);

    // Delete Book Button
    const delDiv = document.createElement("div");
    delDiv.setAttribute("id", "delButton");
    newCard.append(delDiv);

    const delButton = document.createElement("button");
    delButton.setAttribute("id", "del-button");
    delButton.innerHTML = `Delete Book`;
    delDiv.append(delButton);

    // Delete button functionality
    delButton.addEventListener("click", () => {
      library.removeBook(book.id);

      displayLibrary();
    });
  });
}

// Modal Form
showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

// Form submit and Library Update
bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // console.log('Form submitted!');

  let title = bookForm.elements.title.value;
  let author = bookForm.elements.author.value;
  let pages = bookForm.elements.pages.value;
  let genre = bookForm.elements.genre.value;
  let read = bookForm.elements.read.value;

  addBookToLibrary(title, author, pages, genre, read);

  displayLibrary();

  document.getElementById("bookForm").reset();

  dialog.close();
});

// Custom Validation

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const genre = document.getElementById("genre");
const read = document.getElementById("read");
const submitBtn = document.getElementById("submit");

submit.addEventListener("click", (e) => {
  if (!title.checkValidity()) {
    title.setCustomValidity("You must enter a Title!");
  } else {
    title.setCustomValidity("");
  }
  if (!author.checkValidity()) {
    author.setCustomValidity("You must enter an Author!");
  } else {
    author.setCustomValidity("");
  }
  if (!genre.checkValidity()) {
    genre.setCustomValidity("You must enter an Genre!");
  } else {
    genre.setCustomValidity("");
  }
  if (pages.validity.typeMismatch) {
    pages.setCustomValidity("Please enter a total pages number!");
  } else {
    pages.setCustomValidity("");
  }
});
