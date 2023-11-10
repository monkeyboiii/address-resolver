import fs from "fs";
import { Token } from "@uniswap/sdk-core";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { AddressMapping, UniswapToken } from "./base";

function initPropertyIfNeeded(
    mapping: Record<string, unknown>,
    property: string
) {
    if (!Object.prototype.hasOwnProperty.call(mapping, property)) {
        mapping[property] = {};
    }
}

export class AddressResolver {
    hre: HardhatRuntimeEnvironment;
    mapping: AddressMapping | undefined;

    public constructor(_hre: HardhatRuntimeEnvironment) {
        this.hre = _hre;

        const _assets: Array<string> = this.hre.config.addressResolver.assets;
        try {
            for (const i in _assets) {
                const fileContent = fs.readFileSync(_assets[i], "utf-8");
                const addressMapping = JSON.parse(
                    fileContent
                ) as AddressMapping;
                // first time init
                if (this.mapping === undefined) {
                    this.mapping = addressMapping;
                    continue;
                }
                // rest assign at deepest level
                for (const projectOrCategory in addressMapping) {
                    initPropertyIfNeeded(this.mapping, projectOrCategory);
                    for (const network in addressMapping[projectOrCategory]) {
                        initPropertyIfNeeded(
                            this.mapping[projectOrCategory],
                            network
                        );
                        for (const symbol in addressMapping[projectOrCategory][
                            network
                        ]) {
                            initPropertyIfNeeded(
                                this.mapping[projectOrCategory][network],
                                symbol
                            );
                            Object.assign(
                                this.mapping[projectOrCategory][network][
                                    symbol
                                ],
                                addressMapping[projectOrCategory][network][
                                    symbol
                                ]
                            );
                        }
                    }
                }
            }
        } catch (error) {
            process.exitCode = 1;
            console.error("AddressResolver: error parsing JSON file:", error);
            process.exit();
        }
    }

    private _resolve(
        projectOrCategory: string,
        network: string,
        nameOrSymbol: string
    ): string | UniswapToken {
        if (this.mapping === undefined) {
            throw new Error("AddressResolver: mapping undefined");
        }
        if (
            !Object.prototype.hasOwnProperty.call(
                this.mapping,
                projectOrCategory
            )
        ) {
            throw new Error(
                `AddressResolver: invalid project or category ${projectOrCategory}`
            );
        }
        if (
            !Object.prototype.hasOwnProperty.call(
                this.mapping[projectOrCategory],
                network
            )
        ) {
            throw new Error(`AddressResolver: invalid network ${network}`);
        }
        if (
            !Object.prototype.hasOwnProperty.call(
                this.mapping[projectOrCategory][network],
                nameOrSymbol
            )
        ) {
            throw new Error(
                `AddressResolver: invalid name or symbol in info ${nameOrSymbol}`
            );
        }
        return this.mapping[projectOrCategory][network][nameOrSymbol];
    }

    private _network() {
        return this.hre.config.defaultNetwork.toLowerCase();
    }

    /**
     * Resolve project and name to an address.
     */
    public resolveProjectName(project: string, name: string): string {
        return this._resolve(project, this._network(), name) as string;
    }

    /**
     * Resolve project and name on certain network to an address.
     */
    public resolveProjectNetworkName(
        project: string,
        network: string,
        name: string
    ): string {
        return this._resolve(project, network.toLowerCase(), name) as string;
    }

    /**
     * Resolve symbol to a Token.
     * @param symbol The tick symbol normally used.
     * @returns Token.
     */
    public getTokenBySymbol(symbol: string): Token {
        const token: UniswapToken = this._resolve(
            "token",
            this._network(),
            symbol.toUpperCase()
        ) as UniswapToken;

        return new Token(
            token.chainId,
            token.address,
            token.decimals,
            token.symbol,
            token.name
        );
    }
}
