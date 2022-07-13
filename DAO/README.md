# DAO

Decentralized Autonomous Organization for Decentralized Journal

### Properties of DAO:

- flat democratised organisation
- voting is required for any changes to be implemented
- votes tallied, and outcome implemented automatically without trusted intermediary
- all activities are transparent and mainly public

### User roles:

1. Author - writes the paper
2. Reader - consumer of the paper
3. Reviewer - evaluates the paper
4. Editor - verifys the content of the paper (accept/reject) to the review process and assigns reviewers

Everyone can be author, reader, reviewer; but has to be elected to become an editor.

For every role (except for Reader), we will generate a membership NFT so that the DAO could identify a specific role a user has in order to allow or deny his/her vote.

### Technology stack

- DAO will be written in JavaScript
- We will use thirdweb SDK to help us write the smart contracts
- Until integration with our own Ethereum node, we will use Alchemy SDK
- Until finished, the DAO will be on Rinkeby network

### Executing

To execute the code run in current directory:

1. `npm install` to install the dependencies
2. `npm start` to start the project

## Voting process

For a user (connected with his MetaMask wallet) we verify his role with the function in smart contract provided by the person who is working on [Identity Management](https://github.com/VenoGaube/FOG/tree/main/IDENTITY) on this project. When the role is verified, the user is eligeble to mint a free NFT, which is some form of representation of entry access ticket to the DAO dashboard.

### Number of user roles

We have a maximum number of 10k authors and 1k reviewers. Number of each of those roles can be increased if needed.

We have 12 editors, who are elected every 4 years.

### Current implementation

As mentioned before, to get access to the DAO dashboard, user has to have an entry NFT (and as a souvenir in his wallet).

This is mostly helpful to manage the users with editor roles. The NFT drop of editors will be valid only for 4 years. After expiry a new drop of NFTs for editors is created, where newly elected editors will be eligeble to mint free editor NFTs that will grant them access to the DAO dashboard with the role of editor.

In our app is this done simply just by updating the old contract address of the Edition Drop with the new one every 4 years.

That way all previous editors get to keep their old editor NFTs as a souvenir in their wallet without any need of burning or transfering them.

### Token based voting

Current implementation is that once a year we drop 100 DJDAO governence tokens to every DAO user.

Each proposal:

- a DAO user wants to propose will cost him eg. 20 DJDAO tokens
- is valid approx 1 month (197100 blocks) until it is accepted/rejected
- Vote quorum is 1% of total supply - currently 50 people have to agree (if one vote is 20 tokens) in order for proposal to be accepted

TODO: consult with tokenomics guy to adjust airdrop amount, vote quorum, etc. according to our plan
