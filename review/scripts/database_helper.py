import mysql.connector


def insert_vote(article, reviewer, type_, grade):
    db = getConnection()

    cur = db.cursor()
    cur.execute("INSERT INTO votes (article, reviewer, type, grade) VALUES (%s, %s, %s, %s)", (article, reviewer, type_, grade))
    db.commit()

    cur.close()
    db.close()


def reset_table():
    db = getConnection()

    cur = db.cursor()
    cur.execute(f'DROP TABLE IF EXISTS votes')
    cur.execute("CREATE TABLE votes (id int PRIMARY KEY AUTO_INCREMENT, article VARCHAR(50), reviewer VARCHAR(50), type VARCHAR(50), grade int)")
    print("Table views (re)created")

    cur.close()
    db.close()


def getConnection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="root",
        database="review"
    )


if __name__ == '__main__':
    # if you want to drop and re-create the votes table run this
    reset_table()
