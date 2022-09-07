from brownie import web3
import asyncio
import multiprocessing as mp
import traceback


def start_listener(address, abi):
    p = mp.Process(target=listen_for_events, args=(address, abi))
    p.start()
    return p


def listen_for_events(address, abi):
    print('start')
    loop = asyncio.get_event_loop()

    try:
        loop.run_until_complete(asyncio.gather(listen(address, abi)))
    except:
        traceback.print_exc()
    finally:
        print('close')
        loop.close()


async def listen(address, abi):
    print('Starting event loop')
    # my_filter = web3.eth.contract(address=address, abi=abi).events[
    #     "ArticleSubmitted", "VotingStarted", "ArticleAccepted", "ArticleRejected", "ArticleForRevision", "VotingPeriodExpired"].createFilter(
    #     fromBlock='latest')
    print('tetststst')
    my_filter = web3.eth.contract(address=address,
                                     abi=abi).events.ArticleSubmitted.createFilter(fromBlock='latest')

    print('filter done')

    while True:
        events = []
        try:
            events = my_filter.get_new_entries()
        except:
            print('Error gathering events')
            pass

        print(len(events))
        if len(events) > 0:
            for e in events:
                event = e['args']
                print('done')
                print(event['text'], event['value'], event['id'], event['targetEntity'])

        await asyncio.sleep(2)


def terminate_listener(p):
    if p is not None:
        print('Terminating')
        p.terminate()
        p.join()
        p.close()


async def log_loop(event_filter, interval):
    while True:
        for event in event_filter.get_new_entries():
            print(event)
        await asyncio.sleep(interval)


def start_listener_2(address, abi):
    contract = web3.eth.contract(address=address, abi=abi)
    # event_filter = contract.events.ArticleSubmitted.createFilter(fromBlock='latest')
    event_filter = web3.eth.contract(address=address, abi=abi).events[
        "ArticleSubmitted", "VotingStarted", "ArticleAccepted", "ArticleRejected", "ArticleForRevision", "VotingPeriodExpired"].createFilter(
        fromBlock='latest')
    loop = asyncio.get_event_loop()

    try:
        loop.run_until_complete(
            asyncio.gather(
                log_loop(event_filter, 2)
            )
        )
    finally:
        loop.close()

