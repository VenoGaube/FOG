import {Component, OnInit} from '@angular/core';
import {WalletService} from "../../services/WalletService";
import {AuthorNFTContract} from "../../AuthorNFTContract";
import {AuthorNFT} from "../models/authorNFT";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authorNFTContract: AuthorNFTContract | undefined;
  authorNFTs: AuthorNFT[] | undefined;
  title: string;

  constructor(private walletService: WalletService) {
    this.title = "Testni title";
  }

  ngOnInit(): void {
    this.walletService.init()
      .then(authorNFTContract => {
        this.authorNFTContract = authorNFTContract;
        return this.updateAuthorNFTs();
      })
      .catch(err => {
        console.error(err);
      });
  }

  mint() {
    if (this.title) {
      this.authorNFTContract?.authorMint(this.title, "Testni author", "Linkič", 5)
        .then(() => {
          return this.updateAuthorNFTs();
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  updateAuthorNFTs(): Promise<any> {
    return this.authorNFTContract?.getOwnedNfts()
      .then((authorNFTs) => {
        this.authorNFTs = authorNFTs;
      }) || Promise.resolve();
  }

  setArticleTitle(event: any) {
    this.title = event.target.value;
  }
}
