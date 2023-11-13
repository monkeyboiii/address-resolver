import { extendConfig, extendEnvironment } from "hardhat/config";
import { lazyObject } from "hardhat/plugins";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import path from "path";

import { AddressResolver } from "./AddressResolver";
import "./type-extensions";

extendConfig(
    (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
        const userPaths = userConfig.addressResolver?.assets;
        const override: boolean = userConfig.addressResolver?.override ?? false;
        const assets: Array<string> = [];

        if (userPaths === undefined && override) {
            throw new Error(
                "extendConfig: cannot override addressResolver with empty assets"
            );
        }
        if (!override) {
            // preloaded with this plugin
            assets.push(path.resolve(__dirname, "../assets/addresses.json"));
        }
        if (userPaths !== undefined) {
            for (const i in userPaths) {
                if (path.isAbsolute(userPaths[i])) {
                    assets.push(userPaths[i]);
                } else {
                    assets.push(
                        path.normalize(
                            path.join(config.paths.root, userPaths[i])
                        )
                    );
                }
            }
        }

        config.addressResolver = {
            assets: assets,
        };
    }
);

extendEnvironment((hre) => {
    hre.addressResolver = lazyObject(() => new AddressResolver(hre));
});
