import { Token } from '@sushiswap/currency';
export interface PoolResponse2 {
    type: string;
    address: string;
    twapEnabled: boolean;
    swapFee: number;
    liquidityUSD: string;
    isWhitelisted: true;
    token0: {
        symbol: string;
        address: string;
        status: string;
        id: string;
        name: string;
        decimals: number;
        isFeeOnTransfer: boolean;
        isCommon: boolean;
    };
    token1: {
        symbol: string;
        address: string;
        status: string;
        id: string;
        name: string;
        decimals: number;
        isFeeOnTransfer: boolean;
        isCommon: boolean;
    };
}
export declare function filterOnDemandPools(pools: PoolResponse2[], token0Address: string, token1Address: string, topPoolAddresses: string[], size: number): PoolResponse2[];
export declare function filterTopPools(pools: PoolResponse2[], size: number): PoolResponse2[];
export declare function mapToken(chainId: number, { address, decimals, symbol, name, }: {
    address: string;
    decimals: number;
    symbol: string;
    name: string;
}): Token;