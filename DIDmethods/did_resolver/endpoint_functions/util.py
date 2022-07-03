from .methods import get_supported_methods_list


def check_did_formatting(did):
    split_by_colon = did.split(":")
    if len(split_by_colon) != 3:
        return False, ("Invalid input", 400)
    did_indicator, did_method, did_identifier = split_by_colon
    if did_indicator != "did":
        return False, ("Input is not a DID", 400)
    if did_method not in get_supported_methods_list():
        return False, (f"DID method '{did_method}' not supported by this resolver", 400)

    return True, split_by_colon
