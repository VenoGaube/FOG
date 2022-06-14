import os
from mysql.connector import connection

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

def insert_review_to_database(id, score, text, entity):
    conn, reviews_table = get_mysql_connection()
    cur = conn.cursor()
    sql = f'''
        INSERT INTO {reviews_table}
        VALUES (
            {id}, {score}, "{text}", "{entity}"
        )
    '''
    print(sql)
    cur.execute(sql)

    cur.close()
    conn.commit()
    conn.close()
