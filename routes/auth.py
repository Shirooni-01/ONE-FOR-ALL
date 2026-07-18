import os
import sqlite3
from flask import Flask, current_app, flash, g, redirect, render_template, request, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash


def get_db():
    if "db" not in g:
        conn = sqlite3.connect(current_app.config["DATABASE"])
        conn.row_factory = sqlite3.Row
        g.db = conn
    return g.db


def close_db(exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db():
    db = get_db()
    db.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    db.commit()


def init_auth(app: Flask):
    app.config["SECRET_KEY"] = app.config.get("SECRET_KEY") or os.getenv("SECRET_KEY") or "dev-secret-key"
    app.secret_key = app.config["SECRET_KEY"]
    app.config.setdefault("DATABASE", os.path.join(app.root_path, "users.db"))
    app.teardown_appcontext(close_db)

    with app.app_context():
        init_db()

    @app.route("/login", methods=["GET", "POST"])
    def login():
        if session.get("user_id"):
            return redirect(url_for("dashboard"))

        if request.method == "POST":
            email = request.form.get("email", "").strip()
            password = request.form.get("password", "")

            if not email or not password:
                flash("Email and password are required.", "error")
            else:
                user = get_db().execute(
                    "SELECT * FROM users WHERE email = ?",
                    (email,),
                ).fetchone()

                if user and check_password_hash(user["password"], password):
                    session.clear()
                    session["user_id"] = user["id"]
                    session["username"] = user["username"]
                    session["email"] = user["email"]
                    session["name"] = user["name"]
                    flash("Login successful.", "success")
                    return redirect(url_for("dashboard"))

                flash("Invalid email or password.", "error")

        return render_template("login.html")

    @app.route("/register", methods=["GET", "POST"])
    def register():
        if session.get("user_id"):
            return redirect(url_for("dashboard"))

        if request.method == "POST":
            name = request.form.get("name", "").strip()
            username = request.form.get("username", "").strip()
            email = request.form.get("email", "").strip()
            password = request.form.get("password", "")
            confirm_password = request.form.get("confirm_password", "")

            if not all([name, username, email, password, confirm_password]):
                flash("All fields are required.", "error")
            elif password != confirm_password:
                flash("Passwords do not match.", "error")
            else:
                existing_username = get_db().execute(
                    "SELECT id FROM users WHERE username = ?",
                    (username,),
                ).fetchone()
                existing_email = get_db().execute(
                    "SELECT id FROM users WHERE email = ?",
                    (email,),
                ).fetchone()

                if existing_username:
                    flash("Username already exists.", "error")
                elif existing_email:
                    flash("Email already exists.", "error")
                else:
                    hashed_password = generate_password_hash(password)
                    get_db().execute(
                        "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)",
                        (name, username, email, hashed_password),
                    )
                    get_db().commit()
                    flash("Registration successful. Please log in.", "success")
                    return redirect(url_for("login"))

        return render_template("register.html")

    @app.route("/logout")
    def logout():
        session.clear()
        flash("You have been logged out.", "success")
        return redirect(url_for("login"))
