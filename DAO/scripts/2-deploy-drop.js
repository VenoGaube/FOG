import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      name: "Decentralized Journal Membership",
      description: "A DAO for Decentralized Journal.",
      // The image that will be held on our NFT! The fun part :).
      image: readFileSync("scripts/assets/djDAO.png"),
      // Anyone can become an author for free (0x0 address)
      // If we wanted to charge for membership, we input our address
      primary_sale_recipient: AddressZero,
    });

    // we use this to initialize the contract on the thirdweb sdk
    const editionDrop = sdk.getEditionDrop(editionDropAddress);

    // with this, we can get the metadata of our contract
    const metadata = await editionDrop.metadata.get();

    console.log(
      "Successfully deployed editionDrop contract, address:",
      editionDropAddress
    );
    console.log("editionDrop metadata:", metadata);
  } catch (error) {
    console.log("failed to deploy editionDrop contract", error);
  }
})();
