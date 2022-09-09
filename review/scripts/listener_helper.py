from brownie import Review, web3
from threading import Thread
import time

from scripts.database_helper import insert_vote


def initialize(deploy_account, editor):
    # deploy the contract
    r = Review.deploy(editor, {'from': deploy_account})

    # make a filter for VoteCasted events
    contract = web3.eth.contract(r.address, abi=r.abi)
    event_filter = contract.events.VoteCasted.createFilter(fromBlock='latest')

    # start the event listener in a separate thread
    worker = Thread(target=log_loop, args=(event_filter, 1), daemon=True)
    worker.start()

    return r


def log_loop(event_filter, poll_interval):
    while True:
        for e in event_filter.get_new_entries():
            event = e['args']
            # the if is technically not needed because we already have a filter that only listens to VoteCasted event
            if event['event_name'] == 'VoteCasted':
                print('Inserted a vote')
                insert_vote(event['articleIpfsHash'], event['reviewer'], event['type_'], event['grade'])
        time.sleep(poll_interval)
