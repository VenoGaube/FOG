import asyncio
import multiprocessing
import traceback
from brownie import web3
from scripts.database import insert_review_to_database

def print_listener(msg):
    print(f'Listener - {msg}')

async def poll_loop(address, abi, pollInterval = 2):
    print(abi)
    print_listener(f'Starting event loop...')
    event_filter = web3.eth.contract(address=address,
            abi=abi).events.ReviewReveivedEvent.createFilter(fromBlock='latest')
    while True:
        events = []
        try:
            events = event_filter.get_new_entries()
        except:
            print('Error while fetching data...')
            pass

        print(len(events))
        if len(events) > 0:
            print_listener(f'Detected {len(events)} new events')
            for event in events:
                _event = event['args']
                text, value, id, targetEntity = _event['text'],\
                    _event['value'], _event['id'], _event['targetEntity']
                insert_review_to_database(id, value, text, targetEntity)
        await asyncio.sleep(pollInterval)

def _start_poll_loop(address, abi):
    print("starting poll loop")
    loop = asyncio.get_event_loop()
    try:
        loop.run_until_complete(
            asyncio.gather(
                poll_loop(address, abi)
            )
        )
    except:
        traceback.print_exc()
    finally:
        print("closing....")
        loop.close()

def start_oracle(address, abi):
    proc = multiprocessing.Process(target=_start_poll_loop, args=(address, abi))
    proc.start()
    print("closing proc")
    return proc