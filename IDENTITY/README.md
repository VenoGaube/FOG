## Identity - CRUD - deploy_identity.js
- create(verifier: string address): will create a new account : private key if there is no local wallet available, or local wallet account : private key if there is. Verifier address is the address of the actor with authority rights over the user management.
- read(contract: string address): will return user address, private key hash, user type and user authority
- update_authority_values(contract: string address, authority_address: string address, type: int): will set authority to authority_address and change user type to type - 1 author, 2 reviewer, 3 editor (and 0 reader by default)
- update_owner_values(contract: string address, user_address: string address, private_key: string): will set user address and hash, effectively changing the user
- delete_user(contract: string address): will set user address and hash to 0 values, effectively invalidating the user

## Verification - verify_identity.js
- verify_user(contract: string address, private_key: string): check if hash stored in contract and that of the passed private key match
- check_has_token_type(wallet: : string address, token_contract: string address): check if the specified wallet has a positive balance of the coin/token/NFT that was created by the token contract
