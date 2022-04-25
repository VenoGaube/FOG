from brownie import Reputation, accounts, web3
from scripts.listener import start_poll_loop
from scripts.helper import setup_database, get_web3_reputation_contract
from dotenv import load_dotenv
import time


def deploy_reputation_contract():
    account = accounts[0]

    # mysql
    setup_database()

    reputation_contract = Reputation.deploy({'from': account})
    event_filter = get_web3_reputation_contract(reputation_contract)
    start_poll_loop(event_filter)
    time.sleep(2)
    reputation_contract.store(2, accounts[0], 'inini')
    time.sleep(10)

def main():
    load_dotenv()
    deploy_reputation_contract()