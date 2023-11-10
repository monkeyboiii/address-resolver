import { HardhatUserConfig } from "hardhat/types";

import "../../src";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defaultNetwork: "mainnet",
  addressResolver: {
    assets: ["assets/empty.json", "assets/empty.json", "another.json"],
  },
};

export default config;
