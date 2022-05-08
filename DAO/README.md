# DAO

Decentralized Autonomous Organization for Decentralized Journal

### Properties of DAO:

- flat democratised organisation
- voting is required for any changes to be implemented
- votes tallied, and outcome implemented automatically without trusted intermediary
- all activities are transparent and mainly public

### Suggested roles:

1. Author - writes the paper
2. Reader - consumer of the paper
3. Reviewer - evaluates the paper
4. Editor - verifys the content of the paper (accept/reject) to the review process and assigns reviewers

Everyone can be author, reader, reviewer; but has to be elected to become an editor.

For every role (except for Reader), we will generate a membership NFT so that the DAO could identify a specific role a user has in order to allow or deny his/her vote.

### Functions needed to be implemented

- `confirmEditor()` - to elect an editor
- `revokeEditor()` - to revoke someone as an editor
- `addReviewer()` - to asign a role as a reviewer to someone
- ...

The list will be updated as new functions will be thought of / needed.

### Technology stack

- DAO will be written in JavaScript
- We will use thirdweb SDK to help us write the smart contracts
- Until integration with our own Ethereum node, we will use Alchemy SDK
- Until finished, the DAO will be on Rinkeby network

### Executing

To execute the code run in current directory:

1. `npm install` to install the dependencies
2. `npm start` to start the project
