import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() articleData: any;

  constructor(private router: Router) { }

  ngOnInit() {
    if ( this.articleData.navigationId === 1 ) {
      this.router.navigate(['/news']);
    }
  }

}
