const BlockClass = require('./block.js');
const validate = require('./validate');

create_genesis('creates the genesis block', () => {
    let block = new BlockClass.Block({data: 'Genesis Block'});
    await this._addBlock(block);

    expect(BlockClass.body.toBe('Genesis Block'));
})
