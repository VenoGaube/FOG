This is a repository for the NFT part of a Decentralized journal, which was developed as a part of Fog Computing course at the Faculty of Computer and Information Science in Ljubljana.

# Table of contents
* 1\. [Overview](#overview)
  * 1.1\. [Ganache](#ganache)
  * 1.2\. [IPFS](#ipfs)
  * 1.3\. [Frontend](#frontend)
* 2\. [Setup](#setup)
  * 2.1\. [Solidity](#solidity)
  * 2.2\. [Frontend-Setup](#frontend-setup)
  * 2.3\. [Metamask](#metamask)
* 3\. [Generating-NFTs](#generating-nfts)

# Overview

## Ganache
This project uses Ganache personal Ethereum blockchain to easily deploy and monitor smart contracts. Follow the setup instructions [here](https://www.trufflesuite.com/docs/ganache/quickstart).

## IPFS
IPFS is used to store the NFT data. Setup instructions can be found [here](https://docs.ipfs.io/how-to/command-line-quick-start/).
We use the IPFS desktop application to deploy a local node and pin our NFT images and metadata to it.

## Frontend
We used Angular for a quick and effective implementation of our solution. The main goal of the frontend application is to
connect the user to web3 seamlessly, by having MetaMask pop-up for them to connect their local Truffle wallet and that's it.

They can now Mint and see their owned NFTs.

# Setup

```bash
npm install 
cd truffle
npm install # yes, there are two package.jsons, one for the frontend and another for truffle
```

## Solidity

Compile and Migrate Smart Contracts:

First, make sure you are running a local Ethereum-compatible Blockchain, for example [Ganache](https://www.trufflesuite.com/ganache).
Verify that the network configured in __truffle-config.js__ matches your params, else modify them.
Then, just execute _truffle_ commands:

```bash
cd truffle/
truffle compile
truffle migrate
```

## Frontend-Setup

For the launch of our frontend application, go back to the root of the project, if not already there, and run:

```bash
cd ..
npm start
```

Visit http://localhost:4200

## Metamask

Connect Metamask to one of the Ganache Accounts.

- Make sure you are running Ganache. Then pick the first account and copy its private key.
- Go to http://localhost:4200
- On Metamask, add a new Network, with URL http://localhost, 7545 as port and chain ID 1337. Use this network for development.
- Also in Metamask import an account -> specify the private key you copied from the Ganache first account. __Warning__: do not use this account as a real account.
- Reload the webapp.

# Generating NFTs

Once you successfully access your Metamask account you'll be able to mint your very own NFTs. You can achieve that by going to the
Authors/Reviewers or Board pages and correctly filling out the forms and by pressing on 'Mint' your NFT will get minted to your wallet address and it'll get displayed on screen below the form.
