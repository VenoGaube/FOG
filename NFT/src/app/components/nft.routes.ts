import { Routes } from '@angular/router';
import {ReviewerMintComponent} from "./reviewerMint/reviewerMint.component";
import {BoardMintComponent} from "./boardMint/boardMint.component";
import {AuthorMintComponent} from "./authorMint/authorMint.component";

export const NFT_ROUTES: Routes = [
  { path: 'authorMint',
    component: AuthorMintComponent
  },
  { path: 'reviewerMint',
    component: ReviewerMintComponent,
  },
  { path: 'boardMint',
    component: BoardMintComponent
  },
];
