import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Metamask} from "../../services/Metamask.service";
import {WalletService} from "../../services/WalletService";
import {AuthorNFTFactoryService} from "../../services/AuthorNFTFactory.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: WalletService, useClass: Metamask},
    {provide: AuthorNFTFactoryService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
