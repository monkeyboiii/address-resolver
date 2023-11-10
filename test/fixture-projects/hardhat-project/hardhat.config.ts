import { HardhatUserConfig } from "hardhat/types";

import "../../../src";

const config: HardhatUserConfig = {
    solidity: "0.8.20",
    defaultNetwork: "mainnet",
    networks: {
        mainnet: {
            url: "dummy",
        },
    },
    addressResolver: {
        assets: [
            "../assets/empty.json",
            "../assets/sample.json",
            "another.json",
        ],
    },
};

export default config;
