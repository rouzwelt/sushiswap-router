"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_sdk_1 = require("@sushiswap/base-sdk");
var chain_1 = require("@sushiswap/chain");
var currency_1 = require("@sushiswap/currency");
var __1 = require("..");
var computeTridentConstantPoolAddress_1 = require("./computeTridentConstantPoolAddress");
var TridentConstantPool_1 = require("./TridentConstantPool");
describe('computePoolAddress', function () {
    it('should correctly compute the pool address', function () {
        var tokenA = new currency_1.Token({
            chainId: chain_1.ChainId.OPTIMISM,
            address: currency_1.USDC_ADDRESS[chain_1.ChainId.OPTIMISM],
            decimals: 6,
            symbol: 'USDC',
            name: 'USD Coin',
        });
        var tokenB = new currency_1.Token({
            chainId: chain_1.ChainId.OPTIMISM,
            address: currency_1.WETH9_ADDRESS[chain_1.ChainId.OPTIMISM],
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
        });
        expect(tokenA.address).toEqual(currency_1.USDC_ADDRESS[chain_1.ChainId.OPTIMISM]);
        expect(tokenB.address).toEqual(currency_1.WETH9_ADDRESS[chain_1.ChainId.OPTIMISM]);
        var fee = 30;
        var twap = true;
        var address = (0, computeTridentConstantPoolAddress_1.computeTridentConstantPoolAddress)({
            factoryAddress: __1.tridentConstantPoolFactoryAddress[chain_1.ChainId.OPTIMISM],
            tokenA: tokenA,
            tokenB: tokenB,
            fee: fee,
            twap: twap,
        });
        expect(address).toEqual('0x3A7bA3048fb3287051F6CB3dF64233F13558132C');
    });
});
describe('TridentConstantPool', function () {
    var USDC = new currency_1.Token({
        chainId: chain_1.ChainId.OPTIMISM,
        address: currency_1.USDC_ADDRESS[chain_1.ChainId.OPTIMISM],
        decimals: 6,
        symbol: 'USDC',
        name: 'USD Coin',
    });
    var DAI = new currency_1.Token({
        chainId: chain_1.ChainId.OPTIMISM,
        address: currency_1.WETH9_ADDRESS[chain_1.ChainId.OPTIMISM],
        decimals: 18,
        symbol: 'WETH',
        name: 'Wrapped Ether',
    });
    describe('constructor', function () {
        it('cannot be used for tokens on different chains', function () {
            expect(function () {
                return new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '100'), currency_1.Amount.fromRawAmount(currency_1.WETH9[3], '100'), 30, true);
            }).toThrow('CHAIN_IDS');
        });
    });
    describe('#getAddress', function () {
        it.skip('returns the correct address', function () {
            expect(TridentConstantPool_1.TridentConstantPool.getAddress(USDC, DAI, 30, true)).toEqual('0x614e51758495824A9D1aaA66192151e69E9c4ca6');
        });
    });
    describe('#token0', function () {
        it('always is the token that sorts before', function () {
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '100'), currency_1.Amount.fromRawAmount(DAI, '100'), 30, true).token0).toEqual(DAI);
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(DAI, '100'), currency_1.Amount.fromRawAmount(USDC, '100'), 30, true).token0).toEqual(DAI);
        });
    });
    describe('#token1', function () {
        it('always is the token that sorts after', function () {
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '100'), currency_1.Amount.fromRawAmount(DAI, '100'), 30, true).token1).toEqual(USDC);
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(DAI, '100'), currency_1.Amount.fromRawAmount(USDC, '100'), 30, true).token1).toEqual(USDC);
        });
    });
    describe('#reserve0', function () {
        it('always comes from the token that sorts before', function () {
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '100'), currency_1.Amount.fromRawAmount(DAI, '101'), 30, true).reserve0).toEqual(currency_1.Amount.fromRawAmount(DAI, '101'));
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(DAI, '101'), currency_1.Amount.fromRawAmount(USDC, '100'), 30, true).reserve0).toEqual(currency_1.Amount.fromRawAmount(DAI, '101'));
        });
    });
    describe('#reserve1', function () {
        it('always comes from the token that sorts after', function () {
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '100'), currency_1.Amount.fromRawAmount(DAI, '101'), 30, true).reserve1).toEqual(currency_1.Amount.fromRawAmount(USDC, '100'));
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(DAI, '101'), currency_1.Amount.fromRawAmount(USDC, '100'), 30, true).reserve1).toEqual(currency_1.Amount.fromRawAmount(USDC, '100'));
        });
    });
    describe('#token0Price', function () {
        it('returns price of token0 in terms of token1', function () {
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '101'), currency_1.Amount.fromRawAmount(DAI, '100'), 30, true)
                .token0Price).toEqual(new currency_1.Price(DAI, USDC, '100', '101'));
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(DAI, '100'), currency_1.Amount.fromRawAmount(USDC, '101'), 30, true)
                .token0Price).toEqual(new currency_1.Price(DAI, USDC, '100', '101'));
        });
    });
    describe('#token1Price', function () {
        it('returns price of token1 in terms of token0', function () {
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '101'), currency_1.Amount.fromRawAmount(DAI, '100'), 30, true)
                .token1Price).toEqual(new currency_1.Price(USDC, DAI, '101', '100'));
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(DAI, '100'), currency_1.Amount.fromRawAmount(USDC, '101'), 30, true)
                .token1Price).toEqual(new currency_1.Price(USDC, DAI, '101', '100'));
        });
    });
    describe('#priceOf', function () {
        var pair = new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '101'), currency_1.Amount.fromRawAmount(DAI, '100'), 30, true);
        it('returns price of token in terms of other token', function () {
            expect(pair.priceOf(DAI)).toEqual(pair.token0Price);
            expect(pair.priceOf(USDC)).toEqual(pair.token1Price);
        });
        it('throws if invalid token', function () {
            expect(function () { return pair.priceOf(currency_1.WETH9[1]); }).toThrow('TOKEN');
        });
    });
    describe('#reserveOf', function () {
        it('returns reserves of the given token', function () {
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '100'), currency_1.Amount.fromRawAmount(DAI, '101'), 30, true).reserveOf(USDC)).toEqual(currency_1.Amount.fromRawAmount(USDC, '100'));
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(DAI, '101'), currency_1.Amount.fromRawAmount(USDC, '100'), 30, true).reserveOf(USDC)).toEqual(currency_1.Amount.fromRawAmount(USDC, '100'));
        });
        it('throws if not in the pair', function () {
            expect(function () {
                return new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(DAI, '101'), currency_1.Amount.fromRawAmount(USDC, '100'), 30, true).reserveOf(currency_1.WETH9[1]);
            }).toThrow('TOKEN');
        });
    });
    describe('#chainId', function () {
        it('returns the token0 chainId', function () {
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '100'), currency_1.Amount.fromRawAmount(DAI, '100'), 30, true).chainId).toEqual(10);
            expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(DAI, '100'), currency_1.Amount.fromRawAmount(USDC, '100'), 30, true).chainId).toEqual(10);
        });
    });
    describe('#involvesToken', function () {
        expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '100'), currency_1.Amount.fromRawAmount(DAI, '100'), 30, true).involvesToken(USDC)).toEqual(true);
        expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '100'), currency_1.Amount.fromRawAmount(DAI, '100'), 30, true).involvesToken(DAI)).toEqual(true);
        expect(new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(USDC, '100'), currency_1.Amount.fromRawAmount(DAI, '100'), 30, true).involvesToken(currency_1.WETH9[1])).toEqual(false);
    });
    describe('miscellaneous', function () {
        it('getLiquidityMinted:0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenA, tokenB, pool, liquidity;
            return __generator(this, function (_a) {
                tokenA = new currency_1.Token({
                    chainId: chain_1.ChainId.OPTIMISM,
                    address: '0x0000000000000000000000000000000000000001',
                    decimals: 18,
                });
                tokenB = new currency_1.Token({
                    chainId: chain_1.ChainId.OPTIMISM,
                    address: '0x0000000000000000000000000000000000000002',
                    decimals: 18,
                });
                pool = new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(tokenA, '0'), currency_1.Amount.fromRawAmount(tokenB, '0'), 30, true);
                expect(function () {
                    pool.getLiquidityMinted(currency_1.Amount.fromRawAmount(pool.liquidityToken, '0'), currency_1.Amount.fromRawAmount(tokenA, '1000'), currency_1.Amount.fromRawAmount(tokenB, '1000'));
                }).toThrow(base_sdk_1.InsufficientInputAmountError);
                expect(function () {
                    pool.getLiquidityMinted(currency_1.Amount.fromRawAmount(pool.liquidityToken, '0'), currency_1.Amount.fromRawAmount(tokenA, '1000000'), currency_1.Amount.fromRawAmount(tokenB, '1'));
                }).toThrow(base_sdk_1.InsufficientInputAmountError);
                liquidity = pool.getLiquidityMinted(currency_1.Amount.fromRawAmount(pool.liquidityToken, '0'), currency_1.Amount.fromRawAmount(tokenA, '1001'), currency_1.Amount.fromRawAmount(tokenB, '1001'));
                expect(liquidity.quotient.toString()).toEqual('1');
                return [2 /*return*/];
            });
        }); });
        it('getLiquidityMinted:!0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenA, tokenB, pool;
            return __generator(this, function (_a) {
                tokenA = new currency_1.Token({
                    chainId: chain_1.ChainId.OPTIMISM,
                    address: '0x0000000000000000000000000000000000000001',
                    decimals: 18,
                });
                tokenB = new currency_1.Token({
                    chainId: chain_1.ChainId.OPTIMISM,
                    address: '0x0000000000000000000000000000000000000002',
                    decimals: 18,
                });
                pool = new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(tokenA, '10000'), currency_1.Amount.fromRawAmount(tokenB, '10000'), 30, true);
                expect(pool
                    .getLiquidityMinted(currency_1.Amount.fromRawAmount(pool.liquidityToken, '10000'), currency_1.Amount.fromRawAmount(tokenA, '2000'), currency_1.Amount.fromRawAmount(tokenB, '2000'))
                    .quotient.toString()).toEqual('2000');
                return [2 /*return*/];
            });
        }); });
        it('getLiquidityValue', function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenA, tokenB, pair, liquidityValue, liquidityValue, liquidityValue;
            return __generator(this, function (_a) {
                tokenA = new currency_1.Token({
                    chainId: chain_1.ChainId.OPTIMISM,
                    address: '0x0000000000000000000000000000000000000001',
                    decimals: 18,
                });
                tokenB = new currency_1.Token({
                    chainId: chain_1.ChainId.OPTIMISM,
                    address: '0x0000000000000000000000000000000000000002',
                    decimals: 18,
                });
                pair = new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(tokenA, '1000'), currency_1.Amount.fromRawAmount(tokenB, '1000'), 30, true);
                {
                    liquidityValue = pair.getLiquidityValue(tokenA, currency_1.Amount.fromRawAmount(pair.liquidityToken, '1000'), currency_1.Amount.fromRawAmount(pair.liquidityToken, '1000'));
                    expect(liquidityValue.currency.equals(tokenA)).toBe(true);
                    expect(liquidityValue.quotient.toString()).toBe('1000');
                }
                // 500
                {
                    liquidityValue = pair.getLiquidityValue(tokenA, currency_1.Amount.fromRawAmount(pair.liquidityToken, '1000'), currency_1.Amount.fromRawAmount(pair.liquidityToken, '500'));
                    expect(liquidityValue.currency.equals(tokenA)).toBe(true);
                    expect(liquidityValue.quotient.toString()).toBe('500');
                }
                // tokenB
                {
                    liquidityValue = pair.getLiquidityValue(tokenB, currency_1.Amount.fromRawAmount(pair.liquidityToken, '1000'), currency_1.Amount.fromRawAmount(pair.liquidityToken, '1000'));
                    expect(liquidityValue.currency.equals(tokenB)).toBe(true);
                    expect(liquidityValue.quotient.toString()).toBe('1000');
                }
                return [2 /*return*/];
            });
        }); });
        it('getLiquidityValueSingleToken', function () {
            var tokenA = new currency_1.Token({
                chainId: chain_1.ChainId.OPTIMISM,
                address: '0x0000000000000000000000000000000000000001',
                decimals: 6,
            });
            var tokenB = new currency_1.Token({
                chainId: chain_1.ChainId.OPTIMISM,
                address: '0x0000000000000000000000000000000000000002',
                decimals: 18,
            });
            var pair = new TridentConstantPool_1.TridentConstantPool(currency_1.Amount.fromRawAmount(tokenA, '1000'), currency_1.Amount.fromRawAmount(tokenB, '1000'), 30, true);
            {
                var liquidityValue = pair.getLiquidityValueSingleToken(tokenB, currency_1.Amount.fromRawAmount(pair.liquidityToken, '1000'), currency_1.Amount.fromRawAmount(pair.liquidityToken, '500'));
                expect(liquidityValue.currency.equals(tokenB)).toBe(true);
                expect(liquidityValue.quotient.toString()).toBe('749');
            }
            // const pair = new TridentConstantPool(
            //   CurrencyAmount.fromRawAmount(tokenA, '18877425'),
            //   CurrencyAmount.fromRawAmount(tokenB, '1553748331383265154')
            // )
            // {
            //   const liquidityValue = pair.getLiquidityValueSingleToken(
            //     tokenA,
            //     CurrencyAmount.fromRawAmount(pair.liquidityToken, '5295740579331'),
            //     CurrencyAmount.fromRawAmount(pair.liquidityToken, '1003705801313')
            //   )
            //   expect(liquidityValue.currency.equals(tokenA)).toBe(true)
            //   expect(liquidityValue.quotient.toString()).toBe('6470535')
            // }
        });
    });
});
//# sourceMappingURL=TridentConstantPool.test.js.map