# Etherium concepts

## Consensus protocols

### Proof of Work (PoW)
- [Proof of work](https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/). 
Finding the right nonce for a block to have the right hash (the more difficult the block, less hashes satisfy requirements). Example: find the hash with x zeros

#### Security
Extremely secure, 51% attack almost impossible (attack's energy consumption greater then gains)

#### Rewards
- Miner -> 2 ETH as a reward
- For uncle block -> 1.75 ETH (due to latency)

#### Finality
- [On Settlement Finality](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)
- a state, when transaction is considered irreversible
- when all the forks have been deleted
- ~1min (6 blocks,)
    - attacker with 25% of network power can create longer fork with probablity 0.00137 (smaller then transaction fee) 
- solved with casper protocol (PoS)

### Proof of Stake (PoS)


### Comparison between PoW and PoS

#### PoW pros
- more secure
- tried and tested
- don't need ETH to start

#### PoS pros
- energy efficient
- no competing forks

