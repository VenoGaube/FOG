import {
  useAddress,
  useMetamask,
  useEditionDrop,
  useToken,
  useVote,
} from "@thirdweb-dev/react";

import { AddressZero } from "@ethersproject/constants";

import { useState, useEffect, useMemo } from "react";

const App = () => {
  // thirdweb hooks
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("Wallet address:", address);

  // Initialize our editionDrop contract
  const editionDrop = useEditionDrop(
    "0x35A36913339f072F951B3bC2b60C539A6f39D439"
  );
  // Initialize our token contract
  const token = useToken("0x928A94aa5530477aF9E9f8521C9B15CC65fbFcC2");

  // Initialize our vote contract
  const vote = useVote("0x5d9f7FF2da9DB330Bd434d976F29616E7f7Ccfe7");
  const voteEditor = useVote("0x45252f35E94867aB855FAd763A1d6A8f2C6AD048");

  // State variables for us to know if user has our NFT.
  const [hasClaimedAuthor, setHasClaimedAuthor] = useState(false);
  const [hasClaimedReviewer, setHasClaimedReviewer] = useState(false);
  const [hasClaimedEditor, setHasClaimedEditor] = useState(false);

  // Holds the amount of token each member has in state.
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  // The array holding all of our members addresses.
  const [authorAddresses, setAuthorAddresses] = useState([]);
  let [reviewerAddresses, setReviewerAddresses] = useState([]);
  let [editorAddresses, setEditorAddresses] = useState([]);
  let [walletAddresses, setWalletAddresses] = useState([]);

  // State variables for voting
  const [proposals, setProposals] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // State variables for voting editors
  const [proposalsEditor, setProposalsEditor] = useState([]);
  const [isVotingEditor, setIsVotingEditor] = useState(false);
  const [hasVotedEditor, setHasVotedEditor] = useState(false);

  // Retrieve all our existing proposals from the contract.
  useEffect(() => {
    if (!hasClaimedAuthor && !hasClaimedReviewer && !hasClaimedEditor) {
      return;
    }

    // A simple call to vote.getAll() to grab the proposals.
    const getAllProposals = async () => {
      try {
        const proposals = await vote.getAll();
        setProposals(proposals);
        console.log("Proposals:", proposals);
      } catch (error) {
        console.log("failed to get proposals", error);
      }
    };
    getAllProposals();
  }, [hasClaimedAuthor, hasClaimedReviewer, hasClaimedEditor, vote]);

  // Retrieve all our existing proposals for editorial voting from the contract.
  useEffect(() => {
    if (!hasClaimedAuthor && !hasClaimedReviewer && !hasClaimedEditor) {
      return;
    }

    // A simple call to vote.getAll() to grab the proposals.
    const getAllProposals = async () => {
      try {
        const proposalsEditor = await voteEditor.getAll();
        setProposalsEditor(proposalsEditor);
        console.log("Proposals editor:", proposalsEditor);
      } catch (error) {
        console.log("failed to get proposals editor", error);
      }
    };
    getAllProposals();
  }, [hasClaimedAuthor, hasClaimedReviewer, hasClaimedEditor, voteEditor]);

  // We need to check if the user already voted.
  useEffect(() => {
    if (!hasClaimedAuthor && !hasClaimedReviewer && !hasClaimedEditor) {
      return;
    }

    // This is just to wait for previous useEffect to finish
    if (!proposals.length) {
      return;
    }

    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
        setHasVoted(hasVoted);
        if (hasVoted) {
          console.log("User has already voted");
        } else {
          console.log("User has not voted yet");
        }
      } catch (error) {
        console.error("Failed to check if wallet has voted", error);
      }
    };
    checkIfUserHasVoted();
  }, [
    hasClaimedAuthor,
    hasClaimedReviewer,
    hasClaimedEditor,
    proposals,
    address,
    vote,
  ]);

  // We need to check if the user already voted for editors.
  useEffect(() => {
    if (!hasClaimedAuthor && !hasClaimedReviewer && !hasClaimedEditor) {
      return;
    }

    // This is just to wait for previous useEffect to finish
    if (!proposalsEditor.length) {
      return;
    }

    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await voteEditor.hasVoted(
          proposalsEditor[0].proposalId,
          address
        );
        setHasVotedEditor(hasVoted);
        if (hasVoted) {
          console.log("User has already voted for editor");
        } else {
          console.log("User has not voted for editor yet");
        }
      } catch (error) {
        console.error("Failed to check if wallet has voted for editor", error);
      }
    };
    checkIfUserHasVoted();
  }, [
    hasClaimedAuthor,
    hasClaimedReviewer,
    hasClaimedEditor,
    proposalsEditor,
    address,
    voteEditor,
  ]);

  // This useEffect grabs all the addresses of our members holding our NFT.
  useEffect(() => {
    if (!hasClaimedAuthor && !hasClaimedReviewer && !hasClaimedEditor) {
      return;
    }
    const getAllAddresses = async () => {
      try {
        const authorAddresses =
          await editionDrop.history.getAllClaimerAddresses(0);
        let reviewerAddresses =
          await editionDrop.history.getAllClaimerAddresses(1);
        let editorAddresses = await editionDrop.history.getAllClaimerAddresses(
          2
        );
        setAuthorAddresses(authorAddresses);
        setReviewerAddresses(reviewerAddresses);
        setEditorAddresses(editorAddresses);

        walletAddresses = authorAddresses
          .concat(reviewerAddresses)
          .concat(editorAddresses);
        setWalletAddresses(walletAddresses);

        console.log("Members addresses", walletAddresses);
      } catch (error) {
        console.error("failed to get member list", error);
      }
    };
    getAllAddresses();
  }, [
    hasClaimedAuthor,
    hasClaimedReviewer,
    hasClaimedEditor,
    editionDrop.history,
  ]);

  // This useEffect grabs the # of token each member holds.
  useEffect(() => {
    if (!hasClaimedAuthor && !hasClaimedReviewer && !hasClaimedEditor) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log("Token Amounts", amounts);
      } catch (error) {
        console.error("failed to get member balances", error);
      }
    };
    getAllBalances();
  }, [hasClaimedAuthor, hasClaimedReviewer, hasClaimedEditor, token.history]);

  // isClaiming lets us easily keep a loading state while the NFT is minting.
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    // If they don't have a connected wallet, exit!
    if (!address) {
      return;
    }

    // TODO: Tukaj od Identity Managementa pridobiti addresse od
    //       uporabnikov posameznih vlog in tistim, ki so upraviceni
    //       do tega prikazati moznost, da si lahko mintajo svoje NFT-je
    // Contract addr: 0xF0F6f5697ee93338d2c799bCC622E0BAb41cAa2a

    // balanceOf - tokenId
    // author   - 0
    // reviewer - 1
    // editor   - 2
    const checkAuthorBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedAuthor(true);
          console.log("this user has an author NFT!");
        } else {
          setHasClaimedAuthor(false);
          console.log("this user doesn't have an author NFT.");
        }
      } catch (error) {
        setHasClaimedAuthor(false);
        console.error("Failed to get balance", error);
      }
    };

    const checkReviewerBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 1);
        if (balance.gt(0)) {
          setHasClaimedReviewer(true);
          console.log("this user has a reviewer NFT!");
        } else {
          setHasClaimedReviewer(false);
          console.log("this user doesn't have a reviewer NFT.");
        }
      } catch (error) {
        setHasClaimedReviewer(false);
        console.error("Failed to get balance", error);
      }
    };

    const checkEditorBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 2);
        if (balance.gt(0)) {
          setHasClaimedEditor(true);
          console.log("this user has an editor NFT!");
        } else {
          setHasClaimedEditor(false);
          console.log("this user doesn't have an editor NFT.");
        }
      } catch (error) {
        setHasClaimedEditor(false);
        console.error("Failed to get balance", error);
      }
    };

    checkAuthorBalance();
    checkReviewerBalance();
    checkEditorBalance();
  }, [address, editionDrop]);

  const mintAuthor = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log(
        `Author Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
      );
      setHasClaimedAuthor(true);
    } catch (error) {
      setHasClaimedAuthor(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  const mintReviewer = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("1", 1);
      console.log(
        `Reviewer Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/1`
      );
      setHasClaimedAuthor(true);
    } catch (error) {
      setHasClaimedAuthor(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  const mintEditor = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("2", 1);
      console.log(
        `Editor Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/2`
      );
      setHasClaimedAuthor(true);
    } catch (error) {
      setHasClaimedAuthor(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to Decentralized Journal DAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  // TODO: just frontend - add buttons to render minting NFTs accordingly
  //       (if one user has more than one role)

  const reviewers = reviewerAddresses.map((reviewer) => (
    <li>
      <form>
        {reviewer}
        <button
          disabled={isVoting || hasVoted}
          type="submit"
          className="btn_small"
        >
          {isVoting
            ? "Creating proposal..."
            : hasVoted
            ? "You Already proposed"
            : "Propose revoking"}
        </button>
      </form>
    </li>
  ));

  const editors = editorAddresses.map((editor) => (
    <li>
      <form>
        {editor}
        <button
          disabled={isVoting || hasVoted}
          type="submit"
          className="btn_small"
        >
          Propose revoking
        </button>
      </form>
    </li>
  ));

  const authors = authorAddresses.map((author) => (
    <li>
      <form>
        {author}
        <button
          disabled={isVoting || hasVoted}
          type="submit"
          className="btn_small"
        >
          {isVoting
            ? "Creating proposal..."
            : hasVoted
            ? "You Already proposed"
            : "Nominate for reviewer"}
        </button>
      </form>
    </li>
  ));

  if (hasClaimedAuthor || hasClaimedReviewer || hasClaimedEditor) {
    return (
      <div className="landing">
        <div id="heading">
          <h1>DAO Member Page</h1>
          <p>Congratulations on being a member!</p>
        </div>
        <div id="roles">
          <div>
            <h3>Authors</h3>
            <ul>{authors}</ul>
          </div>
          <div>
            <h3>Reviewers</h3>
            <ul>{reviewers}</ul>
          </div>
          <div>
            <h3>Editors</h3>
            <ul>{editors}</ul>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div id="proposals">
          <h2>Active proposals</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              //before we do async things, we want to disable the button to prevent double clicks
              setIsVoting(true);

              // lets get the votes from the form for the values
              const votes = proposals.map((proposal) => {
                const voteResult = {
                  proposalId: proposal.proposalId,
                  //abstain by default
                  vote: 2,
                };
                proposal.votes.forEach((vote) => {
                  const elem = document.getElementById(
                    proposal.proposalId + "-" + vote.type
                  );

                  if (elem.checked) {
                    voteResult.vote = vote.type;
                    return;
                  }
                });
                return voteResult;
              });

              // delegating tokens
              try {
                // check if tokens still need to be delegated
                const delegation = await token.getDelegationOf(address);
                if (delegation === AddressZero) {
                  await token.delegateTo(address);
                }
                // vote on the proposals
                try {
                  await Promise.all(
                    votes.map(async ({ proposalId, vote: _vote }) => {
                      // check which proposals are open (state = 1)
                      const proposal = await vote.get(proposalId);
                      if (proposal.state === 1) {
                        return vote.vote(proposalId, _vote);
                      }
                      // empty if the proposal is not open
                      return;
                    })
                  );
                  try {
                    // execute proposals that are ready (state = 4)
                    await Promise.all(
                      votes.map(async ({ proposalId }) => {
                        const proposal = await vote.get(proposalId);
                        if (proposal.state === 4) {
                          return vote.execute(proposalId);
                        }
                      })
                    );
                    setHasVoted(true);
                    // and log out a success message
                    console.log("successfully voted");
                  } catch (err) {
                    console.error("failed to execute votes", err);
                  }
                } catch (err) {
                  console.error("failed to vote", err);
                }
              } catch (err) {
                console.error("failed to delegate tokens");
              } finally {
                // in *either* case we need to set the isVoting state to false to enable the button again
                setIsVoting(false);
              }
            }}
          >
            {proposals.map((proposal) => (
              <div key={proposal.proposalId} className="card">
                <h5>{proposal.description}</h5>
                <div>
                  {proposal.votes.map(({ type, label }) => (
                    <div key={type}>
                      <input
                        type="radio"
                        id={proposal.proposalId + "-" + type}
                        name={proposal.proposalId}
                        value={type}
                        //default the "abstain" vote to checked
                        defaultChecked={type === 2}
                      />
                      <label htmlFor={proposal.proposalId + "-" + type}>
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button disabled={isVoting || hasVoted} type="submit">
              {isVoting
                ? "Voting..."
                : hasVoted
                ? "You Already Voted"
                : "Submit Votes"}
            </button>
          </form>
        </div>

        <div id="proposals-editor">
          <h2>Editor elections</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              //before we do async things, we want to disable the button to prevent double clicks
              setIsVotingEditor(true);

              // lets get the votes from the form for the values
              const votesEditor = proposalsEditor.map((proposalEditor) => {
                const voteResult = {
                  proposalId: proposalEditor.proposalId,
                  //abstain by default
                  vote: 2,
                };
                proposalEditor.votes.forEach((vote) => {
                  const elem = document.getElementById(
                    proposalEditor.proposalId + "-" + vote.type
                  );

                  if (elem.checked) {
                    voteResult.vote = vote.type;
                    return;
                  }
                });
                return voteResult;
              });

              // delegating tokens
              try {
                // check if tokens still need to be delegated
                const delegation = await token.getDelegationOf(address);
                if (delegation === AddressZero) {
                  await token.delegateTo(address);
                }
                // vote on the proposals
                try {
                  await Promise.all(
                    votesEditor.map(async ({ proposalId, vote: _vote }) => {
                      // check which proposals are open (state = 1)
                      const proposal = await voteEditor.get(proposalId);
                      if (proposal.state === 1) {
                        return voteEditor.vote(proposalId, _vote);
                      }
                      // empty if the proposal is not open
                      return;
                    })
                  );
                  try {
                    // execute proposals that are ready (state = 4)
                    await Promise.all(
                      votesEditor.map(async ({ proposalId }) => {
                        const proposal = await vote.get(proposalId);
                        if (proposal.state === 4) {
                          return vote.execute(proposalId);
                        }
                      })
                    );
                    setHasVotedEditor(true);
                    // and log out a success message
                    console.log("successfully voted for editor");
                  } catch (err) {
                    console.error("failed to execute votes for editors", err);
                  }
                } catch (err) {
                  console.error("failed to vote editors", err);
                }
              } catch (err) {
                console.error("failed to delegate tokens (editors)");
              } finally {
                // in *either* case we need to set the isVoting state to false to enable the button again
                setIsVoting(false);
              }
            }}
          >
            {proposalsEditor.map((proposal) => (
              <div key={proposal.proposalId} className="card">
                <h5>{proposal.description}</h5>
                <div>
                  {proposal.votes.map(({ type, label }) => (
                    <div key={type}>
                      <input
                        type="radio"
                        id={proposal.proposalId + "-" + type}
                        name={proposal.proposalId}
                        value={type}
                        //default the "abstain" vote to checked
                        defaultChecked={type === 2}
                      />
                      <label htmlFor={proposal.proposalId + "-" + type}>
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button disabled={isVoting || hasVoted} type="submit">
              {isVoting
                ? "Voting..."
                : hasVoted
                ? "You Already Voted"
                : "Submit Votes"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render minting NFTs
  return (
    <div className="landing">
      <h1>Welcome to Decentralized Journal DAO</h1>
      <p>Wallet connected: {address}</p>
      <br></br>
      <br></br>
      <br></br>
      <h2>Mint your free DAO membership NFT (Author)</h2>
      <button disabled={isClaiming} onClick={mintAuthor}>
        {isClaiming ? "Minting..." : "Mint your Author NFT"}
      </button>

      <br></br>
      <br></br>
      <br></br>
      <h2>Mint your free DAO membership NFT (Reviewer)</h2>
      <button disabled={isClaiming} onClick={mintReviewer}>
        {isClaiming ? "Minting..." : "Mint your Reviewer NFT"}
      </button>

      <br></br>
      <br></br>
      <br></br>
      <h2>Mint your free DAO membership NFT (Editor)</h2>
      <button disabled={isClaiming} onClick={mintEditor}>
        {isClaiming ? "Minting..." : "Mint your Editor NFT"}
      </button>
    </div>
  );
};

export default App;
