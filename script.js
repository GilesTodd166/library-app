window.onload = function() {
    displayLibrary();
}

const cardContainer = document.getElementById('cards-container');

const dialog = document.querySelector('dialog');
const showButton = document.getElementById('addBook');
const closeButton = document.getElementById('close');
const submitButton = document.getElementById('submit');
const myForm = document.getElementById('bookForm');

let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkein",
        pages: 956,
        genre: "Fantasy",
        read: "Has read",
        id: crypto.randomUUID()
    },
    {
        title: "Greenwood",
        author: "Michael Christie",
        pages: 617,
        genre: "Sci-Fi",
        read: "Has not read",
        id: crypto.randomUUID()
    }
];

function Book(title, author, pages, genre, read) {
    if (!new.target) {
        throw Error('This is an error creating a new book')
    };

    let readStatus;
        if (read === "true") {
            readStatus = "Has read";
        } else {
            readStatus = "Has not read"
        };

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = readStatus;
    this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, pages, genre, read, id) {
    let newBook = new Book(title, author, pages, genre, read, id);
    myLibrary.push(newBook);
    displayLibrary();
};

// Loop through myLibrary and display book entires.
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

        // Delete Book Button
        const delDiv = document.createElement('div');
            delDiv.setAttribute('id', 'delButton');
            newCard.append(delDiv);

        const delButton = document.createElement('button');
            delButton.setAttribute('id', 'del-button');
            delButton.innerHTML = `Delete Book`;
            delDiv.append(delButton);

            let id = book.id;

            // Delete button functionality
            delButton.addEventListener("click", () => {
                const bookID = book.id;
                myLibrary = myLibrary.filter(item => item.id !== bookID);

            displayLibrary();
            });
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