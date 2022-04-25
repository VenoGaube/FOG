import os
import asyncio
import traceback
import multiprocessing
from scripts.helper import get_mysql_connection, insert_review_to_database

def print_listener(msg):
    print(f'Listener - {msg}')

async def poll_loop(event_filter, pollInterval):
    print_listener('Starting event loop...')
    while True:
        try:
            events = event_filter.get_new_entries()
            if len(events) > 0:
                print_listener(f'Detected {len(events)} new events')
                conn, reviews_table = get_mysql_connection()
                for event in events:
                    _event = event['args']
                    text, score, id, entity = _event['text'],\
                        _event['score'], _event['id'], _event['entity']
                    insert_review_to_database(conn, reviews_table, id, score, text, entity)
                conn.commit()
                conn.close()
            await asyncio.sleep(pollInterval)
        except:
            print_listener('Connection closed...')
            return
    
def _start_poll_loop(event_filter):
    loop = asyncio.get_event_loop()
    try:
        loop.run_until_complete(
            asyncio.gather(
                poll_loop(event_filter, 2)
            )
        )
    finally:
        loop.close()

def start_poll_loop(event_filter):
    multiprocessing.Process(target=_start_poll_loop, args=(event_filter,)).start()