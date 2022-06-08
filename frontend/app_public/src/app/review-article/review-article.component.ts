import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-article',
  templateUrl: './review-article.component.html',
  styleUrls: ['./review-article.component.css']
})
export class ReviewArticleComponent implements OnInit {
  articleSelected: boolean = false;
  selectedAlreadyReviewedArticle:boolean = false;

  constructor() { }

  
  test(id: number){
    console.log(id)
    this.articleSelected = true;
    if (id==4)
      this.selectedAlreadyReviewedArticle = true;
  }

  reset(){
    this.articleSelected = false;
    this.selectedAlreadyReviewedArticle = false;
  }

  ngOnInit(): void {
  }

}
