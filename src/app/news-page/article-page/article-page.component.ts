import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/shared/services/news.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  newsTitle;
  newsData = [];
  articleData$: Observable<object>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private newsService: NewsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.newsTitle = params.title;
    });

    this.articleData$ = this.route.paramMap.pipe(map(() => window.history.state));
  }

}
