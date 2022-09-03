# Ethereum Layer 2 Network

Ethereum L2 network is a set of technologies, aiming to improve scalability of Ethereum network, improve transaction throughput and lower power consumption. In the scope of this project, we explored different L2 solutions, chose sidechain as the most appropriate tehnology for our usecase and deployed a demo bridge between, which could be deployed between any ETH-compatible chains (for instance Etherium testnet as mainnet and some other sidechain).

## Student asigned to the project
Mihael Trajbarič

## Main objectives
- research different Layer 2 solutions
- choose the most approapriate one for [usecase](#usecase)
- research gateway / bridge between L1 and L2
- deploy prototype

## Key selected technologies
- [Moralis SDK](https://moralis.io/)
- [Metamask wallet](https://metamask.io/)
- [Rinkeby (ETH) Testnet](https://www.rinkeby.io/)
- [Mumbai (Polygon) Testnet](https://mumbai.polygonscan.com/)
- [Brownie SDK](https://eth-brownie.readthedocs.io/en/stable/)


## Usecase

Although there are no special requirements for deployment of L2 network, we could aim at creating a platform, which could be offered to various players (mostly from Slovenia), that want to get into web3 and don't know how. The network could be thought of as a educational platform to help with deployment of simple web3 projects. Project will most likely not achieve this goal of actually hosting a real web3 project, but we can still have a requirements in mind when making design choices.

## Theoretical part
During the corse of this project we researched deeper into selected blockchain-related topic. Findings and notes are contained in [docs/](docs/) directory. This include [Etherium basics](docs/basic_concepts/01_Etherium.md), [comparison of L2 solutions](docs/basic_concepts/02_L2.md), [Blockchain bridges](docs/basic_concepts/03_Blockchain_bridges.md) and [why sidechain was chosen](docs/brainstorming/02_sidechain_choice.md) as L2 solution in this project.


## Etherium bridge demo
### Setup

1. create moralis account
2. Add Metamask extension, create MetaMask account, add Rinkeby and Mumbai test networks
3. Get some free tokens from faucets on both Rinkeby and Mumbai
4. tokenContract.sol and MainBridge.sol -> mainnet (rinkeby), childContract.sol and SideBridge.sol -> sidechain (Mumbai)
- first deploy contracts?

### Use