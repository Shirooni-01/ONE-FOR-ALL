# 🚀 ONE FOR ALL

**ONE FOR ALL** is a modern multi-utility web application built with **Flask** that combines several useful tools into one platform. Instead of creating separate applications for every task, this project brings them together under a single dashboard with a unified user experience.

Whether you need to take notes, chat with AI, generate passwords, create QR codes, or convert units, everything is available in one place.

---

## ✨ Features

* 🔐 User Authentication (Register & Login)
* 📝 Notes Manager
* 🤖 AI Chat Assistant (Google Gemini)
* ❓ Quiz Application
* 🔑 Secure Password Generator
* 📱 QR Code Generator
* 📏 Unit Converter
* ✍️ Text Utilities
* 🎨 Responsive Dashboard
* 🌙 Clean & Modern UI

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* Flask

### Database

* SQLite

### AI

* Google Gemini API

### Deployment

* Railway

---

## 📂 Project Structure

```text
ONE-FOR-ALL/
│
├── app.py
├── auth.py
├── requirements.txt
├── .env.example
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── templates/
│
├── routes/
│   ├── notes.py
│   ├── quiz.py
│   ├── ai_chat.py
│   └── ...
│
└── database/
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Shirooni-01/ONE-FOR-ALL.git
```

```bash
cd ONE-FOR-ALL
```

### 2. Create a Virtual Environment

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

**Linux / macOS**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the project root.

```env
API_KEY=YOUR_GEMINI_API_KEY
```

### 5. Run the Application

```bash
python app.py
```

Open your browser and visit:

```
http://127.0.0.1:5000
```

---

## 📸 Modules

| Module             | Description                               |
| ------------------ | ----------------------------------------- |
| Authentication     | User registration and login system        |
| Notes              | Create, edit and delete personal notes    |
| AI Chat            | Chat with Google Gemini AI                |
| Quiz               | Attempt quizzes and test knowledge        |
| Password Generator | Generate strong random passwords          |
| QR Generator       | Create QR codes instantly                 |
| Unit Converter     | Convert between various measurement units |
| Text Utilities     | Useful text formatting and editing tools  |

---

## 🔒 Environment Variables

| Variable  | Description           |
| --------- | --------------------- |
| `API_KEY` | Google Gemini API Key |

---

## 📦 Requirements

* Python 3.10+
* Flask
* SQLite
* Google Gemini API Key

---

## 🚀 Future Improvements

* Profile Management
* Dark Mode
* File Upload Support
* Notes Search
* Quiz Score History
* AI Chat History
* Better Dashboard Analytics
* Progressive Web App (PWA)
* Docker Support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Shirooni**

GitHub: https://github.com/Shirooni-01
Deployed : https://one-for-all-01.up.railway.app/

---

⭐ If you found this project useful, consider giving it a **Star** on GitHub!
