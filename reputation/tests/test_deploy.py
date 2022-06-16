from brownie import accounts, exceptions
import pytest
import string
import random
import hashlib
import math

from scripts.helper import init, terminate

def test_deploy():
    _, _, proc = init()
    terminate(proc)

def test_store():
    _, cnt, proc = init()

    target_entity = accounts[1]
    rng = range(2, 10)
    for i in rng:
        tx = cnt.storeReview(target_entity, 1, 'something', {'from': accounts[i]})
        tx.wait(1)
    
    count = cnt.getReputationCount(target_entity)
    assert count == len(rng)
    terminate(proc)


def test_invalid_inserts():
    account, cnt, proc = init()

    target_entity = accounts[1]
    with pytest.raises(exceptions.VirtualMachineError):
        tx = cnt.storeReview(target_entity, 6, '', {'from': account})
        tx.wait(1)

    with pytest.raises(exceptions.VirtualMachineError):
        tx = cnt.storeReview(target_entity, 4, '', {'from': target_entity})
        tx.wait(1)
    
    terminate(proc)
    
def test_fetch_blockchain_reviews():
    _, cnt, proc = init()

    target_entity = accounts[1]
    n = 10
    scores = []
    for i in range(n):
        if i == 0 or i == 1: 
            continue
        score = random.randint(1, 5)
        tx = cnt.storeReview(target_entity, score, 'something', { 'from': accounts[i] })
        tx.wait(1)
        scores.append(score)
        tx.wait(1)
    
    reviews = cnt.retrieveEntityReviews(target_entity)
    assert len(reviews) == 8

    for score, review in zip(scores, reviews):
        assert review[0] == score
    terminate(proc)

    
def test_hashing():
    _, cnt, proc = init()

    target_entity = accounts[1]

    for i in range(2, 8):

        msg, score = ''.join(random.choices(string.ascii_lowercase, k=10)), 4
        tx = cnt.storeReview(target_entity, score, msg, {'from': accounts[i]})
        tx.wait(1)
        hash = hashlib.sha256(msg.encode('utf8')).hexdigest()
        reviews = cnt.retrieveEntityReviews(target_entity)
        assert str(reviews[-1][1])[2:] == hash
    
    terminate(proc)


def test_truthfulness():
    _, cnt, proc = init()
    target_entity = accounts[3]
    scores, hashes = [], []

    for i in range(4, 10):
        msg, score = ''.join(random.choices(string.ascii_lowercase, k=10)), random.randint(1, 5)
        tx = cnt.storeReview(target_entity, score, msg, {'from': accounts[i]})
        tx.wait(1)
        hash = hashlib.sha256(msg.encode('utf8')).hexdigest()
        hashes.append(hash)
        scores.append(score)

    check_passed = cnt.checkEntityReviews(scores, hashes, target_entity)
    assert check_passed
    terminate(proc)

def test_avg_score():
    _, cnt, proc = init()
    target_entity = accounts[4]
    scores, hashes = [], []

    for i in range(5, 9):
        print(i)
        msg, score = ''.join(random.choices(string.ascii_lowercase, k=10)), random.randint(1, 5)
        tx = cnt.storeReview(target_entity, score, msg, {'from': accounts[i]})
        tx.wait(1)
        hash = hashlib.sha256(msg.encode('utf8')).hexdigest()
        hashes.append(hash)
        scores.append(score)
    
    exp_integer = sum(scores) // len(scores)
    exp_fp =  ((sum(scores) % len(scores)) * 10) // len(scores)
    integer, fp = cnt.getAverageScore(target_entity)
    print(integer,  fp)
    assert exp_integer == integer
    assert exp_fp == fp
    assert math.floor((sum(scores) / len(scores)) * 10) / 10.0 == exp_integer + fp / 10
    terminate(proc)

def test_multiple_inserts():
    _, cnt, proc = init()

    target_entity = accounts[1]
    inserting_entity = accounts[2]

    # insert review for the first time
    tx = cnt.storeReview(target_entity, 1, 'pmpom', {'from': inserting_entity})
    tx.wait(1)

    # inserting again causes an error
    with pytest.raises(exceptions.VirtualMachineError):
        tx = cnt.storeReview(target_entity, 1, 'pmpom', {'from': inserting_entity})
        tx.wait(1)

    terminate(proc)