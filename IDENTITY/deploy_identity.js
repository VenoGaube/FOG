const { expect } = require("chai");
const { ethers } = require("hardhat");
const { cyrb53 } = require("./hash_function");

var default_user_data = {
    reader: [], //list of comments, saved articles...
    reviewer: [], // list of reviewed articles
    editor: [], //reputation
    author: [], // list of authored articles
};
// add to list like: default_user_data.reader.push("<ipfs address>");
// convert to string before default_user_data = JSON.stringify(default_user_data);
//.parse for reverse


(async () => {
    try {
        console.log(default_user_data)
        var test_verifier = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"; // your own address for testing purposes
        var create_output = await create(test_verifier);
        console.log("create_output:");
        console.log(create_output);
        
        var read_output = await read(create_output[1]);
        console.log("read output:");
        console.log(read_output);

        default_user_data.reader.push("<ipfs address>");

        var update_success = await update_authority_values(create_output[1], test_verifier, 1, default_user_data);
        console.log("update_success " + update_success);
        console.log(await read(create_output[1]));

        var owner_success = await update_owner_values(create_output[1], create_output[0].address, create_output[0].privateKey);
        console.log("owner success " + owner_success);

        //var delete_success = await delete_user(create_output[1]);
        //console.log("delete success " + delete_success);
        //console.log(await read(create_output[1]));
    } catch (e) {
        console.log(e.message)
    }
})()

async function detectLocal(){
    // detect local wallet address and generate a new private key
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    var account = await signer.getAddress()
    
    console.log("Local account:", account);
    var new_account = await web3.eth.accounts.create();
    new_account.address = account
    return new_account
}

async function create(verifier, local = false) {
    if (local) {
        try {
            var new_account = await detectLocal();
        } catch (e) {
            console.log(e);
            var new_account = await web3.eth.accounts.create();
        }
    }
    else var new_account = await web3.eth.accounts.create();
    
    console.log("Your address: " + new_account.address);
    console.log("Your private key: "+ new_account.privateKey);

    const User = await ethers.getContractFactory("JournalDID");
    const user = await User.deploy();
    
    await user.deployed();
    await user.setHash(cyrb53(String(new_account.privateKey)));
    await user.setAuthority(verifier);
    console.log("User contract deployed at: " + user.address);
    //console.log("Getting owner " + await user.getOwner());
    //console.log("Getting hash " + await user.getHash());
    //console.log("Getting authority " + await user.getAuthority());
    return [new_account, user.address];
};

async function read(contract) {
    var user = await ethers.getContractAt("JournalDID", String(contract));
    var owner = await user.getOwner();
    var hash = await user.getHash();
    var type = await user.getType();
    var authority = await user.getAuthority();
    var user_data = await user.getUserData();
    user_data = JSON.parse(user_data);
    return {"owner": owner, "hash": hash, "type": type, "authority": authority, "user_data": user_data}
}

async function update_authority_values(contract, authority_address, type, user_data) {
    try {
        var user = await ethers.getContractAt("JournalDID", String(contract));
        await user.setAuthority(String(authority_address));
        if (type == 1) await user.setAuthorType();
        else if (type == 2) await user.setReviewerType();
        else if (type == 3) await user.setEditorType();
        else console.log("invalid type parameter value");
        await user.setUserData(JSON.stringify(user_data));
        return true;
    } catch (e) {
        console.log(e.message)
        return false;
    }
}

async function update_owner_values(contract, user_address, private_key) {
    try {
        var user = await ethers.getContractAt("JournalDID", String(contract));
        await user.changeOwner(String(user_address), cyrb53(String(private_key)));
        return true;
    } catch (e) {
        console.log(e.message)
        return false;
    }
}

async function delete_user(contract) {
    try {
        var user = await ethers.getContractAt("JournalDID", String(contract));
        await user.changeOwner(String("0x0000000000000000000000000000000000000000"), 0);
        return true;
    } catch (e) {
        console.log(e.message)
        return false;
    }
}

