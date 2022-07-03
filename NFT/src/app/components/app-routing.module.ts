import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {NFT_ROUTES} from "./nft.routes";

@NgModule({
  imports: [
    RouterModule.forRoot(
      [...NFT_ROUTES],
      {
        preloadingStrategy: PreloadAllModules,
      },
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
