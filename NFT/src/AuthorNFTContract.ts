import {AuthorNFT} from "./app/models/authorNFT";

export interface AuthorNFTContract {
  authorMint: (title: string, author: string, ipfsArticleLink: string) => Promise<any>;
  getAuthorNFTData: (tokenId: number) => Promise<AuthorNFT>;
  getOwnedNfts:() => Promise<AuthorNFT[]>;
  tokenURI:(tokenId: number) => string;
}
