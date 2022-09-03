# Blockchain bridges

## What are bridges
[Blockchain bridges][1] are a way to transfer assets between different blockchains, allowing the free flow of funds as well as transfer of data and deployment of multi-chain dapps.

## How do they work

There are three methods of how blockchain bridges work>
- **Lock and mint** -> Assets on one chain get locked in smart contract and new assets are minted on another side.
- **Burn and mint** -> similar to Lock-and-mint approach, except assets are burned on the source chain. New assets are then minted on destination chain.
- **atomic swaps** -> User swaps assets on one chain for assets on another chain. This swap must be facilitated by some other party (like exchange)

## Types of bridges

- **Native bridges** -> This bridges are deployed by blockchain creators to ease the transfer of funds from more known blockchains and therefore boost liquidity on this type of chain
- **Validator or oracle based bridges** -> Bridge that rely on external validator or oracle to validate transfers.
- **Message passing bridges** -> Bridges that can transfer assets and arbitrary data. Used by dapps for comunication.
- **Liquidity networs** -> Bridges that facilitate *atomic swaps* similar to exchanges. They usually do not support message passing.

## Security

Security-wise, bridges can be categorised as part of one of two groups: **trusted** or **trustless**. Trusted bridges rely on **outside set** of verifiers or oracle networks to facilitate cross-chain transaction. The benefits are usually low costs and speed of transaction, but at a cost of trust to 3rd party, outside of blockchain. Trusless bridges, on the other hand, do not relly on any other party, then blockchain itself and are considere more secure, but more difficult to implement.

Since bridges are still in the early stages of developement, there is a lot of secuirty risks. For start, there is a lot of different **open issues**, connected to immaturity of tehnology. Nobody nows how bridges could behave during previously unforseen events, such as network congestion or state rollbacks. There is always a **smart contract risk**, even one bug in contract, which defines the bridge, can be exploited and lead to attacks. Trusted bridges face also a **counterparty risk**. Usage of trusted bridges is based on assumption that facilitator of cross-chain transfer will not colude to steal the assets, censor transaction or perform some other sort of malitious activity.

[1]: <https://ethereum.org/en/developers/docs/bridges/>