import React, { useEffect } from "react";
import { IntravisionChainInfo } from "./constants";
import { Balances } from "./types/balance";
import { Dec } from "@keplr-wallet/unit";
import { api } from "./util/api";

import "./styles/container.css";
import "./styles/button.css";
import "./styles/item.css";

function App() {
  const [address, setAddress] = React.useState<string>("");
  const [balance, setBalance] = React.useState<string>("");
  const [_, setKeplrEip6963ProviderInfo] =
    React.useState<any>();

  useEffect(() => {
    window.addEventListener("eip6963:announceProvider", (e) => {
      const event = e as CustomEvent;
      if (event.detail.info.rdns === "app.keplr") {
        setKeplrEip6963ProviderInfo(event.detail.info);
      }
    });

    window.dispatchEvent(new Event("eip6963:requestProvider"));
    //init();
  }, []);

  const init = async () => {
    const keplr = window.keplr;
    if (keplr) {
      try {
        await keplr.experimentalSuggestChain(IntravisionChainInfo);
        if (!keplr.ethereum?.isConnected()) {
          await keplr.ethereum?.enable();
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    }
  };

  const getKeyFromKeplr = async () => {
    const key = await window.keplr?.getKey(IntravisionChainInfo.chainId);
    if (key) {
      setAddress(key.bech32Address);
    }
  };

  const getBalance = async () => {
    const key = await window.keplr?.getKey(IntravisionChainInfo.chainId);

    if (key) {
      const uri = `${IntravisionChainInfo.rest}/cosmos/bank/v1beta1/balances/${key.bech32Address}?pagination.limit=1000`;

      const data = await api<Balances>(uri);
      const balance = data.balances.find(
        (balance) => balance.denom === "stake"
      );
      const osmoDecimal = IntravisionChainInfo.currencies.find(
        (currency) => currency.coinMinimalDenom === "stake"
      )?.coinDecimals;

      if (balance) {
        const amount = new Dec(balance.amount, osmoDecimal);
        setBalance(`${amount.toString(osmoDecimal)} stake`);
      } else {
        setBalance(`0 stake`);
      }
    }
  };

  return (
    <div className="root-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <img
          src="/keplr-logo.png"
          style={{ maxWidth: "200px" }}
          alt="keplr-logo"
        />
      </div>

      <h2 style={{ marginTop: "30px" }}>
        Request to Intravision Testnet via Keplr Provider
      </h2>

<div className="item-container">
        <div className="item">
          <div className="item-title">Connect Wallet</div>

          <div className="item-content">
            <div>
              <button className="keplr-button" onClick={init}>
                Connect Keplr Wallet
              </button>
            </div>
          </div>
        </div>
  </div>

      <div className="item-container">
        <div className="item">
          <div className="item-title">Get Intravision Address</div>

          <div className="item-content">
            <div>
              <button className="keplr-button" onClick={getKeyFromKeplr}>
                Get Address
              </button>
            </div>
            <div>Address: {address}</div>
          </div>
        </div>

        <div className="item">
          <div className="item-title">Get OSMO Balance</div>

          <div className="item-content">
            <button className="keplr-button" onClick={getBalance}>
              Get Balance
            </button>

            <div>Balance: {balance}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
