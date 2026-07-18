import os
import sys

from flask import Flask, flash, redirect, render_template, request, session, url_for

sys.path.insert(0, os.path.dirname(__file__))

from routes.auth import init_auth
from routes.notes import init_notes
from routes.quiz import init_quiz
from routes.password_generator import init_password
from routes.ai_chat import init_ai

app = Flask(__name__)

init_auth(app)
init_notes(app)
init_quiz(app)
init_password(app)
init_ai(app)

PROTECTED_ROUTES = {"dashboard", "notes", "quiz", "password", "qr", "unit", "text", "ai"}


@app.before_request
def protect_routes():
    if request.endpoint in PROTECTED_ROUTES and not session.get("user_id"):
        flash("Please log in to continue.", "error")
        return redirect(url_for("login"))

    if request.endpoint in {"login", "register"} and session.get("user_id"):
        return redirect(url_for("dashboard"))


# ===============================
# Dashboard
# ===============================

@app.route("/")
def dashboard():
    return render_template("dashboard.html", user_name=session.get("name"))

# ===============================
# QR Generator
# ===============================

@app.route("/qr")
def qr():
    return render_template("qr.html")


# ===============================
# Unit Converter
# ===============================

@app.route("/unit")
def unit():
    return render_template("unit.html")


# ===============================
# Text Utilities
# ===============================

@app.route("/text")
def text():
    return render_template("text.html")



if __name__ == "__main__":
    app.run(debug=True)