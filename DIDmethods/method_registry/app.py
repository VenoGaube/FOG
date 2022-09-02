from flask import Flask, request, send_from_directory
from flask_cors import CORS
import web3
from web3.exceptions import ContractLogicError
import json
import uuid
import os


app = Flask(__name__)
CORS(app)

# retrieve paper method contract
w3 = web3.Web3(web3.HTTPProvider("http://127.0.0.1:7545"))
with open("build/contracts/PaperMethod.json", "r") as f:
    method_json = json.load(f)
paper_method_abi = method_json["abi"]
network_id = list(method_json["networks"].keys())[0]
paper_method_address = method_json["networks"][network_id]["address"]
paper_method_contract = w3.eth.contract(address=paper_method_address, abi=paper_method_abi)


@app.route("/<did>/create/", methods=["POST"])
def save_new_paper_submission(did):
    paper_uuid = did.split(":")[-1]
    file = request.files["file"]
    filepath = f"res/papers/{paper_uuid}.pdf"

    with open(filepath, "x"):
        try:
            file.save(filepath)
        except:
            return "Error", 500

    return f"Paper submitted and DID created: {did}", 201


@app.route("/<did>/update-file", methods=["POST"])
def update_paper_pdf(did):
    paper_uuid = did.split(":")[-1]
    filepath = f"res/papers/{paper_uuid}.pdf"
    if not os.path.exists(filepath):
        return "Cannot update paper PDF: PDF Doesn't exist", 400

    file = request.files["file"]
    with open(filepath, "w"):
        try:
            file.save(filepath)
        except:
            return "Error", 500

    return f"Updating paper PDF with did {did} successful", 200


@app.route("/<did>/delete", methods=["POST"])
def delete_paper_pdf(did):
    paper_uuid = did.split(":")[-1]
    filepath = f"res/papers/{paper_uuid}.pdf"
    if not os.path.exists(filepath):
        return "Cannot delete paper PDF: Paper with specified DID doesn't exist", 400

    os.remove(filepath)
    return "Paper PDF with DID successfully deleted", 200


@app.route("/<did>/pdf", methods=["GET"])
def get_paper_pdf(did):
    paper_uuid = did.split(":")[-1]
    filepath = f"res/papers/{paper_uuid}.pdf"
    if not os.path.exists(filepath):
        return "Paper with specified DID does not exist", 400

    return send_from_directory("res/papers/", f"{paper_uuid}.pdf")


@app.route("/api/fetch-paper-method-contract-data", methods=["GET"])
def get_paper_method_contract_data():
    return {"abi": paper_method_abi, "address": paper_method_address}


@app.route("/api/generate-paper-did", methods=["GET"])
def generate_paper_did():
    while True:
        paper_did = "did:paper:" + uuid.uuid4().hex
        # make sure that uuid is actually unique
        if not os.path.exists(f"res/papers/{paper_did}.pdf"):
            return paper_did


@app.route("/api/<did>/data-from-contract", methods=["GET"])
def get_did_data_from_contract(did):
    try:
        paper_data = paper_method_contract.functions.getPaperData(did).call()
        paper_data_dict = {
            "did": paper_data[0],
            "author": paper_data[1],
            "title": paper_data[2],
            "keywords": paper_data[3],
            "abstract": paper_data[4],
            "status": paper_data[5],
            "changeType": paper_data[6],
            "timestampCreated": paper_data[7],
            "timestampChanged": paper_data[8]
        }
        return paper_data_dict, 200
    except ContractLogicError as e:
        return str(e), 400


if __name__ == "__main__":
    app.run(port=5002)
