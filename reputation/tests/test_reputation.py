from brownie import Reputation, accounts, exceptions, web3
import pytest
from random import randint
from scripts.helper import get_web3_reputation_contract, get_contract


def test_deploy():
    _, reputation_contract = get_contract()

    for i in range(10):
        starting_value = reputation_contract.entity_reviews_length(accounts[i])
        expected = 0
        assert expected == starting_value, 'Oooops!'

def test_insert():
    # arrange
    _, reputation_contract = get_contract()
    
    insert_reviews = 6
    for i in range(insert_reviews):
        reputation_contract.store(4, accounts[i], 'good')
        nreviews = reputation_contract.entity_reviews_length(accounts[i])
        assert nreviews == 1

def test_insert_multiple():
    # arrange
    _, reputation_contract = get_contract()
    
    insert_reviews = 6
    for tmp in range(insert_reviews):
        reputation_contract.store(4, accounts[0], 'good')
    nreviews = reputation_contract.entity_reviews_length(accounts[0])
    assert nreviews == insert_reviews

def test_retrieve():
    # arrange
    _, reputation_contract = get_contract()
    values = [3,5,2,3,1,5]
    for val in values:
        reputation_contract.store(val, accounts[1], 'good')
    
    reviews = reputation_contract.retrieve_entity_reviews(accounts[1])
    for val, review in zip(values, reviews):
        assert review[0] == val

def test_invalid_score():
    account, reputation_contract = get_contract()
    with pytest.raises(exceptions.VirtualMachineError):
        reputation_contract.store(6, account, 'ini')
    
    with pytest.raises(exceptions.VirtualMachineError):
        reputation_contract.store(0, account, 'idl')
    
def test_events():
    _, reputation_contract = get_contract()
    c = get_web3_reputation_contract(reputation_contract)
    n = randint(1, 15)
    for tmp in range(n):
        reputation_contract.store(4, accounts[0], 'yep')
    new_entries = c.get_new_entries()
    assert len(new_entries) == n

    # repeat once again
    n = randint(1, 15)
    for tmp in range(n):
        reputation_contract.store(4, accounts[0], 'yep')
    new_entries = c.get_new_entries()
    assert len(new_entries) == n