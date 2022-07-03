import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop(
  "0x35A36913339f072F951B3bC2b60C539A6f39D439"
);

(async () => {
  try {
    // We define our claim conditions
    const claimConditions = [
      {
        // When will people be able to start claiming them
        startTime: new Date(),
        // The maximum number of authors is 10k.
        maxQuantity: 10_000,
        // The price of our NFT (free)
        price: 0,
        // The amount of NFTs people can claim in one transaction.
        quantityLimitPerTransaction: 1,
        // We set the wait between transactions to MaxUint256, which means
        // people are only allowed to claim once.
        waitInSeconds: MaxUint256,
      },
    ];

    // Author NFT has index 0
    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("Successfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();
