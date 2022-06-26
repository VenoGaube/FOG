import { ethers } from 'ethers';
import { cyrb53 } from "./verify_identity.js";
import Web3 from 'web3';
import fs from 'fs';
import CONFIG from './config.js';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
var authority_address = CONFIG.authority;

var default_user_data = {
    reader: [], //list of comments, saved articles...
    reviewer: [], // list of reviewed articles
    editor: [], //reputation
    author: [], // list of authored articles
};

var Journal_usertype = [ "READER", "REVIEWER", "EDITOR", "AUTHOR" ];

// add to list like: default_user_data.reader.push("<ipfs address>");
// convert to string before default_user_data = JSON.stringify(default_user_data);
//.parse for reverse



export async function create(provider_name, wallet_pk, verifier = authority_address) {
    //https://dev.to/yosi/deploy-a-smart-contract-with-ethersjs-28no
    const provider = new ethers.providers.InfuraProvider(provider_name, CONFIG.api_key);
    var new_account = await web3.eth.accounts.create();
    const wallet = new ethers.Wallet(wallet_pk, provider);
    const account = wallet.connect(provider);

    let rawdata = fs.readFileSync('./contract/JournalDID.json');
    let contractJson = JSON.parse(rawdata.toString()); 
    
    const factory = new ethers.ContractFactory(contractJson.abi, contractJson.data.bytecode.object, account)
    const price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
    const options = {gasLimit: 10000000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}
    
    const user = await factory.deploy(options)
    await user.deployed()

    await user.setHash(cyrb53(String(new_account.privateKey)));
    await user.setAuthority(verifier);
    console.log("User contract deployed at: " + user.address);
    fs.appendFileSync('created_accounts.txt', `${new Date().getTime()}: {contract: ${user.address}, account_password: ${new_account.privateKey}} \n`);
    return {"user_password": new_account.privateKey, "contract_address": user.address};
};

export async function read(contract, provider_name) {
    let rawdata = fs.readFileSync('./contract/JournalDID.json');
    let contractJson = JSON.parse(rawdata.toString()); 
    //var user = await getContractAt("JournalDID", String(contract));
    var user = new ethers.Contract(contract, contractJson.abi, new ethers.providers.InfuraProvider(provider_name, CONFIG.api_key));
    var owner = await user.getOwner();
    var hash = await user.getHash();
    var type = await user.getType();
    var authority = await user.getAuthority();
    var user_data = await user.getUserData();
    user_data = JSON.parse(user_data);
    return {"owner": owner, "hash": hash, "type": Journal_usertype[type], "authority": authority, "user_data": user_data}
}

export async function update_authority_values(contract, wallet_pk, provider_name, new_data) {
    const provider = new ethers.providers.InfuraProvider(provider_name, CONFIG.api_key);
    const wallet = new ethers.Wallet(wallet_pk, provider);
    const account = wallet.connect(provider);
    let rawdata = fs.readFileSync('./contract/JournalDID.json');
    let contractJson = JSON.parse(rawdata.toString()); 

    var user = new ethers.Contract(contract, contractJson.abi, account);
    try {
        if (new_data.authority_address) {
            console.log("updating auth address");
            await user.setAuthority(String(new_data.authority_address));
        }
        if (new_data.type) {
            console.log("updating user type");
            if (new_data.type == 1) await user.setAuthorType();
            else if (new_data.type == 2) await user.setReviewerType();
            else if (new_data.type == 3) await user.setEditorType();
            else console.log("invalid type parameter value");
        }
        
        if (new_data.user_data) {
            console.log("updating user data");
            await user.setUserData(JSON.stringify(new_data.user_data));
        }
    } catch (e) {
        console.log(e.message)
        return false;
    }
    return true;
}

export async function update_owner_values(contract, wallet_pk, provider_name, new_data) {
    const provider = new ethers.providers.InfuraProvider(provider_name, CONFIG.api_key);
    const wallet = new ethers.Wallet(wallet_pk, provider);
    const account = wallet.connect(provider);
    let rawdata = fs.readFileSync('./contract/JournalDID.json');
    let contractJson = JSON.parse(rawdata.toString()); 
    var user = new ethers.Contract(contract, contractJson.abi, account);
    
    try {
        if (new_data.new_user) {
            console.log("updating user", new_data.new_user.user_address, new_data.new_user.privateKey)
            var data = await user.changeOwner(String(new_data.new_user.user_address), cyrb53(String(new_data.new_user.private_key)));
            console.log(data.hash)
        }
        return true;
    } catch (e) {
        console.log(e.message)
        return false;
    }
}

export async function delete_user(contract, wallet_pk, provider_name) {
    const provider = new ethers.providers.InfuraProvider(provider_name, CONFIG.api_key);
    const wallet = new ethers.Wallet(wallet_pk, provider);
    const account = wallet.connect(provider);
    let rawdata = fs.readFileSync('./contract/JournalDID.json');
    let contractJson = JSON.parse(rawdata.toString()); 
    var user = new ethers.Contract(contract, contractJson.abi, account);
    try {
        var data = await user.changeOwner(String("0x0000000000000000000000000000000000000000"), "0");
        console.log(data.hash)
        return true;
    } catch (e) {
        console.log(e.message)
        return false;
    }
}

