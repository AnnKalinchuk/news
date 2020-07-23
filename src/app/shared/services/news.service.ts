import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(qInTitle: string = 'Twitter', page: number = 1, pageSize: number = 100,   apiKey: string = '252be7990e3c4cdea80105f3f458d81d'): Observable<any> {
    const url = `http://newsapi.org/v2/everything?qInTitle=${qInTitle}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
    return this.http.get<any>(url);
  }
}
