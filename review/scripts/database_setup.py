import mysql.connector


def create_database():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="root"
    )

    cur = db.cursor()
    cur.execute("CREATE DATABASE review")
    print("Database review created")

    cur.close()
    db.close()


def create_table():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="root",
        database="review"
    )

    cur = db.cursor()
    cur.execute(f'DROP TABLE IF EXISTS votes')
    cur.execute("CREATE TABLE votes (id int PRIMARY KEY AUTO_INCREMENT, article VARCHAR(50), reviewer VARCHAR(50), type VARCHAR(50), grade int)")
    print("Table views created")

    cur.close()
    db.close()


if __name__ == '__main__':
    create_database()
    create_table()
