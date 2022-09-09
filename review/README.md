
# Article/Paper review

Assigned student: Rok Bosil

This part of the project focuses on the design of the review process.

## Selected technologies
-	Solidity: writing smart contracts
-	Python
-  [Brownie](https://eth-brownie.readthedocs.io/en/stable/index.html): Python-based development and testing framework for smart contracts
-  Gnache: simulating local Ethereum network (blockchain) for testing and development
- MySQL

### Installation:
To install Brownie you will need `Node.js >= 6.11.5` and `Python >= 3.6.0`

- install ganache: `npm install -g ganache-cli`
- install pipx (restart the terminal after installing pipx): 
	- `python -m pip install --user pipx`
	-	`python -m pipx ensurepath`
- install brownie: `pipx install eth-brownie`

For a more detailed description of the installation you can also look in the official documentation: [Installing Brownie](https://eth-brownie.readthedocs.io/en/stable/install.html)

## Review process

**The rudimentary article review process will be as follows:**
-   author submits the article
-   the editor preforms an inital review and assigns the article to the selected reviewers
-   the reviewers review the article and cast a vote
-  after all votes are casted a decision is made based on the votes
    -   the article is accepted
    -   the article needs to be revised
    - the article is rejected
-   if further revision is needed the authors address the concerns and can re-submit the article
-   if the article is accepted it can be published
oracle, events, database, smart contract, ...

---
### Design


The review process was designed with the use of smart contracts. We tested the smart contract using brownie on a local ganache bockchain.
If one wants to deploy the contracts on a testnet (e.g. ropsten, rinkeby, ...) this can easily be done in Brownie with the `--network` tag. For more information you can look at on the official [Brownie documentation](https://eth-brownie.readthedocs.io/en/stable/network-management.html) - network management. 

The review process starts with the author submitting the paper for and then the editor assigns reviewers to this article. Once the article was submitted the reviewers have 45 days to review the article and submit their vote. There must be at least 3 reviewers per article and after they each cast their vote a decision is made based on the votes. The article can be accepted, rejected or be sent for revision. One article can be submitted for the review process only two times, meaning that if the reviewers decided that the article needs to be revised, the authors can make corrections to the article and re-submit it. But after re-submitting it the article can only be accepted or rejected (it cannot be sent for another revision).

The methods of the review process each emmit different events. We implemented an event listener that listens for these events (currently there is an event filter that listens for events emmited after a vote has been cast by the reviewer). Currently the vote is additionally stored in a database so tha we can keep a history of all votes for all the submitted articles. But additional functionalities can easily be implemented for different emmited events. 

#### Storage:
We only store the essential information about the review process and the articles on the blockchain. On the blockchain we store the submitted articles (only their ids and the data needed in the review process), the current votes/reviews of the articles and user roles. All the votes are also stored on a database where we can see the history of the review/voting process for different articles. This means that if the article needed to be revised and was once again sent through the review process, we can see the previous and aso the current reviewers votes. 

---
### User roles
- Author
- Reader
- Reviewer
- Editor

Article review will be mainly linked with the author, reviewer and editor roles. The smart contract will check if a user has the right role to execute a specific task. This part (the verification of roles) should be linked with the Identity Management.

---

## Smart contract methods
- `submitArticleForReview(string memory articleIpfsHash)`: This method submits the article for the start of the review process. It adds the aricle to the list of submitted articles, sets its status to `waitingForReviewers` and finally emits the event `ArticleSubmitted`.  
	- Requirenments (checked by the method): 
		- only a user with the role of an **author** can call this method (the method checks if `msg.sender` has the author role). 
-	`assignReviewers(string memory articleIpfsHash, address[] assigned_reviewers)`: The method retrieves the submitted article (sha256 encription of the `articleIpfsHash`) and assigns users from `assigned_reviewers` to be reviewers of this article. Because we are not connected to the Identity Management it also updates the roles of these users to reviewers. The article status is updated to `voting` and the event `VotingStarted` is emitted.
	- Requirenments (checked by the method):
		- only a user with the role of an **editor** can call this method
		-  the article must be in status `waitingForReviewers`
		- there must be at least 3 reviewers per article
- `vote(string memory articleIpfsHash, int8 _grade)`: This method casts a vote for the article (the reviewer can grade the article from a scale 1-5, 1 being the lowest score and 5 being the highest score).
  	- Requirenments (checked by the method):
		- only a user with the role of a **reviewer** can call this method
		- the grade must be between 1 and 5
		- the user must be assigned to review the article
		-  the article must be in status `voting` or `revise`
		- the user must not have already voted
		- the voting period must not have expired (less than 45 days since the article was submitted)
- `makeDecision(bytes32 articleId)`: This function is called when all the reviewers casted their vote. Based on the votes a decision is made to **accept**, **reject** or **revise** the article. Depending on the decision different events are emmited:
  	- the decision is **accept**:
		-  the article status is updated to `accept`
		- event `ArticleAccepted` is emitted
	- the decision is **reject**:
		-  the article status is updated to `reject`
		- event `ArticleRejected` is emitted
	- the decision is to **revise**:
 		-  if the article was already revised once (status was `revise`):
	 		-  the article is rejected (because the article can only be revised once)
	 		- the status is set to `reject`
	 		- event `ArticleRejected` is emitted
 		- if the article was not already revised:
	 		- the status is set to `revise`
	 		-  the votes and other values are reset
	 		- the article can again be reviewed by the reviewers
	 		-  event `ArticleForRevision` is emitted



## Running the code


1. To install the required dependencies navigate to the ```review``` directory and run:
 ```
pip install -r requirements.txt
```

### Running the tests
> NOTE:  This is only needed if you wish to run the provided brownie tests.
1. Create a database in MySQL, by running the following script (you will hae to install MySQL if it is not: [download](https://dev.mysql.com/downloads/mysql/)):
```
python scripts/database_setup.py
```
&emsp;&emsp;&emsp;This will create the `review` database and in it the `votes` table. If you wish to 're-create' the `votes` table you can execute the function `reset_table` inside `scripts/database_helper.py`.
> NOTE: We created the MySQL database with user: `root` and password: `root`. If you have different parameters please change them in the connection part of the code in `scripts/database_setup` and `scripts/database_helper` (the `getConnection` method in the latter)

2. In terminal run the command ```brownie test -s``` (you must be in the /review directory). This command runs the provided tests, which simmulate the whole review process. 

> NOTE: If you wish to test the contract without the database you can simply delete or comment `tests/test_review_process_database.py` and run the previous command (with this you will not need to create the MySQL database and the votes will not be stored in it)
### Individual testing

> NOTE: Alternatively you can test individual smart contract methods with the help of the brownie console (all the below commands are executed in the terminal from /review directory or the brownie console):
1. Compile the smart contracts: 
 ```
 brownie compile
 ```
 2. Start the brownie console:
  ```
 brownie console
```
&emsp;&emsp;&emsp;This will open the brownie console where you can deploy smart contracts and test their methods. Example:
```
r = Review.deploy(0, {'from': accounts[0]})
```
