import { Injectable } from '@angular/core';
import {User} from "../../assets/classes/User";
import {Article} from "../../assets/classes/Article";
import {Review} from "../../assets/classes/Review";
import {Md5} from "ts-md5";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public users: User[];
  public articles: Article[];
  public reviews: Review[];

  constructor() {
    this.users = [];
    this.articles = [];
    this.reviews = [];
    var sampUser = new User();
    sampUser.reputation=69;
    sampUser.surname="Pajer";
    sampUser.name="Ivo";
    sampUser.type="Editor";
    sampUser.user_id="0x54cef6b9a54656865dac7906cec0bf839da424bb"
    this.users.push(sampUser);
    var sampArticle = new Article();
    sampArticle.id_author = "0x54cef6b9a54656865dac7906cec0bf839da424bb";
    sampArticle.id = "1";
    sampArticle.link = "https://www.youtube.com/"
    sampArticle.review = new Review();
    sampArticle.ratings = [3,4,5];
    sampArticle.id_approver = "0x54cef6b9a54656865dac7906cec0bf839da424bb";
    sampArticle.status = "Approved";
    sampArticle.summary = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, ducimus id. Voluptates quam est reprehenderit inventore rem eum quaerat rerum!"
    sampArticle.title = "Example article";
    sampArticle.uploaded = "23.07.2022";
    this.articles.push(sampArticle);
  }

public getUserById(id:string):any {
    for(var i = 0;i<this.users.length;i++){
      if(this.users[i].user_id == id)
        return this.users[i];
    }
      var us = new User();
      us.user_id="guest";
      us.type="guest";
      us.name="Guest";
      us.surname="User";
      us.reputation = 0;
      return us;
}

public getUserArticles(userId:string):any {
    var out = [];
    for(var art of this.articles){
      if(art.id_author == userId){
        out.push(art);
      }
    }
    return out;
}

public getApprovedArticles():any {
    var out = [];
    for(var art of this.articles){
      if(art.status="Approved"){
        out.push(art);
      }
    }
    return out;
}

  public getRejectedArticles():any {
    var out = [];
    for(var art of this.articles){
      if(art.status="Rejected"){
        out.push(art);
      }
    }
    return out;
  }

  public getInReviewArticles():any {
    var out = [];
    for(var art of this.articles){
      if(art.status="In Review"){
        out.push(art);
      }
    }
    return out;
  }

  public getApproverIdArticles(id:string):any {
    var out = [];
    for(var art of this.articles){
      if(art.id_approver==id){
        out.push(art);
      }
    }
    return out;
  }

  public getArticleReview(articleId:string):any {
    for(var art of this.articles) {
      if (art.id = articleId) {
        return art.review;
      }
    }
    return null;
  }

  public getUserReviews(userId:string){
    var out = []
    for(var rev of this.reviews){
      if(rev.id_reviewer == userId){
        out.push(rev);
      }
    }
    return out;
  }

  public approveArticle(articleId:string){
    for(var art of this.articles){
      if(art.id==articleId && art.status=="In Review"){
        art.status="Approved";
      }
    }
  }

  public setUserType(userId:string, type:string){
    for(var us of this.users){
      if(us.user_id == userId){
        us.type=type;
      }
    }
  }

  public makeNewArticle(title:string, summary:string, id_author:string, id_approver:string,
  link:string){
    var now = new Date();
    var newart = new Article();
    newart.id = Md5.hashStr(now+title+summary+id_author+id_approver+link);
    var repeat = false;
    do
    {
      repeat = false
      for(var art of this.articles){
        if(art.id==newart.id){
          newart.id = Md5.hashStr(now.toISOString()+title+summary+id_author+id_approver+link+";");
          repeat = true;
          console.log("PANIKA!!!");
        }
      }
    }
    while(repeat);
    newart.status="In Review";
    newart.id_author = id_author;
    newart.summary = summary;
    newart.review = new Review();
    newart.id_approver = id_approver;
    newart.uploaded = now.toDateString();
    newart.title = title;
    newart.link = link;
    newart.ratings = [];
    this.articles.push(newart);
  }

  public getAllArticles(){
    return this.articles;
  }


}
