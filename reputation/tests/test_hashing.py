import hashlib
import random
import string
from scripts.helper import get_contract
from brownie import accounts

def test_hash():
    account, reputation_contract = get_contract()
    for tmp in range(5):
        text = ''.join(random.choices(string.ascii_uppercase +\
            string.ascii_lowercase + string.digits, k=random.randint(5, 50)))
        hash = hashlib.sha256(text.encode('utf-8')).hexdigest()
        reputation_contract.store(5, account, text)

        reviews = reputation_contract.retrieve_entity_reviews(account)
        assert str(reviews[-1][-1])[2:] == hash