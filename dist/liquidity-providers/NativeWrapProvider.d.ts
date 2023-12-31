import type { ChainId } from 'sushi/chain';
import { PublicClient } from 'viem';
import type { PoolCode } from '../pools/PoolCode';
import { LiquidityProvider, LiquidityProviders } from './LiquidityProvider';
export declare class NativeWrapProvider extends LiquidityProvider {
    poolCodes: PoolCode[];
    constructor(chainId: ChainId, client: PublicClient);
    getType(): LiquidityProviders;
    getPoolProviderName(): string;
    startFetchPoolsData(): void;
    fetchPoolsForToken(): Promise<void>;
    getCurrentPoolList(): PoolCode[];
    stopFetchPoolsData(): void;
}
