from brownie import accounts
import time

import requests
from scripts.database import get_mysql_connection
from dotenv import load_dotenv
from scripts.helper import init, terminate
from scripts.run_api import main as run_api

def get_reviews_count():
    conn, reviews_table = get_mysql_connection()
    cur = conn.cursor()
    cur.execute(f'SELECT COUNT(*) FROM {reviews_table}')
    val = cur.fetchall()
    cur.close()
    return val[0][0]

def test_db_connection():
    load_dotenv()
    conn, _ = get_mysql_connection()
    conn.ping()

def test_data_insertion():
    account, cnt, proc = init(start_listener=True)
    
    time.sleep(1)
    target_entity = accounts[3]
    score = 3
    n = get_reviews_count()
    assert n == 0
    
    tx = cnt.storeReview(target_entity, score, 'something', { 'from': account })
    tx.wait(1)
    time.sleep(2)

    n = get_reviews_count()
    assert n == 1
    terminate(proc)
