export const IntravisionChainInfo = {
  // Chain-id of the Osmosis cha{
    chainId: "example",
    chainName: "hypersign-localnet",
    rpc: "http://0.0.0.0:26657",
    rest: "http://0.0.0.0:1317",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmos" + "pub",
        bech32PrefixValAddr: "cosmos" + "valoper",
        bech32PrefixValPub: "cosmos" + "valoperpub",
        bech32PrefixConsAddr: "cosmos" + "valcons",
        bech32PrefixConsPub: "cosmos" + "valconspub",
    },
    currencies: [ 
        { 
            coinDenom: "stake", 
            coinMinimalDenom: "stake", 
            coinDecimals: 6, 
            coinGeckoId: "hypersign-identity-token", 
        }, 
    ],
    feeCurrencies: [
        {
            coinDenom: "token",
            coinMinimalDenom: "token",
            coinDecimals: 6,
            coinGeckoId: "hypersign-identity-token",
            gasPriceStep: {
                low: 0.01,
                average: 0.025,
                high: 0.04,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: "stake",
        coinMinimalDenom: "stake",
        coinDecimals: 6,
        coinGeckoId: "hypersign-identity-token",
    },
    features: ["ibc-go"]
}
