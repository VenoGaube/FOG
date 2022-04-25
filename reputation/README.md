# Reputation system

## Design decisions
The design of the system was made by taking into consideration the discussion made in [1] and after reading the solution proposed in [2]:
1. *Storage*: we want to store as little data as possible on the blockchain. Therefore, we decide to have a database, that will store the text of the review, while we will keep on the blockchain only the hash value of the text, along with the actual score (integer value between 1 and 5) and the address of the entity, to which the review refers to. The hash is computed with the SHA-256 algorithm, by setting as the input the text string. For example, a hash of a review might be: 
   
   ```SHA256('the article is really illuminating') = 4f4a5e8a05fdd82aab3b8c2742286b83dc40417e248e77606a09b472290f700c```
   
   Users will be able to fetch the text of the reviews from the database by means of an external server, which we will manage (give also the option to fetch the data from the blockchain with an oracle?). They will be able to fetch all the other data (i.e. hash of the review, score, entity) directly from the blockchain. This way, they will be able to verify that the content of the reviews has not been tampered with. If the hash value on the blockchain does not match the one computed with the data on the database, the user cannot trust the text of a single review, but on the other hand, the user is still able to get all the scores of the reviews, as well as the final score, directly from the blockchain.
2. *Computation*: the computations that can be performed on the blockchain need to be deterministic. This fact, coupled with the finite precision of real number representation with binary values, prevents us from using exponents, logarithms, and many other functions, which we might consider when computing the final reputation of the entity - see [1] for a more detailed discussion. Nevertheless, we decide to compute the reputation on the blockchain so to have always the true reputation value computed on the blockchain. The final reputation is computed with the algorithms that will be discussed in the following sections.
3. *Storing data to the database*: the data will be inserted to the database by a centralized oracle we will manage. We might argue that this centralization (centralized oracle and database) undermines some of the robustness of the system, but we decided to take this road as on one hand, the data that is available on the database is not crytical (only the text of the review, while the score of the review is either way stored on the blockchain), and on the other hand because this will allow us to fetch the data much faster and provide a better user experience. 

### Benefits
* The blockchain is used to store hashes of the reviews, so that users can verify that the review has not been altered after it was inserted;
* The reviews get inserted directly to the blockchain with no intermediary, so we can be sure about their thruthfulness;
* The reputation scores are always up to date - see [1] for a thorough discussion of the pros and cons of both the proactive and reactive approaches in computing the reputation on the blockchain.

## Methods of the smart contract
* `store(uint8 _score, address _entity, string memory _text, string _entityType)`: this method inserts a new review which refers to the entity identified with the address `_entity`. The entity is either `paper` or `reviewer` - this value is passed in the `_entityType` parameter. First it is checked, whether the `msg.sender` is allowed to insert a review about `_entity`, then the score of the review is inserted into a private data structure of the contract. Next, the review of the entity is recomputed, and finally an event is emitted. This event is captured by an oracle, which inserts the data to the database.
* `entity_reviews_length(address _entity)`: returns the number of reviews which refer to the entity `_entity`. Note: if the return value is $0$, it means that either the entity does not exist or that it exists but has no reviews associated with it. We do so to reduce the storage requirements of the blockchain;
* `retrieve_entity_reviews(address _entity)`: returns an array of all the reviews received by the entity `entity`. The returned value is an array tuples of the form `[(review_id, score, entity, hash)]`. Similar considerations as in the previous point hold true when searching for an entity that does not exist.
* `get_entity_aggregated_score`: returns the final reputation value of the entity.

## Reputation algorithm
Discussion of algorithms used to compute the final reputation score... TO-DO.

## Local development

To test locally, follow the following steps:
1. Deploy a MySQL database. The database serves to store all the text contained in the reviews, other review data. For deploying the database locally, you may use the following command:
   
   ```
   docker run --rm -p 3306:3306\
            -e MYSQL_ROOT_PASSWORD=psw\
            -e MYSQL_DATABASE=reputation \
            -e MYSQL_USER=eventman\
            -e MYSQL_PASSWORD=sooper-secret-psw mysql:8
   ```

2. Create and set the required values in the `.env` file (host, port, user, password, database). For example `nano .env`, and then

   ```
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_DATABASE=reputation
   MYSQL_USER=root
   MYSQL_PASSWORD=my-secret-pw
   REVIEWS_TABLE=reviews
   ```
3. Install all the required packages, which are listed in the `requirements.txt` file. Use the command `pip install -r requirements.txt`;
4. You may run all the tests with the command `brownie test`;
5. Start the API with the command `brownie run deploy`. This will automatically also deploy a local blockchain with Ganache.


## Production deployment
TO-DO (for now, we are restrincted to test environment).

## Resources
* [1]:  Battah, A.; Iraqi, Y.; Damiani, E. Blockchain-Based Reputation Systems: Implementation Challenges and Mitigation. Electronics 2021, 10, 289. (https://doi.org/10.3390/electronics10030289)
* [2]: Dhakal, Anup & Cui, Xiaohui. (2019). DTrust: A Decentralized Reputation System for E-commerce Marketplaces. (https://www.researchgate.net/publication/332672141_DTrust_A_Decentralized_Reputation_System_for_E-commerce_Marketplaces)