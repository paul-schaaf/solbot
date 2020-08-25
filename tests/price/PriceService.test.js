import PriceAPI from "../../src/price/priceAPI";
import PriceService from "../../src/price/PriceService";

jest.mock('../../src/price/priceAPI', () => ({
    getSolPriceInUSD: jest.fn(() => 1.113)
}));

describe('convert lamports to SOL', () => {
    test('convert lamports to SOL (decimals === zeros)', () => {
        expect(PriceService.convertLamportsToSol(5000000000000)).toBe("5000.0000");
    });

    test('convert lamports to SOL (decimals === not zeroes and additional decimals should be cut off)', () => {
        expect(PriceService.convertLamportsToSol(5321983523000)).toBe("5321.9835");
    });
});

describe('get dollar value for SOL', () => {
    test('should not call priceAPI in case a price is provided with the correct dollar value being returned', async () => {
        const dollarValue = await PriceService.getDollarValueForSol(5,1.17);
        expect(PriceAPI.getSolPriceInUSD).not.toHaveBeenCalled();
        expect(dollarValue).toBe("5.85");
    });

    test('should call priceAPI in case a price is provided with the correct dollar value being returned', async() => {
        const dollarValue = await PriceService.getDollarValueForSol(6);
        expect(dollarValue).toBe("6.68");
    })
});
