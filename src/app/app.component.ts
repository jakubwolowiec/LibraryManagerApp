import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public books!: Book[];
  public updateBook!: Book | null;
  public deleteBook!: Book | null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
        console.log(this.books);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal(book: Book | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addBookModal');
    } else if (mode === 'edit') {
      this.updateBook = book;
      button.setAttribute('data-target', '#editBookModal');
    } else if (mode === 'delete') {
      this.deleteBook = book;
      button.setAttribute('data-target', '#deleteBookModal');
    } else if (mode === 'rate') {
      this.updateBook = book;
      button.setAttribute('data-target', '#rateBookModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddBook(addForm: NgForm) {
    document.getElementById('add-book-form')?.click();
    this.bookService.addBook(addForm.value).subscribe({
      next: (response: Book) => {
        console.log(response);
        this.getBooks();
        addForm.resetForm();
      },

      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onUpdateBook(book: Book) {
    this.bookService.updateBook(book).subscribe({
      next: (response: Book) => {
        console.log(response);
        this.getBooks();
      },

      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },

      complete: () => {
        document.getElementById('update-book-form')?.click();
        document.getElementById('rate-book-form')?.click();
      },
    });
  }

  public onDeleteBook(id?: number): void {
    let title = this.deleteBook?.title;
    this.bookService.deleteBook(id!).subscribe({
      next: () => {
        alert(`Succesfully deleted ${title}`);
      },
      error: (error: HttpErrorResponse) => alert(error.message),
      complete: () => {
        this.getBooks();
      },
    });
  }

  public ifRead(): void {
    this.books.forEach((book) => {
      console.log('ifRead works');
      const buttonIfRead = document.getElementById(`button${book.id}`);
      const ratingIfRead = document.getElementById(`rating${book.id}`);
      if (book.read == true) {
        buttonIfRead?.classList.add('read');
        ratingIfRead?.classList.remove('hidden');
      } else {
        buttonIfRead?.classList.add('notRead');
      }
    });
  }

  public searchBooks(key: String): void {
    const results: Book[] = [];
    for (const book of this.books) {
      if (
        book.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        book.author.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        book.yearOfRelease.toString().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(book);
      }
    }
    this.books = results;

    if (results.length === 0 || key === '') {
      this.getBooks();
    }
  }
}
