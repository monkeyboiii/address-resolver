import "hardhat/types/runtime";
import "hardhat/types/config";

import { AddressResolver } from "./AddressResolver";

declare module "hardhat/types/config" {
    export interface HardhatUserConfig {
        addressResolver?: {
            assets?: Array<string>;
            override?: boolean;
        };
    }

    export interface HardhatConfig {
        addressResolver: {
            assets: Array<string>;
        };
    }
}

declare module "hardhat/types/runtime" {
    export interface HardhatRuntimeEnvironment {
        addressResolver: AddressResolver;
    }
}
