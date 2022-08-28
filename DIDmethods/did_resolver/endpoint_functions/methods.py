from flask import jsonify

supported_did_methods = ["paper"]


def supported_methods():
    return jsonify(supported_did_methods)


def get_supported_methods_list():
    return supported_did_methods
