const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const src = fs.readFileSync(inboxPath, 'utf8')
const input = {
    language: 'Solidity',
    sources: {
      'Inbox.sol': {
        content: src,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };
//compiling solidity. also specify the number of contracts you wish to compile.\
//here we are compiling only 1
//console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts);
//we accessed the map like this because we compiled only one contract.
//this produces bytecode and interface or abi that interface with javascript
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
  ].Inbox;