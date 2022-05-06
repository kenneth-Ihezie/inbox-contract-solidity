// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Inbox {
    //storage variable
    string public message;

    constructor (string memory _initialMessage) {
        message = _initialMessage;
    }

    /*
    Common function types

    public == Anyone can call this function
    private == Only this contract can call this function
    view == This function returns data and does not modify the contract's data
    constant == This function returns data and does not modify the contract's data
    pure == Function will not modify or even read the contract's data
    payable == when someone call this function they might send ether along
    external == External functions are part of the contract interface, which means they can be called from other contracts and via transactions.  An external function f cannot be called internally
    */

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    /*
    you don't neccessary have to create a function to get storage variables.
    whenever you create a storage variable marked with public, the contract automatically create 
    get function for the storage variable
    */
    //we just called this for learning purpose.
    // function getMessage() public view returns(string msg){
    //     return message;
    // }
}

//There are basically two ways in running contract functions
/*
Calling A Function  |  Sending A Transaction to a Function
==========================================================
Cannot modifiy the  |   Can modify a contract's data
contract's data

Can return data     |   Returns the transaction hash(not hash)

Runs instantly      |   Takes time to execute

Free to do          |   costs money(both on testnet and mainnet).
*/

/*
wei, gwei, finney and ether are unit of measurments.
eg 1 dollar = 100 cents
1 ether == 1,000,000,000,000,000,000 wei
*/