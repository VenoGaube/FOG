import {AuthorNFTContract} from "../AuthorNFTContract";

export abstract class WalletService {
  abstract init(): Promise<AuthorNFTContract>;
}
