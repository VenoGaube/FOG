import { useAddress, useMetamask, useEditionDrop } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

const App = () => {
  // thirdweb hooks
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("Wallet address:", address);

  // Initialize our editionDrop contract
  const editionDrop = useEditionDrop(
    "0x35A36913339f072F951B3bC2b60C539A6f39D439"
  );
  // State variables for us to know if user has our NFT.
  const [hasClaimedAuthor, setHasClaimedAuthor] = useState(false);
  const [hasClaimedReviewer, setHasClaimedReviewer] = useState(false);
  const [hasClaimedEditor, setHasClaimedEditor] = useState(false);

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
        `Reviewer Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/2`
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

  // TODO: just frontend - add buttons to generate NFTs accordingly

  if (hasClaimedAuthor) {
    return (
      <div className="landing">
        <h1>DAO Member Page</h1>
        <p>Congratulations on being an author!</p>
      </div>
    );
  }

  if (hasClaimedReviewer) {
    return (
      <div className="landing">
        <h1>DAO Member Page</h1>
        <p>Congratulations on being a reviewer!</p>
      </div>
    );
  }

  if (hasClaimedEditor) {
    return (
      <div className="landing">
        <h1>DAO Member Page</h1>
        <p>Congratulations on being a reviewer!</p>
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
