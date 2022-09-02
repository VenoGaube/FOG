// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract PaperMethod {
    struct PaperData {
        string did;
        address author;
        string title;
        string keywords;
        string paperAbstract;
        string status;
        string typeChanged;
        uint timestampCreated;
        uint timestampChanged;
    }

    mapping(string => PaperData) private papers;
    mapping(address => string[]) private authorPapers;
    mapping(string => bool) private existentDids;
    mapping(address => uint) private numActivePapersByAuthor;

    constructor() {

    }

    function equals(string memory s1, string memory s2) private pure returns (bool) {
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
    }


    // getter if we are the paper's author (UI)
    function getPaperDataForAuthor(string memory did) public view returns (PaperData memory) {
        require(existentDids[did], "Specified paper does not exist");
        // if DID exists, but paper with this DID *and* sender as its author does not exist, sender is not paper's author.
        require(papers[did].author == msg.sender, "You do not have permission to access this paper info.");
        return papers[did];
    }

    // getter if we don't know paper's author (resolving a DID)
    function getPaperData(string memory did) public view returns (PaperData memory) {
        require(existentDids[did], "Specified paper does not exist");
        return papers[did];
    }

    function getPapersForAuthor(address authorAddress) public view returns (PaperData[] memory) {
        string[] memory papersByAuthor = authorPapers[authorAddress];  // all author's papers including removed
        // array will only contain non-removed papers (can be shorter than all papers)
        PaperData[] memory ret = new PaperData[](numActivePapersByAuthor[authorAddress]);
        uint currNonRemoved = 0;
        for (uint i = 0; i < papersByAuthor.length; i++) {
            PaperData memory currPaper = papers[papersByAuthor[i]];

            // paper must not be removed in order to return it
            if (!equals(currPaper.typeChanged, "removed_by_author")) {
                ret[currNonRemoved] = currPaper;
                currNonRemoved++;
            }
        }

        return ret;
    }

    function addPaper(string memory did, string memory title, string memory keywords, string memory paperAbstract, uint timeCreated) public {
        require(timeCreated != 0, "Invalid timestamp");
        require(!existentDids[did], "Specified paper already exists!");

        papers[did] = PaperData(
            did,
            msg.sender,
            title,
            keywords,
            paperAbstract,
            "submitted",
            "submitted",
            timeCreated,
            timeCreated
        );
        existentDids[did] = true;
        authorPapers[msg.sender].push(did);
        numActivePapersByAuthor[msg.sender]++;
    }

    function paperReUploaded(string memory paperDid, uint timeChanged) public {
        require(timeChanged != 0, "Invalid timestamp");
        require(existentDids[paperDid], "Specified paper does not exist");
        // if DID exists, but paper with this DID *and* sender as its author does not exist, sender is not paper's author.
        require(papers[paperDid].author == msg.sender, "You do not have permission to access this paper info.");
        require(!equals(papers[paperDid].status, "deactivated"), "You cannot edit deactivated paper's data!");

        papers[paperDid].timestampChanged = timeChanged;
        papers[paperDid].typeChanged = "update_pdf";
    }

    function editPaperTitle(string memory paperDid, string memory paperTitle, uint timeChanged) public {
        require(timeChanged != 0, "Invalid timestamp");
        require(existentDids[paperDid], "Specified paper does not exist");
        // if DID exists, but paper with this DID *and* sender as its author does not exist, sender is not paper's author.
        require(papers[paperDid].author == msg.sender, "You do not have permission to access this paper info.");
        require(!equals(papers[paperDid].status, "deactivated"), "You cannot edit deactivated paper's data!");

        papers[paperDid].title = paperTitle;
        papers[paperDid].timestampChanged = timeChanged;
        papers[paperDid].typeChanged = "update_title";
    }

    function editPaperKeywords(string memory paperDid, string memory paperKeywords, uint timeChanged) public {
        require(timeChanged != 0, "Invalid timestamp");
        require(existentDids[paperDid], "Specified paper does not exist");
        // if DID exists, but paper with this DID *and* sender as its author does not exist, sender is not paper's author.
        require(papers[paperDid].author == msg.sender, "You do not have permission to access this paper info.");
        require(!equals(papers[paperDid].status, "deactivated"), "You cannot edit deactivated paper's data!");

        papers[paperDid].keywords = paperKeywords;
        papers[paperDid].timestampChanged = timeChanged;
        papers[paperDid].typeChanged = "update_keywords";
    }

    function editPaperAbstract(string memory paperDid, string memory paperAbstract, uint timeChanged) public {
        require(timeChanged != 0, "Invalid timestamp");
        require(existentDids[paperDid], "Specified paper does not exist");
        // if DID exists, but paper with this DID *and* sender as its author does not exist, sender is not paper's author.
        require(papers[paperDid].author == msg.sender, "You do not have permission to access this paper info.");
        require(!equals(papers[paperDid].status, "deactivated"), "You cannot edit deactivated paper's data!");

        papers[paperDid].paperAbstract = paperAbstract;
        papers[paperDid].timestampChanged = timeChanged;
        papers[paperDid].typeChanged = "update_abstract";
    }

    function removePaper(string memory paperDid, uint timeChanged) public {
        require(timeChanged != 0, "Invalid timestamp");
        require(existentDids[paperDid], "Specified paper does not exist");
        // if DID exists, but paper with this DID *and* sender as its author does not exist, sender is not paper's author.
        require(papers[paperDid].author == msg.sender, "You do not have permission to access this paper info.");
        require(!equals(papers[paperDid].status, "deactivated"), "You cannot edit deactivated paper's data!");

        papers[paperDid].status = "deactivated";  // leave paper data but update its status to deactivated
        papers[paperDid].timestampChanged = timeChanged;
        papers[paperDid].typeChanged = "removed_by_author";
        numActivePapersByAuthor[msg.sender]--;
    }
}