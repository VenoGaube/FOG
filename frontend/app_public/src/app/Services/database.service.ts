import { Injectable } from '@angular/core';
import {User} from "../../assets/classes/User";
import {Article} from "../../assets/classes/Article";
import {Review} from "../../assets/classes/Review";

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


}
