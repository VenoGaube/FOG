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
During the corse of this project we researched deeper into selected blockchain-related topic. Findings and notes are contained in [docs/](docs/) directory. This include [Etherium basics](docs/basic_concepts/01_Etherium.md), [comparison of L2 solutions](docs/basic_concepts/02_L2.md), [Blockchain bridges](docs/basic_concepts/03_Blockchain_bridges.md) and [why sidechain was chosen](docs/brainstorming/02_sidechain_choice.md) as L2 solution in this project. It also includes a [section](docs/basic_concepts/03_Blockchain_bridges.md#arhitecture-of-our-bridge), dedicated to explainging how our prototype works.


## Etherium bridge demo

1. Create [moralis account](https://moralis.io/)
1. Create a moralis testnet server, connect it to Ringeby and Mumbai testnets
1. Add Metamask extension to browser, create MetaMask account, add Rinkeby and Mumbai test networks
1. Get some free tokens from faucets on both Rinkeby and Mumbai
1. Deploy smart contracts to appropriate networks. This can be done with arbitrary framework, for instance [Brownie](https://eth-brownie.readthedocs.io/en/stable/).
    - tokenContract.sol and MainBridge.sol -> mainnet (rinkeby)
    - childContract.sol and SideBridge.sol -> sidechain (Mumbai)
1. Save addresses from smart contracts, so they can be inserted later into other components
1. In [cloudCode.js](L2/ERC20Bridge/moralis_server/cloudCode.js), enter your adressess from smart contracts: `MainBridge_address`, `SideBridge_address`, `mainToken_address`, `childToken_address` and config values from Moralis sever: `gateway_address`, `gatewayKey`.
1. Copy [cloudCode.js](L2/ERC20Bridge/moralis_server/cloudCode.js) to Moralis server's Cloud Functions
1. Add ABI listeners (Moralis server's Syncs). Click Add sync and then copy code from [ABI folder](L2/ERC20Bridge/moralis_server/eventsAbi.json)
1. Enter addressess backend for frontend files ([logicBridge](L2/ERC20Bridge/frontend/static/logicBridge.js) and [logicReturn](L2/ERC20Bridge/frontend/static/logicReturn.js)): `mainTokenAddress`, `mainBridgeAddress`, `childTokenAddress` and `sideBridgeAddress`.
1. Deploy frontend with some html server, for instance python server:
    ```bash
    cd L2/ERC20Bridge/frontend
    python3 -m http.server
    # This will probably deploy server to `http://0.0.0.0:8000/`
    ```
1. Bridge frontend should be on following addresses : `[server_address]/bridge.html` and `[server_address]/return.html`, for instance so enter these two into browser and it should work.