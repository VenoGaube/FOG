import {AuthorNFT} from "./app/models/authorNFT";

export interface AuthorNFTContract {
  authorMint: (title: string, author: string, ipfsArticleLink: string, emojiIndex: number) => Promise<any>;
  getAuthorNFTData: (tokenId: number) => Promise<AuthorNFT>;
  getOwnedNfts:() => Promise<AuthorNFT[]>;
}
