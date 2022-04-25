const { expect } = require("chai");
const { ethers } = require("hardhat");


(async () => {
    try {
        var new_account = await web3.eth.accounts.create();
        console.log(new_account.address);
        console.log(new_account.privateKey);

        const User = await ethers.getContractFactory("JournalDID");
        const user = await User.deploy();
        
        
        await user.deployed();
        console.log('User deployed at:'+ user.address)
        console.log(await user.getOwner());
    } catch (e) {
        console.log(e.message)
    }
})()
