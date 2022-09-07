import {Review} from "./Review";

export class Article {
  id:string;
  title:string;
  summary:string;
  id_author:string;
  id_approver:string;
  ratings:number[];
  link:string;
  status:string; // Approved, Rejected, In Review
  review:Review;
  uploaded:string;

  constructor(id?: string, title?: string, summary?: string, id_author?: string, id_approver?: string, ratings?: number[], link?: string, status?: string, review?: Review, uploaded?: string) {
    this.id = id ?? "";
    this.title = title ?? "";
    this.summary = summary ?? "";
    this.id_author = id_author ?? "";
    this.id_approver = id_approver ?? "";
    this.ratings = ratings ?? [];
    this.link = link ?? "";
    this.status = status ?? "";
    this.review = review ?? new Review();
    this.uploaded = uploaded ?? "";
  }

}
