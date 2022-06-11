from brownie import accounts, Reputation, web3
from dotenv import load_dotenv
from scripts.database import setup_database
from scripts.listener import start_oracle

def init(deploying_account = 0, start_listener = False):

    # setup the database
    load_dotenv()
    setup_database()

    # deploy smart contract
    account = accounts[deploying_account]
    cnt = Reputation.deploy({'from': account})

    # start process for events
    proc = start_oracle(str(cnt.address), cnt.abi) if start_listener else None

    return account, cnt, proc

def terminate(proc):
    if proc is not None:
        print(f'Terminating....')
        proc.terminate()
        proc.join()
        proc.close()