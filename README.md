# 🍱 MealMind — Smart AI Meal Planner

> Stop wasting food. Start eating smart.

MealMind is a full-stack MERN application that helps you manage your pantry, get AI-powered recipe suggestions from ingredients you already own, and track your daily calories.

🌐 **Live Demo:** [mealmind-zei5.vercel.app](https://mealmind-zei5.vercel.app)

---

## ✨ Features

- 🔐 **Authentication** — Secure register/login with JWT
- 🧺 **Pantry Manager** — Add ingredients with category, quantity and expiry date
- 🤖 **AI Recipe Suggestions** — Get 3 recipes generated from your pantry using OpenRouter AI
- 🛒 **Grocery List** — See exactly what ingredients you're missing for each recipe
- 📋 **Meal Logger** — Log meals with calories and meal type
- 🔥 **Calorie Tracker** — Track daily calories with a visual progress bar
- 📊 **Dashboard** — Live stats for pantry items, meals logged and today's calories

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| AI | OpenRouter API (Llama 4) |
| Deployment | Vercel (frontend), Render (backend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- OpenRouter API key (free at openrouter.ai)

### Clone the repo
```bash
git clone https://github.com/shatakshi-1404/mealmind.git
cd mealmind
```

### Backend Setup
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
OPENROUTER_API_KEY=your_openrouter_key
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

---

## 📁 Project Structure
mealmind/
├── client/                 # React frontend
│   └── src/
│       ├── api/            # Axios config
│       ├── components/     # Navbar, Loader, PrivateRoute
│       ├── context/        # Auth context
│       └── pages/          # Dashboard, Pantry, Recipes, MealLog
└── server/                 # Node.js backend
├── controllers/        # Business logic
├── models/             # Mongoose schemas
├── routes/             # API routes
└── middleware/         # Auth middleware

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/ingredients | Get all pantry items |
| POST | /api/ingredients | Add ingredient |
| DELETE | /api/ingredients/:id | Remove ingredient |
| GET | /api/recipes/suggest | Get AI recipe suggestions |
| POST | /api/meals | Log a meal |
| GET | /api/meals | Get meal logs |

---

## 🤝 Connect

Built by **Shatakshi** — actively looking for full-stack developer opportunities!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/shatakshi-prasad-9104772b8/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/shatakshi-1404)
