import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before.
const token = sdk.getToken("0x928A94aa5530477aF9E9f8521C9B15CC65fbFcC2");

(async () => {
  try {
    const amount = 10000;
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();

    console.log(
      "There now is",
      totalSupply.displayValue,
      "$DJDAO in circulation"
    );
  } catch (error) {
    console.error("Failed to generate tokens", error);
  }
})();
