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
}
