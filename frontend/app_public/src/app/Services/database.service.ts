import {Injectable} from '@angular/core';
import {User} from "../../assets/classes/User";
import {Article} from "../../assets/classes/Article";
import {Review} from "../../assets/classes/Review";
import {ArticleDao} from "../../assets/classes/ArticleDao";
import {Md5} from "ts-md5";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public users: User[] = [new User("Editor",
    "0x54cef6b9a54656865dac7906cec0bf839da424bb", 69, "Ivo", "Pajer"), new User("Editor",
    "0xc6dda634507c10919298d38f7ebfb2a0b150b5c2", 42, "Nino", "Brezac"), new User("Author",
    "matej", 1, "Matej", "Pičulin"), new User("Author",
    "chen", 1, "Aiyun", "Chen")];
    public reviews: Review[] = [new Review("1","0x54cef6b9a54656865dac7906cec0bf839da424bb", "Kakovosten članek. Kar naprej.", "Kratko in jasno."),
                              new Review("2","0xc6dda634507c10919298d38f7ebfb2a0b150b5c2", "Bolj natančni opisi bi bili primerni za ta članek. Drugače je soliden.", "Brez pripomb."),
                              new Review("3","0xc6dda634507c10919298d38f7ebfb2a0b150b5c2", "I'm not sure this is the right file?", "The summary doesn't even match the uploaded file."),
                              new Review("4","0x54cef6b9a54656865dac7906cec0bf839da424bb", "Zelo podroben članek. Zadnje poglavje lahko izboljšate.", " Zadnje poglavje bi se moralo dopolniti pred objavo v revijo." ),
                              new Review("5","0x54cef6b9a54656865dac7906cec0bf839da424bb", "Kratek a jedrnat članek.", "Korelacijski filter je res močno state-of-the-art orodje. Tem članku bi lahko dali prednost na naslednji konferenci.")
                            ];
  public articles: Article[] = [new Article("6","Heartbeat detector",
    "As one of the important components of electrocardiogram (ECG) signals, QRS signal represents the basic characteristics of ECG signals. The detection of QRS waves is also an essential step for ECG signal analysis. In order to further meet the clinical needs for the accuracy and real-time detection of QRS waves, a simple, fast, reliable, and hardware-friendly algorithm for real-time QRS detection is proposed. The exponential transform (ET) and proportional-derivative (PD) control-based adaptive threshold are designed to detect QRS-complex. ",
    "chen", "0xc6dda634507c10919298d38f7ebfb2a0b150b5c2",
    [3,4,5], "../../assets/PDFs/chen.pdf", "In Review", new Review("6","0xc6dda634507c10919298d38f7ebfb2a0b150b5c2","",""),""
  ), new Article("1","Spektralno upodabljanje ",
  "Spektralno upodabljanje (angl. Spectral Rendering) je tehnika upodabljanja, kjer je prenos svetlobe modeliran s frekvencami svetlobe namesto samo barvami. Ta tehnika je pocasnejša od običajne, ki upodobi sceno v rdeči, zeleni in modri komponenti, ki jo nato združi.",
    "0x54cef6b9a54656865dac7906cec0bf839da424bb", "0xc6dda634507c10919298d38f7ebfb2a0b150b5c2",
    [5,5,5], "../../assets/PDFs/NRG_seminar.pdf", "Approved", this.reviews[0]
  ),
    new Article("4","Pregled dokazov brez razkritja znanja",
      "Dokaz brez razkritja znanja (angl. Zero knowledge proof) je zelo uporaben matematičen problem, kjer udeleženec komunikacije pozna skrivnost in to lahko dokaže, ne da bi jo pri tem razkril. Zaradi izjemne elegantnosti in učinkovitosti se prej omenjeni koncept vedno več uporablja v računalništvu.",
      "0xc6dda634507c10919298d38f7ebfb2a0b150b5c2", "0x54cef6b9a54656865dac7906cec0bf839da424bb",
      [3,4,5], "../../assets/PDFs/Pregled dokazov brez razkritja znanja.pdf", "Approved", this.reviews[3]
  ),
    new Article("5","Correlation filter tracking",
      "Tracking using a correlation filter is yet another efficient object tracking solution. The central idea is: the target in the next frame can be found by convolution with an optimal filter (maximum response on target). The new position of the target then updates the optimal filter. This paper provides a short overview of the correlation filter tracker, how it performs and where it can be improved.",
      "0xc6dda634507c10919298d38f7ebfb2a0b150b5c2", "0x54cef6b9a54656865dac7906cec0bf839da424bb",
      [3,4,5], "../../assets/PDFs/Correlation filter.pdf", "Approved", this.reviews[4]
    ),
    new Article("2","NP prevedbe",
    "Problem SAT. Cook-Levinov izrek. Rodovne funkcije.",
    "matej", "0xc6dda634507c10919298d38f7ebfb2a0b150b5c2",
    [3,3,3], "../../assets/PDFs/Algoritmi-03.pdf", "Approved", this.reviews[1]
), new Article("3","Comparison of Patients’ Perceived Quality of Primary Care Between Urban and Rural Community Health Centers in Guangdong, China",
"A series of reforms were implemented to improve the quality of primary care services in China. This study aims to assess patients' perceived quality of primary health care between rural and urban community health centers in Guangdong. Methods: A cross-sectional survey was conducted from July to December 2015 in Guangdong.",
"chen", "0xc6dda634507c10919298d38f7ebfb2a0b150b5c2",
[1], "../../assets/PDFs/Algoritmi-03.pdf", "Rejected", this.reviews[2]
)];
  

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
      if(art.status=="In Review" && art.id_approver==userId){
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
    var reviewers = [];
    for(var u of this.users){
      if(u.type=="Reviewer"||u.type=="Editor"){
        reviewers.push(u);
      }
    }
    var revid = Math.floor(Math.random()*reviewers.length);
    newart.review.id_reviewer=reviewers[revid].user_id;
    this.articles.push(newart);
  }

  public getAllArticles() {
    var out = [];
    for(var art of this.articles){
      out.push(this.toArticleDao(art))
    }
    return out;
  }

  public getArticleById(articleId:string) {
    var out = new Article()
    for(var art of this.articles){
      if(art.id==articleId) {
        out = art
        break;
      }
    }
    return out;
  }

  public getArticleDAOById(articleId:string) {
    var out = new Article()
    for(var art of this.articles){
      if(art.id==articleId) {
        out = art
        break;
      }
    }
    return this.toArticleDao(out);
  }

  public updateArticle(articleId:string, newArticle:Article){
    for(var art of this.articles){
      if(art.id==articleId){
        art = newArticle;
      }
    }
  }

  public setArticleReview(articleId:string, reviewerId:string ,reviewerComment:string, authorComment:string){
    var art = this.getArticleById(articleId);
    art.review = new Review(articleId, reviewerId, authorComment, reviewerComment);
    this.updateArticle(articleId, art);
  }

  public getArticlesForReviewer(reviewerId:string){
    var out = [];
    for(var art of this.articles){
      if(art.status=="In Review"&&art.review.id_reviewer==reviewerId && (art.review.editor_comments==""&&art.review.author_comments=="") ){
        out.push(this.toArticleDao(art))
      }
    }
    return out;
  }

  public getArticlesReviewedByReviewer(reviewerId:string){
    var out = [];
    for(var art of this.articles){
      if(art.review.id_reviewer==reviewerId && (art.review.editor_comments!=""||art.review.author_comments!="") ){
        out.push(this.toArticleDao(art))
      }
    }
    console.log("myId:" + reviewerId)
    console.log(out);
    return out;
  }


}
