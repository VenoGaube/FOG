import {BoardNFT} from "./app/models/boardNFT";

export interface BoardNFTContract {
  boardMint: (rating: number) => Promise<any>;
  getBoardNFTData: (tokenId: number) => Promise<BoardNFT>;
  getOwnedNfts:() => Promise<BoardNFT[]>;
  tokenURI:(tokenId: number) => string;
}
