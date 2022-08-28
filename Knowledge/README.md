# Knowledge base

This part of the project focuses on storing data in the OriginTrail decetralized knowledge graphs (DKG).

## OriginTrail Development Node Initialization

### Prerequisites

* An installed and running GraphDB
* An installed and running MySQL
* You should have installed npm and Node.js (v14)

### Instalation steps

#### Step 1 - Get the DKG code by cloning the  repo and checking out the proper branch
```
git clone https://github.com/OriginTrail/ot-node
cd ot-node
git checkout v6/develop
```

#### Step 2 - Install dependencies

```
npm install
```

#### Step 3 - Create .env file the ot-node root folder and add public and private keys for blockchain:

```
NODE_ENV=development
PUBLIC_KEY=<insert_here>
PRIVATE_KEY=<insert_here>
```

#### Step 4 - Run DB migrations

```
npx sequelize --config=./config/sequelizeConfig.js db:migrate
```

#### Step 6 - Start OriginTrail v6 node
```
node index.js
```

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

