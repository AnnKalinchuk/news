export class ArticleResponseModel {
  constructor(
              public source: ArticleSourceModel,
              public author: string,
              public title: string,
              public description: string,
              public url: string,
              public urlToImage: string,
              public publishedAt: string,
              public content: string) {}
}
export class ArticleSourceModel {
  constructor(
      public id: null,
      public name: string
  ) {}
}
