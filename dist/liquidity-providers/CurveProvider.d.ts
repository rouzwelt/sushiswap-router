import { Token, Type } from 'sushi/currency';
import { Address } from 'viem';
import { PoolCode } from '../pools/PoolCode';
import { LiquidityProvider, LiquidityProviders } from './LiquidityProvider';
export declare const sETH: Token;
export declare enum CurvePoolType {
    Legacy = "Legacy",
    LegacyV2 = "LegacyV2",
    LegacyV3 = "LegacyV3",
    Factory = "Factory"
}
export declare const CURVE_NON_FACTORY_POOLS: Record<number, [
    Address,
    CurvePoolType,
    Type,
    Type
][]>;
export declare const CURVE_FACTORY_ADDRESSES: Record<number, `0x${string}`[]>;
export declare class CurveProvider extends LiquidityProvider {
    foundPools: PoolCode[];
    getType(): LiquidityProviders;
    /**
     * The name of liquidity provider to be used for pool naming. For example, 'SushiSwap'
     */
    getPoolProviderName(): string;
    /**
     * Initiates event listeners for top pools
     */
    startFetchPoolsData(): void;
    getPoolsForTokens(t0: Token, t1: Token, excludePools?: Set<string>, options?: {
        blockNumber?: bigint;
        memoize?: boolean;
    }): Promise<Map<Address, [CurvePoolType, Type, Type]>>;
    getPoolRatio(pools: [string, [CurvePoolType, Type, Type]][], options?: {
        blockNumber?: bigint;
        memoize?: boolean;
    }): Promise<(number | undefined)[]>;
    getCurvePoolCodes(pools: Map<Address, [CurvePoolType, Type, Type]>, options?: {
        blockNumber?: bigint;
        memoize?: boolean;
    }): Promise<PoolCode[]>;
    /**
     * Fetches relevant pools for the given tokens
     * @param t0 Token
     * @param t1 Token
     */
    fetchPoolsForToken(t0: Token, t1: Token, excludePools?: Set<string>, options?: {
        blockNumber?: bigint;
        memoize?: boolean;
    }): Promise<void>;
    /**
     * Returns a list of PoolCode
     * @returns PoolCode[]
     */
    getCurrentPoolList(): PoolCode[];
    stopFetchPoolsData(): void;
}
