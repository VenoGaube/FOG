import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// This is our governance contract.
const vote = sdk.getVote("0x5d9f7FF2da9DB330Bd434d976F29616E7f7Ccfe7");

// This is our ERC-20 contract.
const token = sdk.getToken("0x928A94aa5530477aF9E9f8521C9B15CC65fbFcC2");

(async () => {
  try {
    // Create proposal to mint 10k new tokens to the treasury.
    const amount = 10_000;
    const description =
      "Should the DAO mint an additional " +
      amount +
      " tokens into the treasury?";
    const executions = [
      {
        // Our token contract that actually executes the mint.
        toAddress: token.getAddress(),
        // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
        // to send in this proposal. In this case, we're sending 0 ETH.
        nativeTokenValue: 0,
        transactionData: token.encoder.encode("mintTo", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]),
      },
    ];

    await vote.propose(description, executions);

    console.log("Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }
})();
