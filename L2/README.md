# Ethereum Layer 2 Network

Ethereum L2 network is a set of technologies, aiming to improve scalability of Ethereum network, improve transaction throughput and lower power consumption. In the scope of this project, we are going to set up a ETH L2 network and connect it to the mainnet.

## Main objectives
- deploy Layer 2 network
- configure 2 ETH nodes for the L2 network
- connect L2 network to mainnet via smart contract (gateway)
- execute transactions and/or smart contracts on network

## Selected technologies
- Docker
- [Go Ethereum](https://geth.ethereum.org/)
- [Elixir-omg](https://github.com/omgnetwork/elixir-omg)
- [OmiseGO Plasma Framework](https://github.com/omgnetwork/plasma-contracts)



---
**NOTE on Selected technologies**

Since some decisions regarding L2 approaches are yet to be made, Selected technologies contain a list of technologies that are ***most likely*** to be used. List could change over time.

---


## Tasks and rationale
- define a use-case-specific requirements
    - although there are no special requirements for deployment of L2 network, we could aim at creating a platform, which could be offered to various players (mostly from Slovenia), that want to get into web3 and don't know how. The network could be thought of as a educational platform to help with deployment of simple web3 projects. Project will most likely not achieve this goal of actually hosting a real web3 project, but we can still have a requirements in mind when making design choices.
- choose the right L2 technology (state channels, Plasma / sidechain or rollup)
    - different approaches offer different levels of security
    - some easier to implement, some harder
    - use project requirements and own capabilities to make a decision
- choose consensus protocol and node architecture
    - based on different project requirements (use-case)
- deploy private testnet
    - deploying private testnet is not hard and would offer opportunity to test different configurations and deployment details before connecting our network to ETH
- implement gateway smart contract
    - the most crucial part
    - depends on type of chain, used in project (sidechain, rollup, etc.)
- deploy full L2 network
    - at this point all the pieces have been configured and tested
    - putting everything together and hoping it works
- test L2 network
    - deploy simple transaction
    - deploy smart contract
    - test transaction speed


## Sources
- [Layer 2](https://ethereum.org/en/layer-2/)
- [An Incomplete Guide to Rollups](https://vitalik.ca/general/2021/01/05/rollup.html)
- [ROLLUPS - The Ultimate Ethereum Scaling Strategy?](https://www.youtube.com/watch?v=7pWxCklcNsU)
- [Plasma](https://github.com/omgnetwork/plasma-contracts)
- [Polygon sidechain vs Ethereum rollups](https://www.youtube.com/watch?v=DyNbmgkyxJI)


