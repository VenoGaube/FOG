import os
from brownie import web3, accounts, Reputation
from mysql.connector import connection

def get_mysql_connection():
    host = os.getenv('MYSQL_HOST')
    port = os.getenv('MYSQL_PORT')
    database = os.getenv('MYSQL_DATABASE')
    user = os.getenv('MYSQL_USER')
    password = os.getenv('MYSQL_PASSWORD')
    reviews_table = os.getenv('REVIEWS_TABLE')
    conn = connection.MySQLConnection(user=user, password=password,
            host=host, port=port, database=database)
    return conn, reviews_table

def setup_database():
    conn, reviews_table = get_mysql_connection()
    cur = conn.cursor()
    cur.execute(f'DROP TABLE IF EXISTS {reviews_table}')
    cur.execute(f'''
        CREATE TABLE {reviews_table}(
            id INT UNSIGNED PRIMARY KEY NOT NULL UNIQUE,
            score TINYINT UNSIGNED NOT NULL,
            text VARCHAR(1000),
            entity VARCHAR(42) NOT NULL,
            INDEX (id),
            INDEX (entity)
        )
    ''')
    print('Table created...')
    cur.close()
    conn.close()

def insert_review_to_database(conn, reviews_table, id, score, text, entity):
    cur = conn.cursor()
    cur.execute(f'''
        INSERT INTO {reviews_table}
        VALUES (
            {id}, {score}, "{text}", "{entity}"
        )
    ''')
    cur.close()

def get_web3_reputation_contract(review_contract):
    return web3.eth.contract(address=review_contract.address,
            abi=review_contract.abi).events.ReviewReveivedEvent.createFilter(fromBlock=0)
    
def get_contract():
    account = accounts[0]
    reputation_contract = Reputation.deploy({'from': account})
    return account, reputation_contract