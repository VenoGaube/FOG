from flask import Flask, jsonify, abort
from endpoint_functions.methods import supported_methods
from endpoint_functions.identifiers import resolve_identifier

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['JSON_SORT_KEYS'] = False


@app.route("/")
def root_message():
    return "DID resolver for Decentralized Journal."


@app.route("/methods", methods=["GET"])
def get_methods():
    return supported_methods(), 200


@app.route("/identifiers/<did>", methods=["GET"])
def get_did_document(did):
    resolved, status_code = resolve_identifier(did)
    if status_code in [400, 404]:
        abort(status_code, description=resolved)

    return jsonify(resolved), status_code


if __name__ == "__main__":
    app.run()
