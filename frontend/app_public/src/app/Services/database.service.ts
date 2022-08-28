import { Injectable } from '@angular/core';
import {User} from "../../assets/classes/User";
import {Article} from "../../assets/classes/Article";
import {Review} from "../../assets/classes/Review";
import {ArticleDao} from "../../assets/classes/ArticleDao";
import {Md5} from "ts-md5";
import {DatePipe} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public users: User[] = [new User("Editor",
    "0x54cef6b9a54656865dac7906cec0bf839da424bb", 69, "Ivo", "Pajer")];
  public articles: Article[] = [new Article("2","Example article In Review",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore," +
    " ducimus id. Voluptates quam est reprehenderit inventore rem eum quaerat rerum!",
    "guest", "0x54cef6b9a54656865dac7906cec0bf839da424bb",
    [3,4,5], "../../assets/PDFs/Algoritmi-03.pdf", "In Review", new Review(),"23.07.2022"
  ), new Article("1","Example article",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore," +
    " ducimus id. Voluptates quam est reprehenderit inventore rem eum quaerat rerum!",
    "0x54cef6b9a54656865dac7906cec0bf839da424bb", "0x54cef6b9a54656865dac7906cec0bf839da424bb",
    [3,4,5], "../../assets/PDFs/NRG_seminar.pdf", "Approved", new Review(),"24.07.2022"
  ),
    new Article("3","Example article 3",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore," +
      " ducimus id. Voluptates quam est reprehenderit inventore rem eum quaerat rerum!",
      "guest", "0x54cef6b9a54656865dac7906cec0bf839da424bb",
      [3,4,5], "../../assets/PDFs/Algoritmi-03.pdf", "Approved", new Review(),"23.07.2022"
  ),
    new Article("4","Example article 4",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore," +
      " ducimus id. Voluptates quam est reprehenderit inventore rem eum quaerat rerum!",
      "guest", "0x54cef6b9a54656865dac7906cec0bf839da424bb",
      [3,4,5], "../../assets/PDFs/Algoritmi-03.pdf", "Approved", new Review(),"23.07.2022"
  ),
    new Article("5","Example article 5",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore," +
      " ducimus id. Voluptates quam est reprehenderit inventore rem eum quaerat rerum!",
      "guest", "0x54cef6b9a54656865dac7906cec0bf839da424bb",
      [3,4,5], "../../assets/PDFs/Algoritmi-03.pdf", "Approved", new Review(),"23.07.2022"
    )];
  public reviews: Review[] = [];

  constructor() {
    console.log("a?")
  }

private toArticleDao(art:Article):ArticleDao{
  var artdao = new ArticleDao();
  artdao.id = art.id;
  artdao.approver = this.getUserById(art.id_approver);
  artdao.author = this.getUserById(art.id_author);
  artdao.link = art.link;
  artdao.summary = art.summary;
  artdao.review = art.review;
  artdao.ratings = art.ratings;
  artdao.status = art.status;
  artdao.title = art.title;
  artdao.uploaded = art.uploaded;
  return artdao;

}

public getUserById(id:string):any {
    for(var i = 0;i<this.users.length;i++){
      if(this.users[i].user_id == id)
        return this.users[i];
    }
      var us = new User();
      us.user_id="guest";
      us.type="Guest";
      us.name="Guest";
      us.surname="User";
      us.reputation = 0;
      return us;
}

public getUserArticles(userId:string):any {
    var out = [];
    for(var art of this.articles){
      if(art.id_author == userId){
        out.push(this.toArticleDao(art));
      }
    }
    return out;
}

  public getUserApprovedArticles(userId:string):any {
    var out = [];
    for(var art of this.articles){
      if(art.status=="Approved" && art.id_author==userId){
        out.push(this.toArticleDao(art));
      }
    }
    return out;
  }

  public getUserRejectedArticles(userId:string):any {
    var out = [];
    for(var art of this.articles){
      if(art.status=="Rejected" && art.id_author==userId){
        out.push(this.toArticleDao(art));
      }
    }
    return out;
  }

  public getUserInReviewArticles(userId:string):any {
    var out = [];
    for(var art of this.articles){
      if(art.status=="In Review" && art.id_author==userId){
        out.push(this.toArticleDao(art));
      }
    }
    return out;
  }

public getApprovedArticles():any {
    var out = [];
    for(var art of this.articles){
      if(art.status=="Approved"){
        out.push(this.toArticleDao(art));
      }
    }
    return out;
}

  public getRejectedArticles():any {
    var out = [];
    for(var art of this.articles){
      if(art.status=="Rejected"){
        out.push(this.toArticleDao(art));
      }
    }
    return out;
  }

  public getInReviewArticles():any {
    var out = [];
    for(var art of this.articles){
      if(art.status=="In Review"){
        out.push(this.toArticleDao(art));
      }
    }
    return out;
  }

  public getApproverIdArticles(id:string):any {
    var out = [];
    for(var art of this.articles){
      if(art.id_approver==id){
        out.push(this.toArticleDao(art));
      }
    }
    return out;
  }

  public getArticleReview(articleId:string):any {
    for(var art of this.articles) {
      if (art.id == articleId) {
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
    console.log("kaj se dogaja?")
    console.log(this.articles)
  }

  public rejectArticle(articleId:string){
    for(var art of this.articles){
      if(art.id==articleId && art.status=="In Review"){
        art.status = "Rejected"
      }
    }
  }

  public deleteArticle(articleId:string){
    this.articles.forEach( (item, index) => {
      if(item.id === articleId) this.articles.splice(index,1);
    });
  }

  public setUserType(userId:string, type:string){
    for(var us of this.users){
      if(us.user_id == userId){
        us.type=type;
      }
    }
  }

  public makeNewArticle(title:string, summary:string, id_author:string, id_approver:string,
  link:string, now:string){
    var newart = new Article();
    newart.id = Md5.hashStr(now+title+summary+id_author+id_approver+link);
    var repeat = false;
    do
    {
      repeat = false
      for(var art of this.articles){
        if(art.id==newart.id){
          newart.id = Md5.hashStr(now+title+summary+id_author+id_approver+link+";");
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
    // @ts-ignore
    newart.uploaded = now
    newart.title = title;
    newart.link = link;
    newart.ratings = [];
    this.articles.push(newart);
  }

  public getAllArticles() {
    var out = [];
    for(var art of this.articles){
      out.push(this.toArticleDao(art))
    }
    return out;
  }


}
