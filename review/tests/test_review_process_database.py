from brownie import accounts, Review
import pytest
import time

from scripts.listener_helper import initialize
from scripts.database_helper import reset_table


def test_review_database():
    reset_table()
    r = initialize(accounts[0], 0)
    time.sleep(1)

    tx = r.setAnyUserRole(3, accounts[1], {'required_confs': 0})
    tx.wait(1)
    time.sleep(2)

    tx = r.submitArticleForReview('id_article', {'from': accounts[1], 'required_confs': 0})
    tx.wait(1)
    time.sleep(2)
    print('Emmited events')
    for e in tx.events:
        print('    ' + e['event_name'])

    tx = r.assignReviewers('id_article', [accounts[2], accounts[3], accounts[4]], {'from': accounts[0]})
    tx.wait(1)
    time.sleep(2)
    print('Emmited events')
    for e in tx.events:
        print('    ' + e['event_name'])

    tx = r.vote('id_article', 5, {'from': accounts[2]})
    tx.wait(1)
    time.sleep(2)
    print('Emmited events')
    for e in tx.events:
        print('    ' + e['event_name'])

    tx = r.vote('id_article', 3, {'from': accounts[3]})
    tx.wait(1)
    time.sleep(2)
    print('Emmited events')
    for e in tx.events:
        print('    ' + e['event_name'])

    tx = r.vote('id_article', 2, {'from': accounts[4]})
    tx.wait(1)
    time.sleep(2)
    print('Emmited events')
    for e in tx.events:
        print('    ' + e['event_name'])

    # the authors can make additional corrections
    tx = r.vote('id_article', 5, {'from': accounts[2]})
    tx.wait(1)
    time.sleep(2)
    print('Emmited events')
    for e in tx.events:
        print('    ' + e['event_name'])

    tx = r.vote('id_article', 5, {'from': accounts[3]})
    tx.wait(1)
    time.sleep(2)
    print('Emmited events')
    for e in tx.events:
        print('    ' + e['event_name'])

    tx = r.vote('id_article', 5, {'from': accounts[4]})
    tx.wait(1)
    time.sleep(2)
    print('Emmited events')
    for e in tx.events:
        print('    ' + e['event_name'])



