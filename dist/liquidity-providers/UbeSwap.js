"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbeSwapProvider = void 0;
var chain_1 = require("@sushiswap/chain");
var LiquidityProvider_1 = require("./LiquidityProvider");
var UniswapV2Base_1 = require("./UniswapV2Base");
var UbeSwapProvider = /** @class */ (function (_super) {
    var _a, _b;
    __extends(UbeSwapProvider, _super);
    function UbeSwapProvider(chainId, web3Client, databaseClient) {
        var factory = (_a = {},
            _a[chain_1.ChainId.CELO] = '0x62d5b84bE28a183aBB507E125B384122D2C25fAE',
            _a);
        var initCodeHash = (_b = {},
            _b[chain_1.ChainId.CELO] = '0xb3b8ff62960acea3a88039ebcf80699f15786f1b17cebd82802f7375827a339c',
            _b);
        return _super.call(this, chainId, web3Client, factory, initCodeHash, databaseClient) || this;
    }
    UbeSwapProvider.prototype.getType = function () {
        return LiquidityProvider_1.LiquidityProviders.UbeSwap;
    };
    UbeSwapProvider.prototype.getPoolProviderName = function () {
        return 'UbeSwap';
    };
    return UbeSwapProvider;
}(UniswapV2Base_1.UniswapV2BaseProvider));
exports.UbeSwapProvider = UbeSwapProvider;
//# sourceMappingURL=UbeSwap.js.map