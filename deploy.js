const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { abi, evm } = require('./compile')

//first param is the account memonic
//second param the link to the testnet or mainnet we want to deploy our contract to.
const provider = new HDWalletProvider(
   'table multiply tree blood base knife keen sea police shield furnace wise',
   'https://rinkeby.infura.io/v3/5578c5c4478d4d9c881d66f32522df88'
)

//this instance of web3 here is completely for the rinkeby network
const web3 = new Web3(provider)

const deploy = async () => {
    //remeber our memeonic can be used to generate multiple accounts, so we are just using the first one
    const accounts = await web3.eth.getAccounts()
    console.log('Account', accounts[0]);
    const result = await new web3.eth.Contract(abi)
          .deploy({ data: evm.bytecode.object, arguments: ['Rinkeby Deployed'] })
          .send({ gas: '1000000', from: accounts[0] })

    console.log('Contracts deployed at: ' + result.options.address);
    //To prevent a hanging deployment, add this code directly below.
    provider.engine.stop()
}

deploy()
