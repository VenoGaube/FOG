from scripts.helper import terminate
from scripts.listener import start_oracle
from scripts.run_api import start_api
from scripts.helper import init
from brownie import accounts
import time
import requests

def test_api():
    # deploy the smart contract and start the oracle
    _, cnt, oracle_proc = init(start_listener = True)

    # start the api
    api_proc = start_api(cnt)
    
    time.sleep(4)
    target_entity = accounts[3]
    scores, texts = [1, 2, 3], ['ok', 'nope', 'aweful']
    
    for i, (score, text) in enumerate(zip(scores, texts), 6):
        tx = cnt.storeReview(target_entity, score, text, { 'from': accounts[i] })
        tx.wait(1)
        
    time.sleep(5)

    res = requests.get(f'http://localhost:8080/reviews/{target_entity}')
    for i, (_, score, txt, _) in enumerate(res.json()):
        assert score == scores[i]
        assert txt == texts[i]
    terminate(oracle_proc)
    terminate(api_proc)