import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Metamask} from "../../services/Metamask.service";
import {WalletService} from "../../services/WalletService";
import {AuthorNFTFactoryService} from "../../services/AuthorNFTFactory.service";
import {AuthorMintComponent} from "./authorMint/authorMint.component";
import {BoardMintComponent} from "./boardMint/boardMint.component";
import {ReviewerMintComponent} from "./reviewerMint/reviewerMint.component";
import {ReviewerNFTFactoryService} from "../../services/ReviewerNFTFactory.service";
import {BoardNFTFactoryService} from "../../services/BoardNFTFactory.service";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AuthorMintComponent,
    BoardMintComponent,
    ReviewerMintComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: WalletService, useClass: Metamask},
    {provide: AuthorNFTFactoryService},
    {provide: ReviewerNFTFactoryService},
    {provide: BoardNFTFactoryService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
