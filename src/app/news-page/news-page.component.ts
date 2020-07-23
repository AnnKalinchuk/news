import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { NewsService } from '../shared/services/news.service';
import { ArticleResponseModel } from '../shared/models/article.model';
import { FormControl } from '@angular/forms';
import { filter, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Input() showFirstLastButtons: true;
  @Input() search: any;

  length = 30;
  pageSize = 10;
  page = 0;
  apiKey = '252be7990e3c4cdea80105f3f458d81d';

  searchNewsControl = new FormControl();
  newsData: ArticleResponseModel[] = [];

  constructor(private newsService: NewsService,
              private router: Router) { }

  ngAfterViewInit() {
    this.paginator.page.subscribe( event => {
      this.page = event.pageIndex;
      if (this.searchNewsControl.value === '') {
          this.searchNewsControl.setValue('Twitter');
      }
      this.newsService.getNews(this.searchNewsControl.value, this.page + 1, 10, this.apiKey).subscribe(newsData => {
        this.newsData = [];
        newsData.articles.map(elem => {
            this.newsData.push(elem);
        });
      });
    });
  }

  ngOnInit() {
    this.newsService.getNews('Twitter', this.page + 1, 10, this.apiKey).subscribe(newsData => {
      this.length = Math.ceil(newsData.totalResults / 10);
      newsData.articles.map(elem => {
          this.newsData.push(elem);
      });
    });


    this.searchNewsControl.valueChanges.pipe(
        filter(value => value.length > 2 || value.length === 0),
        debounceTime(1000),
        switchMap(value => {
          if (value.length === 0) {
            value = 'Twitter';
          };
          return this.newsService.getNews(value, 1 , 10,  this.apiKey).pipe(
            catchError(err => {
              throw 'error in source. Details: ' + err;
            }));
          }
        )
      ).subscribe(news => {
          this.paginator.pageIndex = 0;
          this.length = Math.ceil(news.totalResults / 10);
          this.newsData = [];
          news.articles.map( elem => {
            this.newsData.push(elem);
          }),
          err => console.log(err);
      });
  }
}

