import {AuthorNFTContract} from "../AuthorNFTContract";
import {BoardNFTContract} from "../BoardNFTContract";
import {ReviewerNFTContract} from "../ReviewerNFTContract";

export abstract class WalletService {
  abstract initAuthor(): Promise<AuthorNFTContract>;
  abstract initBoard(): Promise<BoardNFTContract>;
  abstract initReviewer(): Promise<ReviewerNFTContract>;
}
