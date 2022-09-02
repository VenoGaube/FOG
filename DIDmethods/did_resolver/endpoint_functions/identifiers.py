from .util import check_did_formatting
import requests


def get_paper_data(did_identifier):
    response = requests.get(f"http://127.0.0.1:5002/api/did:paper:{did_identifier}/data-from-contract")
    if response.status_code == 400:
        return {}

    return response.json()


def resolve_identifier(did):
    properly_formatted, format_res = check_did_formatting(did)
    if not properly_formatted:
        return format_res
    did_indicator, did_method, did_identifier = format_res

    if did_method == "paper":
        return resolve_paper_did(did_identifier, get_paper_data(did_identifier))

    return "Invalid input", 400


def resolve_paper_did(did_identifier, paper_data):
    if paper_data == {}:
        return "DID document not found", 404

    if paper_data["status"] == "deactivated":
        return None, 410

    did = f"did:paper:{did_identifier}"
    did_document = {
        "@context": "https://www.w3.org/ns/did/v1",
        "id": did,
        "controller": paper_data["author"],
    }

    return did_document, 200
