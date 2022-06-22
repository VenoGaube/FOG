from brownie import Review, accounts


def main():
    return Review.deploy("Test Review", "TST", 18, 1e21, {'from': accounts[0]})