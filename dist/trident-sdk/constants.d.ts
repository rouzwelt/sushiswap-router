import { ChainId } from '@sushiswap/chain';
export declare const TRIDENT_STABLE_POOL_FACTORY_ADDRESS: {
    readonly 1088: "0x2f686751b19a9d91cc3d57d90150Bc767f050066";
    readonly 2222: "0x9B3fF703FA9C8B467F5886d7b61E61ba07a9b51c";
    readonly 137: "0x2A0Caa28331bC6a18FF195f06694f90671dE70f2";
    readonly 10: "0x827179dD56d07A7eeA32e3873493835da2866976";
    readonly 199: "0x120140d0c1EBC938befc84840575EcDc5fE55aFe";
    readonly 42161: "0xc2fB256ABa36852DCcEA92181eC6b355f09A0288";
    readonly 43114: "0x7770978eED668a3ba661d51a773d3a992Fc9DDCB";
    readonly 56: "0xA4C0363edD74F55AC8f316a3Bf447F8aa09607D3";
};
export declare const TRIDENT_CONSTANT_POOL_FACTORY_ADDRESS: {
    readonly 10: "0x93395129bd3fcf49d95730D3C2737c17990fF328";
    readonly 137: "0x28890e3C0aA9B4b48b1a716f46C9abc9B12abfab";
    readonly 1088: "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
    readonly 2222: "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F";
    readonly 199: "0x752Dc00ABa9c930c84aC81D288dB5E2a02Afe633";
    readonly 42161: "0xc79Ae87E9f55761c08e346B98dDdf070C9872787";
    readonly 43114: "0xb84a043bc4fCA97B7a74eD7dAaB1Bf12A8DF929F";
    readonly 56: "0x3D2f8ae0344d38525d2AE96Ab750B83480c0844F";
};
export declare const TRIDENT_SUPPORTED_CHAIN_IDS: (137 | 56 | 42161 | 43114 | 10 | 2222 | 1088 | 199)[];
export declare const TridentChainIds: (137 | 56 | 42161 | 43114 | 10 | 2222 | 1088 | 199)[];
export type TridentChainId = (typeof TRIDENT_SUPPORTED_CHAIN_IDS)[number];
export declare const isTridentChainId: (chainId: ChainId) => chainId is 137 | 56 | 42161 | 43114 | 10 | 2222 | 1088 | 199;
//# sourceMappingURL=constants.d.ts.map