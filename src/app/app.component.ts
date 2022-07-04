import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  public books!: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
      this.getBooks;
  }
 booksObserver: Observer<Book[]>= {
  next: (response:Book[]) => this.books = response,
  error: (error: HttpErrorResponse) => alert(error.message),
  complete: () => console.log("Everything's fine")
};
  

  public getBooks(): void{
    this.bookService.getBooks().subscribe(this.booksObserver)
  }
}
