from brownie import accounts, exceptions, Review
import pytest

from scripts.review import init, terminate_listener

def test1():
    # r, p = init()
    r = Review.deploy(0, {'from': accounts[0]})
    tx = r.setAnyUserType(3, accounts[1], {'required_confs': 0})
    tx.wait(1)

    tx = r.submitArticleForReview('id_article', {'from': accounts[1], 'required_confs': 0})
    tx.wait(1)
    print(tx.events)
    for event in tx.events:
        print(event)
        if event == 'ArticleSubmitted':
            print("here")

    # terminate_listener(p)

