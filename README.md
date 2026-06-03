# 🤖 AI Chatbot

A full-stack AI chatbot built with **React** (frontend) and **Python FastAPI** (backend), powered by **Claude claude-sonnet-4-20250514** via the Anthropic API.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![Claude](https://img.shields.io/badge/Claude-Sonnet_4-D97757?logo=anthropic&logoColor=white)

---

## ✨ Features

- 💬 **Multi-turn conversation** — full chat history passed to the model
- 🎨 **Polished dark UI** — editorial aesthetic with markdown rendering
- ⚡ **FastAPI backend** — fast, typed, auto-documented REST API
- 📊 **Token tracking** — live input/output token counts
- ♿ **Accessible** — keyboard navigation, ARIA labels
- 🔒 **Secure** — API key kept server-side only
- 📱 **Responsive** — works on desktop and mobile

---

## 📁 Project Structure

```
ai-chatbot/
├── backend/
│   ├── main.py              # FastAPI app & /chat endpoint
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment template
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Root layout & state
│   │   ├── components/
│   │   │   ├── MessageBubble.jsx   # Chat bubble (user/AI)
│   │   │   ├── TypingIndicator.jsx # Animated loading state
│   │   │   └── ChatInput.jsx       # Textarea + send button
│   │   ├── hooks/
│   │   │   └── useChat.js   # Chat state & API calls
│   │   └── utils/
│   │       └── api.js       # fetch wrapper
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

---

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/ai-chatbot.git
cd ai-chatbot
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

Start the API server:

```bash
uvicorn main:app --reload --port 8000
```

API is now live at `http://localhost:8000`  
Interactive docs: `http://localhost:8000/docs`

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment (optional)
cp .env.example .env
# VITE_API_URL defaults to http://localhost:8000

# Start dev server
npm run dev
```

Frontend is now live at `http://localhost:5173`

---

## 🔌 API Reference

### `POST /chat`

Send a message with full conversation history.

**Request body:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi! How can I help?" },
    { "role": "user", "content": "Tell me a joke" }
  ]
}
```

**Response:**
```json
{
  "reply": "Why don't scientists trust atoms? Because they make up everything!",
  "model": "claude-sonnet-4-20250514",
  "input_tokens": 42,
  "output_tokens": 18
}
```

### `GET /health`

Returns `{ "status": "healthy" }` — useful for uptime checks.

---

## 🎨 Customization

### Change the system prompt

Edit `SYSTEM_PROMPT` in `backend/main.py` to give your chatbot a different personality, role, or domain focus.

### Swap the model

Change the `model` parameter in `main.py`. Options: `claude-haiku-4-5-20251001`, `claude-sonnet-4-20250514`, `claude-opus-4-20250514`.

### Adjust max tokens

Increase or decrease `max_tokens` in `main.py` to control response length and cost.

---

## 🏗️ Deployment

### Backend (e.g. Railway, Render, Fly.io)

1. Set `ANTHROPIC_API_KEY` as an environment variable
2. Update the `allow_origins` CORS list in `main.py` to your frontend URL
3. Run: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (e.g. Vercel, Netlify)

1. Set `VITE_API_URL` to your deployed backend URL
2. Run `npm run build` — deploy the `dist/` folder

---

## 📝 License

MIT — free to use, modify, and distribute.
