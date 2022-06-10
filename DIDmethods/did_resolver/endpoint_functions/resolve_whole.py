from .util import check_did_formatting
from .identifiers import resolve_paper_did


# key strings for resolved JSON
resolution_metadata, did_document, document_metadata = "resolutionMetadata", "didDocument", "didDocumentMetadata"


def resolve_whole(did):
    properly_formatted, format_res = check_did_formatting(did)
    if not properly_formatted:
        if format_res[-1] == 400:
            if format_res[0].startswith("DID method"):
                error_msg = "methodNotSupported"
            else:
                error_msg = "invalidDid"

            return {
                       resolution_metadata: {"error": error_msg},
                       did_document: None,
                       document_metadata: []
                   }, 400
        return format_res
    did_indicator, did_method, did_identifier = format_res

    if did_method == "paper":
        return resolve_whole_paper(did_identifier)

    return "Invalid input", 400


def resolve_whole_paper(did_identifier):
    val_did_document, status_code = resolve_paper_did(did_identifier)
    if status_code == 404:
        return {
                   resolution_metadata: {"error": "notFound"},
                   did_document: None,
                   document_metadata: []
               }, 404
    if status_code == 410:
        return {
                   resolution_metadata: [],
                   did_document: None,
                   document_metadata: {"deactivated": True}
               }, 410

    val_document_metadata = ["TODO"]
    val_resolution_metadata = ["TODO"]

    return {
               resolution_metadata: val_resolution_metadata,
               did_document: val_did_document,
               document_metadata: val_document_metadata
           }, 200
