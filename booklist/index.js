class Book {
    constructor(title, genre, author, pic, read, readDate = null) {
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.pic = pic;
        this.read = read;
        this.readDate = readDate;

    }

    view(where) {
        while (where.firstChild) {
            where.removeChild(where.lastChild)
        }
        const st = `<h2 class="text-center">${this.title}</h2><img class="mx-auto" src=${this.pic}>`;
        const d = document.createElement("DIV");
        d.innerHTML = st;
        where.appendChild(d);
    }

}

let books = [];

class Booklist {
    constructor(displayForCurrentBook, displayForReadBooks, displayForUnreadBooks, displayForNextBook) {
        this.read_books = [];
        this.unread_books = [];
        this.next_book = null;
        this.current_book = null;
        this.allRead = false;
        //this.last_book = null;
        //this.allBooks = books;
        this.displayForCurrentBook = displayForCurrentBook;
        this.displayForReadBooks = displayForReadBooks;
        this.displayForUnreadBooks = displayForUnreadBooks;
        this.displayForNextBook = displayForNextBook;
        this.init();

    }
    init() {
        let book2 = new Book("The Lord of the Rings", "classic", "Tolkien", "./lr.jpg", false, new Date());
        let book3 = new Book("Oliver Twist", "classic", "Dickens", "./ot.jpg", false, new Date());
        let book4 = new Book("Field Guide to Freshwater Fishes", "classic", "Smith", "f.jpg", false, new Date());
        let book5 = new Book("Ultra HTML Reference", "classic", "Jones", "ht.jpg", false, new Date());
        this.addBook(book2);
        this.addBook(book3);
        this.addBook(book4);
        this.addBook(book5);
        this.current_book = this.unread_books.shift();
        this.next_book = this.unread_books[0];
        if (this.next_book) { this.next_book.view(this.displayForNextBook); }
        if (this.current_book) { this.current_book.view(this.displayForCurrentBook); }
    }
    refresh() {

    }
    addBook(book) {
        this.unread_books.push(book);

    }
    readBooks() {
        return books.filter((book) => { return book.read == true });

    }
    unreadBooks() {
        return books.filter((book) => { return book.read == false });

    }

    finishCurrentBook() {

        this.current_book.read = true;
        this.current_book.readDate = new Date();
        let n = this.unread_books.length;

        if (!this.allRead) { this.read_books.push(this.current_book); }
        if (this.unread_books.length > 0) { this.current_book = this.unread_books.shift(); }
        else {
            let endBook = new Book("You've read all your books", "classic", "empty", "https://images.unsplash.com/photo-1501622130202-7987a9ff9ec0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", false, new Date());

            this.current_book = endBook;
            this.allRead = true;
        }
        if (this.unread_books.length > 0) { this.next_book = this.unread_books[0]; }
        else {

            let book6 = new Book("Your library has more great books", "classic", "empty", "https://images.unsplash.com/photo-1501622130202-7987a9ff9ec0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", false, new Date());

            this.next_book = book6;
        }

        this.displayCurrentBook(this.displayForCurrentBook);
        this.booksViewRead(this.displayForReadBooks);
        this.booksViewUnread(this.displayForUnreadBooks);
        this.next_book.view(this.displayForNextBook);

        let nofrb = document.getElementById("numberOfReadBooks");
        if (this.read_books.length == 1) { nofrb.innerHTML = this.read_books.length + " book read" };
        if (this.read_books.length > 1) { nofrb.innerHTML = this.read_books.length + " books read" };


    }
    displayCurrentBook(displayForCurrentBook) {
        this.current_book.view(displayForCurrentBook);
    }
    booksView(where) {
        while (where.firstChild) {
            where.removeChild(where.lastChild)
        }
        let s = '<ul class="list-group">';
        for (let i = 0; i < books.length; i++) {
            s = s + `<li class="list-group-item">  ${books[i].title} </li>`;

        }
        s = s + "</ul>";

        const d = document.createElement("DIV");
        d.innerHTML = s;
        where.appendChild(d);
    }
    booksViewRead(where) {
        while (where.firstChild) {
            where.removeChild(where.lastChild)
        }
        let s = '<ul class="list-group">';
        for (let i = 0; i < this.read_books.length; i++) {
            s = s + `<li class="list-group-item">  ${this.read_books[i].title} </li>`;

        }
        s = s + "</ul>";

        const d = document.createElement("DIV");
        d.innerHTML = s;
        where.appendChild(d);
    }
    booksViewUnread(where) {
        while (where.firstChild) {
            where.removeChild(where.lastChild)
        }
        let s = '<ul class="list-group">';
        for (let i = 0; i < this.unread_books.length; i++) {
            s = s + `<li  class="list-group-item">  ${this.unread_books[i].title} </li>`;

        }
        s = s + "</ul>";

        const d = document.createElement("DIV");
        d.innerHTML = s;
        where.appendChild(d);
    }
}


//books.push(book6);

let div = document.getElementById("mybook");
let div2 = document.getElementById("readbooks");
let div3 = document.getElementById("unreadbooks");
let div4 = document.getElementById("nextbook");
let bl = new Booklist(div, div2, div3, div4);
//book2.bookView(div);
//book3.view(div);



bl.booksViewUnread(div3);
bl.booksViewRead(div2);

// function createBooks() {




// }
function markbook() {

    bl.finishCurrentBook();

}

// createBooks();

// let bl = new Booklist();
// let readbooks = bl.readBooks();
// console.log(bl.readBooks());

// //bl.finishCurrentBook();
// let current = document.getElementById("currentbook");
// current.innerHTML = bl.current_book.title;

// let next = document.getElementById("nextbook");
// next.innerHTML = bl.next_book.title;
// refresh();

//     let rbh = document.getElementById("readbooksheading");
//     rbh.innerHTML = rb.length + " read Books"
//     let bookimage = document.getElementById("bookimage");
//     bookimage.setAttribute("src", bl.current_book.pic);
