import { ChainId } from '@sushiswap/chain';
import { PrismaClient } from '@sushiswap/database';
import { PublicClient } from 'viem';
import { LiquidityProviders } from './LiquidityProvider';
import { UniswapV2BaseProvider } from './UniswapV2Base';
export declare class JetSwapProvider extends UniswapV2BaseProvider {
    constructor(chainId: ChainId, web3Client: PublicClient, databaseClient?: PrismaClient);
    getType(): LiquidityProviders;
    getPoolProviderName(): string;
}
//# sourceMappingURL=JetSwap.d.ts.map