import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Import thirdweb provider and Rinkeby ChainId
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const activeChainId = ChainId.Rinkeby;

// thirdweb provider wrapper
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={activeChainId}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
