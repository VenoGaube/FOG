const { expect } = require("chai");
const { ethers } = require("hardhat");

(async () => {
    try {
        // deployment address of contract
        const user = await ethers.getContractAt("JournalDID", "0xed96bc20839fea0dee61d0575908a0c8b58c892f");
        await user.deployed();
        console.log('User contract deployed at:'+ user.address)
        console.log('Owner is:' + await user.getOwner());

        
        //const balance = await collection.methods.balanceOf("0x39253052c1515d25ed39bc2efc1eff7f658bda34", ,"4").call();
        //console.log(balance)
        // wallet address 
        var balance = await web3.eth.getBalance("0xE4b549CEdEa2cEE9307eC78AAe6557a0DA03Dd82");
        console.log(web3.utils.fromWei(balance))
        console.log("-----")

        //method signatures from contract
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
        // source token contract address
        const tokenInst = new web3.eth.Contract(tokenABI, "0x39253052c1515d25ed39bc2efc1eff7f658bda34");
        // wallet address
        balance = await tokenInst.methods.balanceOf("0xE4b549CEdEa2cEE9307eC78AAe6557a0DA03Dd82").call()
        console.log(balance)

    } catch (e) {
        console.log(e.message)
    }
})()
