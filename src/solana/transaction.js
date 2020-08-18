import * as web3 from '@solana/web3.js';

export default {
  async transfer(fromAccount, toPubkey, connection, sol) {
    const transaction = web3.SystemProgram.transfer({
      fromPubkey: fromAccount.publicKey,
      toPubkey,
      lamports: sol * 1000000000,
    });

    let signature = '';
    try {
      signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [fromAccount],
        { confirmations: 1 },
      );
    } catch (err) {
      console.log(err);
      throw new Error('⚠️ Transaction failed ⚠️');
    }
    return signature;
  },
};
