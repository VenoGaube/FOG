import { useAddress, useMetamask } from "@thirdweb-dev/react";

const App = () => {
  // thirdweb hooks
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("Wallet address:", address);

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

  return (
    <div className="landing">
      <p>Wallet connected: {address}</p>
    </div>
  );
};

export default App;
