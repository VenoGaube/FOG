from .util import check_did_formatting
from .identifiers import resolve_paper_did, get_paper_data
import time
import datetime

# key strings for resolved JSON
resolution_metadata, did_document, document_metadata = "resolutionMetadata", "didDocument", "didDocumentMetadata"


def timestamp_seconds_to_xml_datetime(timestamp):
    date = datetime.datetime.utcfromtimestamp(timestamp)
    return date.strftime("%Y-%m-%dT%H:%M:%SZ")


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
    paper_data = get_paper_data(did_identifier)
    val_did_document, status_code = resolve_paper_did(did_identifier, paper_data)

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

    val_document_metadata = {
        "created": timestamp_seconds_to_xml_datetime(paper_data["timestampCreated"]),
        "updated": timestamp_seconds_to_xml_datetime(paper_data["timestampChanged"]),
        "updateType": paper_data["changeType"],
        "status": paper_data["status"],
        "controllerRoles": [{
            "author": paper_data["author"]
        }]
    }

    return {
               resolution_metadata: {
                   "contentType": "application/did+ld+json",
                   "retrieved": timestamp_seconds_to_xml_datetime(time.time())
               },
               did_document: val_did_document,
               document_metadata: val_document_metadata
           }, 200
