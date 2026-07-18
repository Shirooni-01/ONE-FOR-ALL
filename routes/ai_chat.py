from flask import render_template, request, jsonify
from google import genai
import dotenv
import os
import time

# ==============================
# Load Environment Variables
# ==============================

dotenv.load_dotenv()

API_KEY = os.getenv("API_KEY")

client = None

if API_KEY:
    client = genai.Client(api_key=API_KEY)


def init_ai(app):

    # ==============================
    # AI Chat Page
    # ==============================

    @app.route("/ai")
    def ai():

        return render_template("ai_chat.html")

    # ==============================
    # AI Chat API
    # ==============================

    @app.route("/chat", methods=["POST"])
    def chat():

        if client is None:

            return jsonify({
                "success": False,
                "response": "Gemini API key not found."
            }), 500

        try:

            data = request.get_json()

            if not data:

                return jsonify({
                    "success": False,
                    "response": "No data received."
                }), 400

            user_input = data.get("user_input", "").strip()

            if not user_input:

                return jsonify({
                    "success": False,
                    "response": "Please enter a message."
                }), 400

            retries = 3

            for attempt in range(retries):

                try:

                    response = client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=user_input
                    )

                    return jsonify({
                        "success": True,
                        "response": response.text
                    })

                except Exception as e:

                    error = str(e)

                    if "503" in error and attempt < retries - 1:
                        time.sleep(2)
                        continue

                    raise

        except Exception as e:

            return jsonify({
                "success": False,
                "response": str(e)
            }), 500