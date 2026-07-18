from flask import render_template, request, session, redirect, url_for
import random as r
import requests


def init_quiz(app):

    @app.route("/quiz", methods=["GET", "POST"])
    def quiz_home():

        if request.method == "POST":

            no_ques = request.form.get("no_ques")
            category = request.form.get("category")
            diff = request.form.get("diff")
            q_type = request.form.get("type")

            question = requests.get(
                f"https://opentdb.com/api.php?amount={no_ques}&category={category}&difficulty={diff}&type={q_type}"
            )

            session["questions"] = question.json()
            session["score"] = 0
            session["current_question"] = 0

            return redirect(url_for("quiz"))

        return render_template("quiz_home.html")

    @app.route("/quiz/play", methods=["GET", "POST"])
    def quiz():

        if "questions" not in session:
            return redirect(url_for("quiz_home"))

        question_no = len(session["questions"]["results"])

        # ---------- User submitted answer ----------
        if request.method == "POST":

            current = session["questions"]["results"][session["current_question"]]

            answer = request.form.get("answer")

            if answer == current["correct_answer"]:
                session["score"] += 1

            session["current_question"] += 1

            if session["current_question"] >= question_no:
                return redirect(url_for("result"))

            return redirect(url_for("quiz"))

        # ---------- Show Question ----------

        current = session["questions"]["results"][session["current_question"]]

        question = current["question"]

        options = current["incorrect_answers"].copy()
        options.append(current["correct_answer"])
        r.shuffle(options)

        progress = (session["current_question"] / question_no) * 100

        return render_template(
            "quiz.html",
            question=question,
            options=options,
            progress=progress,
            current=session["current_question"] + 1,
            total=question_no,
        )

    @app.route("/result")
    def result():

        if "questions" not in session:
            return redirect(url_for("quiz_home"))

        score = session["score"]
        per = (score / len(session["questions"]["results"])) * 100

        if 90 <= per <= 100:
            grade = "A"
            comment = "Well Done Hero !!"
        elif 80 <= per < 90:
            grade = "B"
            comment = "Keep Going !!"
        elif 70 <= per < 80:
            grade = "C"
            comment = "Can Do Better !!"
        elif 60 <= per < 70:
            grade = "D"
            comment = "Not Bad !!"
        elif 50 <= per < 60:
            grade = "E"
            comment = "Need To Work Hard !!"
        else:
            grade = "F"
            comment = "Not Quite Good, But You Can Do Better !!"

        return render_template(
            "result.html",
            score=score,
            per=per,
            grade=grade,
            comment=comment,
        )