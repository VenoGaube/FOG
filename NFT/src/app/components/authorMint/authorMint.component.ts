import {Component, OnInit} from '@angular/core';
import {WalletService} from '../../../services/WalletService';
import {AuthorNFTContract} from '../../../AuthorNFTContract';
import {AuthorNFT} from '../../models/authorNFT';

@Component({
  selector: 'authorMint',
  templateUrl: './authorMint.component.html',
  styleUrls: ['./authorMint.component.css']
})
export class AuthorMintComponent implements OnInit {
  authorNFTContract: AuthorNFTContract | undefined;
  authorNFTs: AuthorNFT[] | undefined;
  title: string;
  author: string;
  articleData: string;
  articleImage: string;

  constructor(private walletService: WalletService) {
    this.title = "";
    this.author = "";
    this.articleData = "";
    this.articleImage = "";
  }

  ngOnInit(): void {
    this.walletService.initAuthor()
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
      this.authorNFTContract?.authorMint(this.title, this.author, this.articleData)
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

  setArticleAuthor(event: any) {
    this.author = event.target.value;
  }

  setArticleData(event: any) {
    this.articleData = event.target.value;
  }
}
