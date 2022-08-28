import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const editionDrop = sdk.getEditionDrop(
  "0x35A36913339f072F951B3bC2b60C539A6f39D439"
);

// This is the address to our ERC-20 token contract.
const token = sdk.getToken("0x928A94aa5530477aF9E9f8521C9B15CC65fbFcC2");

(async () => {
  try {
    // Grab all the addresses of people who own our membership NFT
    var walletAddresses = [];
    var authorAddresses = await editionDrop.history.getAllClaimerAddresses(0);
    var reviewerAddresses = await editionDrop.history.getAllClaimerAddresses(1);
    var editorAddresses = await editionDrop.history.getAllClaimerAddresses(2);

    walletAddresses = authorAddresses
      .concat(reviewerAddresses)
      .concat(editorAddresses);

    console.log(walletAddresses);

    if (walletAddresses.length === 0) {
      console.log("No NFTs have been claimed yet!");
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      // Each holder gets 100 DJDAO tokens
      const amount = 100;
      console.log("Going to airdrop", amount, "tokens to", address);

      // Set up the target.
      const airdropTarget = {
        toAddress: address,
        amount: amount,
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log(
      "Successfully airdropped tokens to all the holders of the NFT!"
    );
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();
