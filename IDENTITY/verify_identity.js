const { expect } = require("chai");
const { ethers } = require("hardhat");
const { cyrb53 } = require("./hash_function");

(async () => {
    try {
        // deployment address of contract
        const user = await ethers.getContractAt("JournalDID", "0xBAdDE786335f324dC5368D9f8796fe180F9aBf2c");
        console.log('User contract deployed at:'+ user.address)
        console.log('Owner is:' + await user.getOwner());
        console.log(await verify_user("0xBAdDE786335f324dC5368D9f8796fe180F9aBf2c", "0x60087358883242e6981916f73764cd0057eb4ad313addc20ecf1358df177daad"))

    } catch (e) {
        console.log(e.message)
    }
})()


async function verify_user(contract, private_key) {
    try {
        const user = await ethers.getContractAt("JournalDID", String(contract));
        var hash = await user.getHash();
        console.log(hash)
        hash = hash.toHexString();
        console.log(hash)
        var key_hash = "0x" + cyrb53(private_key).toString(16);
        console.log(key_hash);
        if (hash == key_hash) return true;
        else return false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

async function check_has_token_type(wallet, token_contract) {
    var tokenABI = [{
            "constant": true,
            "inputs": [
                {
                "name": "_owner",
                "type": "address"
                }],
            "name": "balanceOf",
            "outputs": [
                {
                "name": "balance",
                "type": "uint256"
                }],
            "payable": false,
            "type": "function"
        }]
    // var balance = await web3.eth.getBalance(String(wallet)); // default ethereum balance
    // source token contract address
    const tokenInst = new web3.eth.Contract(tokenABI, String(token_contract));
    // wallet address
    var balance = await tokenInst.methods.balanceOf(String(wallet)).call()
    if (balance > 0) return true
    else return false
}
