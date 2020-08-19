import PublicKeyUtil from '../../src/solana/publicKey';

test('should return true if public key is valid', () => {
    expect(PublicKeyUtil.isValidPublicKey('GsbwXfJraMomNxBcjYLcG3mxkBUiyWXAB32fGbSMQRdW')).toBe(true);
})

test.each([[5.343], ["dksdkas"], [null], [undefined]])('should return false if public key is invalid', (invalidPublicKey) => {
    expect(PublicKeyUtil.isValidPublicKey(invalidPublicKey)).toBe(false);
})
