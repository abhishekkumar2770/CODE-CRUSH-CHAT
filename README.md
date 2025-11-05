# 💬 CODE-CRUSH-CHAT

A full-stack real-time chat platform built using **Socket.IO**, **React**, **Node.js**, and **MongoDB**, enabling seamless communication with instant messaging, typing indicators, and room-based interactions.

---

## 🚀 Features

- 🔐 **JWT Authentication** — Secure login and user validation  
- 💬 **Instant Messaging** — Real-time message delivery using Socket.IO  
- 👥 **Room Management** — Join or leave rooms dynamically  
- ✍️ **Typing Indicators** — Show when someone is typing  
- 📜 **Message History** — Stores last 20 messages per room (in-memory)  
- 🟢 **User Presence** — Real-time online/offline tracking  
- ⏱️ **Message Timestamps & Read Receipts**  
- 😄 **Emoji Support**  
- 📱 **Responsive UI** — Built with React + Tailwind CSS (98% Lighthouse performance score)

---

## 🛠️ Tech Stack

**Frontend:** React.js, Vite, TailwindCSS, Socket.IO Client  
**Backend:** Node.js, Express.js, MongoDB, Socket.IO, JWT  
**Database:** MongoDB (for users & messages)  
**Auth:** JSON Web Token (JWT)  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/abhishekkumar2770/CODE-CRUSH-CHAT.git
cd realtime-chat
```

### 2️⃣ Install dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 3️⃣ Create environment files

#### In `/server/.env`
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

#### In `/client/.env`
```
VITE_BACKEND_URL=http://localhost:5000
```

### 4️⃣ Run the project

#### Start Backend
```bash
cd server
npm run dev
```

#### Start Frontend
```bash
cd client
npm run dev
```

Then open **http://localhost:5173** in your browser 🎉

---

## 📡 API Documentation

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and get JWT token |
| `GET`  | `/api/messages/:roomId` | Fetch last 20 messages from a room |
| `POST` | `/api/messages` | Send a new message |
| `GET`  | `/api/users/online` | Get list of online users |

---

## 🧠 WebSocket Events

| Event | Description |
|-------|--------------|
| `join_room` | User joins a specific room |
| `send_message` | Sends message to other users in the room |
| `typing` | Broadcast typing indicator |
| `read_receipt` | Notify others when a message is read |
| `user_status` | Updates user online/offline status |

---

## 💡 Challenges Faced & Solutions

### ⚙️ 1. Real-Time State Sync
**Challenge:** Messages and typing indicators were not syncing instantly between users.  
**Solution:** Used `Socket.IO` rooms and event broadcasting to ensure each room received live updates in real time.

### 🔐 2. Authentication with WebSockets
**Challenge:** Securing WebSocket connections per user.  
**Solution:** Verified JWT tokens before establishing socket connections using middleware.

### 🧩 3. Efficient Message Storage
**Challenge:** Managing last 20 messages per room without heavy DB queries.  
**Solution:** Implemented an in-memory cache using a simple queue structure for each room.

### 🎨 4. Responsive UI
**Challenge:** Maintaining a consistent layout across mobile and desktop.  
**Solution:** Leveraged TailwindCSS grid system and dynamic message container resizing.

---

