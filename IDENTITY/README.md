## Identity - CRUD - deploy_identity.js
- default_user_data: each user starts with deafult JSON object (acts like a dictionary) where user data for each role can be stored. The structure can be subsequently modified as per operating needs. The object is converted to string for smart contract.

- create(provider_name: string, wallet_pk: string, verifier: address): deploys a new contract funded from wallet and generate a new password. Returns the password and contract address. Verifier address is the address of the actor with authority rights over the user management. Will also write a log file of created users to created_accounts.txt

- read(contract: address, provider_name: string): will return a JSON object containing user address, private key hash, user type, user authority address and user data object

- update_authority_values(contract: address, wallet_pk: string, provider_name: string, new_data: JSON object): will change parameters passed in new_data, authority to authority_address, change user type to type - 1 author, 2 reviewer, 3 editor (and 0 reader by default) and user data to user_data

- update_owner_values(contract: address, wallet_pk: string, provider_name: string, new_data: JSON object): will set user address and hash to those supplied in new_data.new_user, effectively changing the user

- delete_user(contract: address, wallet_pk: string, provider_name: string): will set user address and hash to 0 values, effectively invalidating the user

## Verification - verify_identity.js
- verify_user(contract: string address, wallet_pk: string, provider_name: string, password: string): check if hash stored in contract and that of the passed password match

## API call examples
- start server node index.js
- http://localhost:8081/create 
```
{
    "wallet_pk": "<wallet_private_key>",
    "provider": "rinkeby"
}
```
- http://localhost:8081/auth_update/rinkeby/0xddd7FE6827d939B1FC2676150F7021a75D4d86AC
```
{
    "wallet_pk": "<wallet_private_key>",
    "new_data":{
        "type": 1,
        "user_data": {
            "reader": [], 
            "reviewer": [], 
            "editor": ["banned"],
            "author": []
        }
    }
}
```
- http://localhost:8081/read/rinkeby/0xE1D5FB70D8b03C5C2535616895c659c228316B7B
- http://localhost:8081/user_update/rinkeby/0xddd7FE6827d939B1FC2676150F7021a75D4d86AC
```
{
    "wallet_pk": "<wallet_private_key>",
    "new_data":{
        "new_user": {
            "user_address": "0xd7cc6E91297C6CF2A6844f8291d464A08773ef39", 
            "private_key": "0xd3a4295845ae2cf2acedbb8e146d038dc79b0ac9f9f7747107162282bae98e90"
        }
    }
}
```
