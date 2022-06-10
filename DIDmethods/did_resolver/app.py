from flask import Flask, jsonify, abort, render_template
from endpoint_functions.methods import supported_methods
from endpoint_functions.identifiers import resolve_identifier
from endpoint_functions.resolve_whole import resolve_whole

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['JSON_SORT_KEYS'] = False


@app.route("/")
def root_ui():
    return render_template("resolver.html")


@app.route("/api/methods", methods=["GET"])
def get_methods():
    return supported_methods(), 200


@app.route("/api/identifiers/<did>", methods=["GET"])
def get_did_document(did):
    resolved, status_code = resolve_identifier(did)
    if status_code in [400, 404]:
        abort(status_code, description=resolved)

    return jsonify(resolved), status_code


@app.route("/api/resolve-whole/<did>", methods=["GET"])
def get_whole_resolved(did):
    resolved, status_code = resolve_whole(did)
    return jsonify(resolved), status_code


if __name__ == "__main__":
    app.run()
