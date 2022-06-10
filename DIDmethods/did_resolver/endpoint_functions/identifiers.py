from .methods import get_supported_methods_list


def build_test_example(did_method, did_identifier, did_controller):
    return {
        "@context": "https://www.w3.org/ns/did/v1",
        "id": f"did:{did_method}:{did_identifier}",
        "controller": str(did_controller)
    }


test_examples = {
    "1234": (build_test_example("paper", "1234", "0x111111111111111111111111111111111111111111"), 200),
    "12345": (build_test_example("paper", "12345", "0x000000000000000000000000000000000000000000"), 200),
    "1234abc": ([], 410)  # deleted DID example, use code 410
}


def resolve_identifier(did):
    split_by_colon = did.split(":")
    if len(split_by_colon) != 3:
        return "Invalid input", 400
    did_indicator, did_method, did_identifier = split_by_colon
    if did_indicator != "did":
        return "Input is not a DID", 400
    if did_method not in get_supported_methods_list():
        return f"DID method '{did_method}' not supported by this resolver", 400

    if did_method == "paper":
        return resolve_paper_did(did_identifier)

    return "Invalid input", 400


def resolve_paper_did(did_identifier):
    if did_identifier in test_examples:
        return test_examples[did_identifier]

    # TODO: build DID document JSON here, according to paper data, fetched from blockchain/IPFS/Knowledge base
    return "DID document not found", 404
