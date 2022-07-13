import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const vote = sdk.getVote("0x45252f35E94867aB855FAd763A1d6A8f2C6AD048");

// This is our ERC-20 contract.
const token = sdk.getToken("0x928A94aa5530477aF9E9f8521C9B15CC65fbFcC2");

(async () => {
  //   try {
  //     const address = "0x06417Ae56dBdA4b984a2EF664E785c9362318D91";
  //     const description = "Should " + address + " be an editor?";
  //     await vote.propose(description);
  //     console.log("Successfully created proposal for editor 1");
  //   } catch (error) {
  //     console.error("failed to create first proposal", error);
  //     process.exit(1);
  //   }

  try {
    const address = "0x35D1D88C1b4d5AaB0596b7db784c97a477773b12";
    const description = "Should " + address + " be an editor?";
    await vote.propose(description);
    console.log("Successfully created proposal for editor 2");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const address = "0x0642Bff105eC3EF42B1691D674870F7B9170243B";
    const description = "Should " + address + " be an editor?";
    await vote.propose(description);
    console.log("Successfully created proposal for editor 3");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const address = "0xB09269a16b7Aa612A414116AF9305b816914F59C";
    const description = "Should " + address + " be an editor?";
    await vote.propose(description);
    console.log("Successfully created proposal for editor 4");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const address = "0xdCD7dD71ec61C3E2D475F1EC2D2F74B36e675Fe0";
    const description = "Should " + address + " be an editor?";
    await vote.propose(description);
    console.log("Successfully created proposal for editor 5");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const address = "0xb354f70AF60bA6427DbA47cb40cfa17428795006";
    const description = "Should " + address + " be an editor?";
    await vote.propose(description);
    console.log("Successfully created proposal for editor 6");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const address = "0xd340B1D9813c96D83B5F8d21c03B335A80427937";
    const description = "Should " + address + " be an editor?";
    await vote.propose(description);
    console.log("Successfully created proposal for editor 7");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const address = "0xa4848E93c9cc4d6f44226dc1E18155979f31F62F";
    const description = "Should " + address + " be an editor?";
    await vote.propose(description);
    console.log("Successfully created proposal for editor 8");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const address = "0xE88858DdB4BAee8e5Bd6A77EC20512447BACE1b6";
    const description = "Should " + address + " be an editor?";
    await vote.propose(description);
    console.log("Successfully created proposal for editor 9");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const address = "0xC48FDb6A37AC42D9f8cD9c2d55f2CF4ce6B89bf0";
    const description = "Should " + address + " be an editor?";
    await vote.propose(description);
    console.log("Successfully created proposal for editor 10");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const address = "0x06417Ae56dBdA4b9ABEDEF664E785c9362318D91";
    const description = "Should " + address + " be an editor?";
    await vote.propose(description);
    console.log("Successfully created proposal for editor 11");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const address = "0x06A1bedBdA4b984a2EFDEF785c93ABC18DFD";
    const description = "Should " + address + " be an editor?";
    await vote.propose(description);
    console.log("Successfully created proposal for editor 12");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }
})();
