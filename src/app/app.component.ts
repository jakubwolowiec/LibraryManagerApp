import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public books!: Book[];
  public title: string = 'LibraryManagerApp';

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
      complete: () => {}
    });
  }

  public onOpenModal(book: Book|null, mode: string):void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'add'){
      button.setAttribute('data-target', '#addBookModal');
    }
    else if(mode === 'edit'){
      button.setAttribute('data-target', '#editBookModal');
    }
    else if(mode === 'delete'){
      button.setAttribute('data-target', '#deleteBookModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
