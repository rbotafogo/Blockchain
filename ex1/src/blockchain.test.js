const hex2ascii = require('hex2ascii');
const BlockchainClass = require('./blockchain.js');

test('creates the genesis block', async () => {
    let blockChain = new BlockchainClass.Blockchain();
    let block0 = await blockChain.getBlockByHeight(0);
    let body = JSON.parse(hex2ascii(block0.body));
    expect(body.data).toBe("Genesis Block");
    expect(block0.height).toBe(0);
    expect(block0.previousBlockHash).toBe(null);
})

test('tamper with block and get caught', async () => {
    let blockChain = new BlockchainClass.Blockchain();
    let block0 = await blockChain.getBlockByHeight(0);
    block0.body = Buffer.from(JSON.stringify("You've been hacked")).toString('hex');
    return block0.validate().catch(e => expect(e).toMatch('Block has been tampered with... hashes do not match'));
})

test('get verification message', async () => {
    let blockChain = new BlockchainClass.Blockchain();
    let verification_message = await blockChain.requestMessageOwnershipVerification("12345678");
    expect(verification_message.slice(0, 8)).toBe('12345678');
    console.log(verification_message);
})

test('submit star', async () => {
    let blockChain = new BlockchainClass.Blockchain();
    let verification_message = await blockChain.requestMessageOwnershipVerification("12345678");
})
