import {Article} from "./Article";
import {Review} from "./Review";

export class User {
  type:string;
  user_id:string;
  articles:[Article];
  reviews:[Review];
  reputation:number;
}
