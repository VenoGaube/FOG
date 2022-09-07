from flask import Flask, render_template, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def ui_root():
    return redirect(url_for("show_my"))


@app.route("/connect")
def connect_page():
    return render_template("connect.html")


@app.route("/journal/published-papers")
def show_published():
    return render_template("journal/published_papers.html")


@app.route("/journal/my-papers")
def show_my():
    return render_template("journal/my_papers.html")


@app.route("/journal/papers-to-review")
def show_papers_to_review():
    return render_template("journal/papers_to_review.html")


@app.route("/journal/submit-paper")
def submit_paper():
    return render_template("journal/submit_paper.html")


@app.route("/journal/<did>/view")
def view_paper(did):
    return render_template("journal/view_paper.html", did=did)


@app.route("/journal/<did>/read", methods=["GET"])
def read_paper(did):
    pdf_url = f"http://127.0.0.1:5002/{did}/pdf"
    return render_template("journal/read_paper.html", pdfUrl=pdf_url, did=did)


@app.route("/<did>/edit")
def edit_paper(did):
    return render_template("journal/edit_paper.html", did=did)


@app.route("/did:paper:<uuid>/delete")
def handle_did_url_delete(uuid):
    return render_template("did_url_delete.html", did=f"did:paper:{uuid}", operation="delete")


if __name__ == "__main__":
    app.run(port=80)
