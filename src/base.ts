import { ChainId } from "@uniswap/sdk-core";

export type UniswapToken = {
    chainId: ChainId;
    address: string;
    decimals: number;
    symbol?: string;
    name?: string;
};

type Info = Record<string, string | UniswapToken>;

type Network = Record<string, Info>;

export const ReservedCategory: Array<string> = [
    "token",
    // TODO:
    "ERC20",
    "ERC721",
    "ERC1155",
];

/**
 *  @type Mapping of [Project/Category] -> [Network] -> (Info)
 */
export type AddressMapping = Record<string, Network>;
