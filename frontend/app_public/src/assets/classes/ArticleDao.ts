import {Review} from "./Review";
import {User} from "./User";

export class ArticleDao {
  id:string="";
  title:string="";
  summary:string="";
  author:User=new User();
  approver:User=new User();
  ratings:number[]=[];
  link:string="";
  status:string="";
  review:Review=new Review();
  uploaded:string="";
}
