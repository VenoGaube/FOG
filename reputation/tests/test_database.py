import time
from brownie import accounts
from scripts.helper import get_mysql_connection, setup_database, \
    get_contract, get_web3_reputation_contract
from scripts.listener import start_poll_loop
from dotenv import load_dotenv

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
    load_dotenv()
    setup_database()
    _, reputation_contract = get_contract()
    event_filter = get_web3_reputation_contract(reputation_contract)
    start_poll_loop(event_filter)

    time.sleep(2)
    n = get_reviews_count()
    assert n == 0
    
    reputation_contract.store(3, accounts[0], 'inini')
    time.sleep(5)

    n = get_reviews_count()
    assert n == 1