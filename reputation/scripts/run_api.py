import json
import multiprocessing
from flask import Flask
from waitress import serve
from paste.translogger import TransLogger

from scripts.database import get_mysql_connection
from scripts.helper import init

app = Flask(__name__)

@app.route('/reviews/<entity>', methods=['GET'])
def get_reviews(entity):
    conn, table = get_mysql_connection()
    cur = conn.cursor()
    sql = f'''
        SELECT *
        FROM {table}
        WHERE entity="{entity}"
        ORDER BY id ASC;
    '''
    cur.execute(sql)
    res = cur.fetchall()
    cur.close()
    conn.close()
    api_response = app.response_class(response=json.dumps(res, default=str),
                status=200, mimetype='application/json')
    return api_response
    
def start_api(cnt):
    print(f'Contract address {cnt.address}')
    tl = TransLogger(app)
    proc = multiprocessing.Process(target=serve, args=(tl, ), \
        kwargs={'host': '0.0.0.0', 'port':'8080', 'threads':8})
    proc.start()
    return proc

def main():
    _, cnt, _ = init(start_listener = True)
    print(f'Contract address {cnt.address}')
    tl = TransLogger(app)
    serve(tl, host='0.0.0.0', port=8080, threads=8)

if __name__ == '__main__':
    main()
