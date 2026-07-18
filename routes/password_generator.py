from flask import Flask, render_template, request
import secrets
import string

# Character pools
keys = string.ascii_letters + string.digits + string.punctuation

# Pronounceable syllables
syllables = [
    "ba", "be", "bi", "bo", "bu",
    "ka", "ke", "ki", "ko", "ku",
    "la", "le", "li", "lo", "lu",
    "ma", "me", "mi", "mo", "mu",
    "na", "ne", "ni", "no", "nu",
    "pa", "pe", "pi", "po", "pu",
    "ra", "re", "ri", "ro", "ru",
    "sa", "se", "si", "so", "su",
    "ta", "te", "ti", "to", "tu"
]

password_history = []


def generate_random_password():
    password = ""

    password += secrets.choice(string.ascii_uppercase)
    password += secrets.choice(string.ascii_lowercase)
    password += secrets.choice(string.digits)
    password += secrets.choice(string.punctuation)

    length = secrets.randbelow(9) + 8

    while len(password) < length:
        password += secrets.choice(keys)

    password = list(password)
    secrets.SystemRandom().shuffle(password)

    return "".join(password)


def generate_pronounceable_password():
    word = ""

    for _ in range(4):
        word += secrets.choice(syllables)

    word = word.capitalize()
    word += secrets.choice(string.digits)
    word += secrets.choice(string.digits)
    word += secrets.choice("@#$%&!?")

    return word


def password_strength(password):

    score = 0

    if len(password) >= 12:
        score += 2
    elif len(password) >= 8:
        score += 1

    if any(c.isupper() for c in password):
        score += 1

    if any(c.islower() for c in password):
        score += 1

    if any(c.isdigit() for c in password):
        score += 1

    if any(c in string.punctuation for c in password):
        score += 1

    if score >= 5:
        rating = "Very Strong 💪"
    elif score == 4:
        rating = "Strong ✅"
    elif score == 3:
        rating = "Moderate ⚠️"
    else:
        rating = "Weak ❌"

    return score, rating


def init_password(app):

    @app.route("/password", methods=["GET", "POST"])
    def password():

        if request.method == "POST":

            pronounceable = request.form.get("pronounceable")

            if pronounceable:
                generated_password = generate_pronounceable_password()
            else:
                generated_password = generate_random_password()

            password_history.insert(0, generated_password)

            if len(password_history) > 20:
                password_history.pop()

            score, rating = password_strength(generated_password)

            return render_template(
                "password.html",
                generated_password=generated_password,
                rating=rating,
                score=score,
                password_history=password_history,
            )

        return render_template(
            "password.html",
            generated_password=None,
            rating=None,
            score=0,
            password_history=password_history,
        )