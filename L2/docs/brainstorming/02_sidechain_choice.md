# Which L2 solution would be ideal for usecase?

After long discussion about different L2 concepts, this document offers insights into decision making about which technology would be most suited for use in our L2 network

## Use case
We would like to create **an academic network**, which would be govern by several **academic institution**. Primary use would be to deploy blockchain-based project on some sort of **testnet research infrastructure**, which should support execution of EVM-based contracts, transactions facilitate coins etc. Cost should be as low as possible, assets would be given as sort of grants to different actors (researchers, students, outside parties etc.)

## Why sidechains are the best choice
Although security is important, it does not need to be bound only to blockchain itself. Since the solution would most likely be governed by a set of academic institutions, which would run the infrastructure, entire testnet could be based on some sort of **proof-of-authority** mechanism, which does not need security guarantees from Layer 1. There is no need for transactions to be verified by L1, transactions could be verified solely by validation nodes, which would be controlled by academic institutions. There could also be some governance mechanism, some sort of DAO, which would encode rules among different players (institutions, researchers, students, outside parties), but this is beyond the scope of this project.

Since there is no need for security guarantees from L1, we will not choose rollups. State channels are a bit outdated and do not support execution of smart contracts. Since plasma and validium are in its basics lighter versions of rollups, with different ways of data management, we will not choose them either. Besides, all zero-knowledge based solutions (zk-rollups, validium) suffer from not being fully EVM-compatible due to current limitations in proving some EVM commands. This leaves us with **sidechain**, which could be a perfect setup according to needs of academic world. As for consensus protocol, the best choice would be some sort of authority based protocol, for instance classical **proof-of-authority**. This would save power (in comparison to proof-of-work) and enable granting access and **usage tokens** to users. The minting of tokens would be controlled by academic institutions, probably also by some smart contracts. There are further multiple options and variants, regarding deployment and configuration, which we will not go into details as part of this work.

Important part of every side chain is also a **bridge** which facilitates the migration of funds from L1 Etherium network and our academic sidechain. Some dapps would still benefit from the ability to move funds from Etherium to academic network. This could also be a way for outside users to pay for usage of academic network.

The role and details around governance of the bridge still remain to be answered. Would each institution control its own bridge? Would there only be one bridge? Could usage tokens, granted to students or researchers for free as part of their academic tokens be exchanged to real Ether?

Still, sidechains remain the best options and would probably be the best platform to facilitate research into blockchain.


