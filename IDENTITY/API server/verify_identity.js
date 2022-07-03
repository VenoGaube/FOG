import { ethers } from 'ethers';
import CONFIG from './config.js';
import fs from 'fs';

export function cyrb53(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};


export async function verify_user(contract, wallet_pk, provider_name, password) {
    const provider = new ethers.providers.InfuraProvider(provider_name, CONFIG.api_key);
    const wallet = new ethers.Wallet(wallet_pk, provider);
    const account = wallet.connect(provider);
    let rawdata = fs.readFileSync('./contract/JournalDID.json');
    let contractJson = JSON.parse(rawdata.toString()); 
    var user = new ethers.Contract(contract, contractJson.abi, account);
    
    try {
        var hash = await user.getHash();
        hash = hash.toHexString();
        console.log("saved", hash)
        var key_hash = "0x" + cyrb53(password).toString(16);
        console.log("other", key_hash);
        if (hash == key_hash) return true;
        else return false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

export async function check_has_token_type(wallet, token_contract) {
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
