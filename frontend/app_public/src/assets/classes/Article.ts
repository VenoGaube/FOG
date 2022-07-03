import {Review} from "./Review";

export class Article {
  id:string;
  title:string;
  id_author:string;
  id_approver:string;
  ratings:[number];
  link:string;
  status:string;
  review:Review;
  uploaded:string;
}
