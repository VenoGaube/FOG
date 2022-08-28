import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      name: "Decentralized Journal DAO",

      // This is the location of our governance token, our ERC-20 contract!
      voting_token_address: "0x928A94aa5530477aF9E9f8521C9B15CC65fbFcC2",
      // After a proposal is created, when can members start voting?
      // For now, we set this to immediately.
      voting_delay_in_blocks: 0,

      // How long do members have to vote on a proposal when it's created?
      // 1 block is approx 13.14 seconds
      // 1 day = 6570 blocks ->
      // 1 week = 197100 blocks
      voting_period_in_blocks: 197100,

      // The minimum % of the total supply that need to vote for
      // the proposal to be valid after the time for the proposal has ended.
      // 1% is 50 people if one vote is 20 tokens
      voting_quorum_fraction: 0,

      // What's the minimum # of tokens a user needs to be allowed to create a proposal?
      proposal_token_threshold: 0,
    });

    console.log(
      "Successfully deployed vote contract, address:",
      voteContractAddress
    );
  } catch (err) {
    console.error("Failed to deploy vote contract", err);
  }
})();
