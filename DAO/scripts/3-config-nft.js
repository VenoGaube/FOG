import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop(
  "0x35A36913339f072F951B3bC2b60C539A6f39D439"
);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Decentralized Journal Author",
        description:
          "This NFT is a proof of being an author for Decentralized Journal!",
        image: readFileSync("scripts/assets/djDAO_author.png"),
      },
      {
        name: "Decentralized Journal Reviewer",
        description:
          "This NFT is a proof of being a reviewer for Decentralized Journal!",
        image: readFileSync("scripts/assets/djDAO_reviewer.png"),
      },
      {
        name: "Decentralized Journal Editor",
        description:
          "This NFT is a proof of being an editor for Decentralized Journal!",
        image: readFileSync("scripts/assets/djDAO_editor.png"),
      },
    ]);
    console.log("Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
