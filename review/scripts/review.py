from brownie import accounts, Review, User
from scripts.listener_helper import start_listener, terminate_listener, start_listener_2


def init():
    # deploy the contract
    r = Review.deploy(0, {'from': accounts[0]})

    # start the oracle
    p = start_listener(str(r.address), r.abi)

    return r, p
