# Blockchain bridges

## What are bridges
[Blockchain bridges][1] are a way to transfer assets between different blockchains, allowing the free flow of funds as well as transfer of data and deployment of multi-chain dapps.

## How do they work

There are three methods of how blockchain bridges work:
- **Lock and mint** -> Assets on one chain get locked in smart contract and new assets are minted on another side.
- **Burn and mint** -> similar to lock-and-mint approach, except assets are burned on the source chain. New assets are then minted on destination chain.
- **Atomic swaps** -> User swaps assets on one chain for assets on another chain. This swap must be facilitated by some other party (like exchange).

## Types of bridges

- **Native bridges** -> This bridges are deployed by blockchain creators to ease the transfer of funds from more known blockchains and therefore boost liquidity on this type of chains.
- **Validator or oracle based bridges** -> Bridge that rely on external validator or oracle to validate transfers.
- **Message passing bridges** -> Bridges that can transfer assets and arbitrary data. Used by dapps for communication.
- **Liquidity networks** -> Bridges that facilitate *atomic swaps* similar to exchanges. They usually do not support message passing.

## Security

Security-wise, bridges can be categorized as part of one of two groups: **trusted** or **trustless**. Trusted bridges rely on **outside set** of verifiers or oracle networks to facilitate cross-chain transaction. The benefits are usually low costs and speed of transaction, but at a cost of trust to 3rd party, outside of blockchain. Trustless bridges, on the other hand, do not rely on any other party, then blockchain itself and are considered more secure, but more difficult to implement.

Since bridges are still in the early stages of development, there is a lot of security risks. For start, there is a lot of different **open issues**, connected to immaturity of technology. Nobody knows how bridges could behave during previously unforeseen events, such as network congestion or state rollbacks. There is always a **smart contract risk**, even one bug in contract, which defines the bridge, can be exploited and lead to attacks. Trusted bridges face also a **counterparty risk**. Usage of trusted bridges is based on assumption that facilitator of cross-chain transfer will not collude to steal the assets, censor transaction or perform some other sort of malicious activity.

## Architecture of our bridge

Our bridge falls into category of *oracle-based trusted bridges*. It works differently depending on the side. If transferring from mainnet to sidechain, it locks funds on mainnet and then mints new tokens on sidechain. If transferring from sidechain to mainnet, it burns tokens on sidechain and unlocks tokens on mainnet. It has several components:
1. **Token-defining smart contracts**. This is not actually part of a bridge, it just defines the tokens, that our bridge is capable of transferring.
1. **Bridge smart contracts**. Bridge needs two smart contracts, one on each side to be able top transfer funds cross-chain. Functions from smart contract can only be triggered by bridge server from its address (for security reasons).
1. **Event listeners**. This is part of bridge, which listens to events, posted by bridge's smart contracts and notifies server on events (for instance tokens were posted to smart contract and need to be transferred cross-chain)
1. **Bridge server / oracle**. This is the actual server, which receives notifications about events and triggers functions in smart contracts, which (un)lock, mint or burn tokens.

![Bridge](bridge_animation.png)

[1]: <https://ethereum.org/en/developers/docs/bridges/>