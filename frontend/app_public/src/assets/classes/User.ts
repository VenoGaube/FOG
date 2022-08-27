import {Article} from "./Article";
import {Review} from "./Review";

export class User {
  type:string=""; // Regular, Editor, Admin, Reviewer, Guest
  user_id:string="";
  reputation:number=0;
  name:string="";
  surname:string="";
}
