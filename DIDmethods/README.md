# DID Methods
Student: Gregor Novak

### Used technologies
For defining DID methods and other tasks linked to DIDs that are in the scope of this topic,
use of Ethereum and Solidity language is currently planned, along with JSON.
This can be changed, according to which blockchain and technologies will be used in other parts of our decentralized journal.

### Main objectives
- Define DID methods for creating/resolving/updating/deactivating various DIDs, needed in our project.
- Manage tasks, other than pure DID methods, that are potentially out of scope of other topics. These could include:
  - Defining/managing DID subjects and DID controllers,
  - Defining DID documents,
  - Defining DID resolvers and resolutions, needed at other places within the main project.

Topic of DID methods is closely linked to other selected topics, such as for example *Identity management*. 
Therefore we plan to co-operate with students, working on such topics.

### Examples of DIDs and their methods, potentially used in our project
Currently, a fixed collection of needed DIDs and methods is not yet defined. We plan to determine this through time, when more of our decentralized journal is implemented and the needs for DIDs arise for various functionalities.
<br>
Bellow are some descriptive examples of DIDs and their methods, that can be used in our project and should be provided in the scope of *DID Methods* topic.
<br>
#### DID for paper/article
Papers are going to be one of the main parts of our journal. When a paper is submitted,
DID for this paper is created. If paper is rejected, its DID should be deactivated, indicating that paper is, in a way, no longer part of the journal. In the process of reviewing, publishing, etc., paper's DID should be updated.
For example, someone can change various properties of a paper, for which we can define appropriate DID methods.
It should also be determined, who has the control over the paper, but various tasks for the paper can exist.
Therefore, different types of controllers should be defined. DID subject in this case, is a specific paper.
<br>
These DIDs and their methods are closely linked to paper lifecycle.
#### DID for user review
In reputation mechanism and ranking system of the users, reviews could be used.
Here we can use DID, whose DID subject is a specific review. Review controller is its author and potential moderators, who can modify/delete the review if it is not appropriate.
Each user should be able to create only one review per addressed entity. If review's author changes opinion, expressed in the review, they can modify the review.
They could also be able to delete the review if they so choose. In this case, review's DID is deactivated.
#### DIDs which are part of the DAO
In the scope of DAO, voting functionality will be provided. Here we could use DIDs for the entities, which are receiving the votes.
Whenever a vote for a specific entity is submitted, its DID is updated through DID method, indicating the new received number of votes.
If voting is addressing various users, these DIDs could then also be part of Identity management if this would appear to be reasonable.

