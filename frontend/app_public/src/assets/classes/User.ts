import {Article} from "./Article";
import {Review} from "./Review";

export class User {
  type:string; // Regular, Editor, Admin, Reviewer, Guest
  user_id:string;
  reputation:number;
  name:string;
  surname:string;
  constructor(t?: string, uid?: string, rep?: number, nam?: string, sur?: string){
    this.type=t ?? "";
    this.user_id=uid ?? "";
    this.reputation=rep ?? 0;
    this.name=nam ?? "";
    this.surname=sur ?? "";
  }
}
