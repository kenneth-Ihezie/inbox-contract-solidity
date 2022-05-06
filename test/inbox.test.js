const assert = require('assert')
const ganache = require('ganache-cli')
//note make Web3 start with uppercase
const Web3 = require('web3')
const { abi, evm } = require('../compile')

//A provider is a communication layer to some etherum or bsc or some other network network
//in the furture we can change the ganache to rinkeby
const web3 = new Web3(ganache.provider())
let accounts;
let inbox;
const INITIAL_MSG = "hello world"

beforeEach(async () => {
    //Get a list of all account.
    //the web3 library has different modules associated with different cryptocurrencies.
    //in our case we are using etherum
   accounts =  await web3.eth.getAccounts()

   //Use one those account to deploy the contract
   inbox = await new web3.eth.Contract(abi)
       //data is the compiled bytecode and arguments is the initialMessage in the constructor of our contract.
       .deploy({ data: evm.bytecode.object, arguments: [INITIAL_MSG]})
       //the account we are deploying the contract from
       .send({ from: accounts[0], gas: '1000000' })

    console.log(inbox)
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        //every contract deploy has an address.
        //the ok method checks if the value is defined. if the value is null or undefined the test will fail
        assert.ok(inbox.options.address)
    })

    it('initial message', async () => {
        //here we are just calling a function
        //reference to the message method on the contract
        const message = await inbox.methods.message().call()
        assert.equal(message, 'hello world')
    })

    it('set message', async () => {
        //here we are sending a transaction becuase we are modifying the blockcahin
        //you can pass an object to the send method to specify who is paying for the gas and how much gas to use
        await inbox.methods.setMessage('changed').send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        console.log(message);
        assert.equal(message, 'changed')
    })
})

/* 
Overview of mocha tests

//mocha functions
//it == Run a test and make an assertion(to check if values are equal)
//describe == Groups together "it" functions 
//beforeEach == Execute some general setup code.
class Car {
    park(){
        return 'stopped'
    }

    drive() {
        return 'vroom'
    }
}

let car;
//we are using beforeEach to initialize car class.
beforeEach(() => {
    car = new Car()
})

//the car passed is not related to the car class
describe('Car-Class', () => {
    //contains all it functions
    it('can park', () => {
        //checks if what our code returns and what the actual value is. if it is egual the test will pass else it will fail
        assert.equal(car.park(), 'stopped')
    })

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom')
    })
})
*/