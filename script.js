const cardContainer = document.getElementById('cards-container');

const dialog = document.querySelector('dialog');
const showButton = document.querySelector('button');
const closeButton = document.getElementById('close');
const submitButton = document.getElementById('submit');
const myForm = document.getElementById('bookForm');

const myLibrary = [
    {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkein",
        "pages": 956,
        "genre": "Fantasy",
        "read": "Has read"
    }
];

// addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 892, 'Fantasy', true);
// addBookToLibrary('Greenwood', 'Michael Christie', 654, 'Sci-Fi', true);
// addBookToLibrary('Braiding Sweetgrass', 'Robin Wall Kimmer', 531, 'Non-Fiction', false);
// addBookToLibrary('The Wall', 'Marlin Haushofer', 1003, 'Sci-Fi', false);

function Book(title, author, pages, genre, read) {
    if (!new.target) {
        throw Error('This is an error creating a new book')
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read ? "Has read" : "Has not read";
    this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, pages, genre, read, id) {
    let newBook = new Book(title, author, pages, genre, read, id);
    myLibrary.push(newBook);
    displayLibrary();
};

// Loop myLibrary and update DOM.
function displayLibrary() {
    cardContainer.innerHTML = '';
    myLibrary.forEach((book) => {

    const newCard = document.createElement('div');
    newCard.setAttribute('id', 'book-card');
    cardContainer.append(newCard);

    const title = document.createElement('div');
    title.setAttribute('id', 'title');
    title.textContent = `Title: ${book.title}`;
    newCard.append(title);

    const author = document.createElement('div');
    author.setAttribute('id', 'author');
    author.textContent = `Author: ${book.author}`;
    newCard.append(author);

    const pages = document.createElement('div');
    pages.setAttribute('id', 'pages');
    pages.textContent = `Pages: ${book.pages}`;
    newCard.append(pages);

    const genre = document.createElement('div');
    genre.setAttribute('id', 'genre');
    genre.textContent = `Genre: ${book.genre}`;
    newCard.append(genre);

    const read = document.createElement('div');
    read.setAttribute('id', 'read');
    read.textContent = `Read: ${book.read}`;
    newCard.append(read);

    });
};

// Modal Form
showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

// Form submit and Library Update
bookForm.addEventListener("submit", (e) => {

    e.preventDefault(); 

        console.log('Form submitted!');

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