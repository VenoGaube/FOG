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
  }


}
