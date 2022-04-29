# Knowledge base

This part of the project focuses on storing data in the OriginTrail decetralized knowledge graphs (DKG).

## Properties of Origin trail

OriginTrail is an ecosystem that connects Layer 1 techologies such as Ethereum with its graph technology on Layer 2. For storing the diles in the DKG, we need to run a node (local for deelopment) and run the node on OriginTrails testnet and later mainnet.

We can interact with the node with DKG SDKs and create graph-native Web3 applications.

DKG enables you to 

* Easily discover, query and integrate datasets from multiple sources

* Securely share semantic data (knowledge) across systems and dapps

* Easily build custom verifiable data pipelines

* Integrate with existing SSI & blockchain tooling

## Selected technologies

* Integration with OriginTrail DKG will we written in JavaScript, using dks.js, an SDK from OriginTrail

* For development we will run our node locally, when finished we can use the testnes (for v6 mainnet is not yet available)

## Implementation

In our DKG we will store the same data as in the IPFS. We will store all articles and related information, and all users (reviewers, editors, authors ...) and their information

In our implementation we need to cover all querying and data manipulation actions for all the entities mentioned above

