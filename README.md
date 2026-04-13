#  Cloud Live Streaming Platform 

## 📌 What is this?

This is a **multi-user live streaming platform** where users can:

* Register & Login
* Create their own live stream
* Stream using OBS
* Watch live video in browser

It is built using **Node.js + MongoDB + AWS IVS** and supports **real-time streaming with OBS**.

---

## 🧱 Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express
* Database: MongoDB
* Streaming: AWS IVS
* Video Player: HLS.js

---

## 📁 Project Structure

```
project/
│
├── api/                  # Backend
│   ├── config/
│   │   └── streamProvider.js
│   ├── models/
│   │   └── Stream.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── stream.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── .env
│
├── frontend/             # Frontend
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── createStream.html
│   └── watch.html
│
└── README.md
```

---

## 🔥 How It Works

### 1. User Authentication

* User registers account
* Logs in
* Backend sends JWT token
* Token stored in browser

---

### 2. Create Live Stream

* User clicks **Create Stream**
* Backend creates AWS IVS channel
* Returns:

  * RTMPS Server (for OBS)
  * Stream Key
  * Playback URL

---

### 3. OBS Streaming

Open OBS and set:

```
Service: Custom
Server: (from backend)
Stream Key: (from backend)
```

Click **Start Streaming**

---

### 4. Watch Live Stream

User clicks:

```
Open Player
```

It opens:

```
watch.html?id=PLAYBACK_URL
```

Video plays using HLS player.

---

## 🎥 OBS Configuration Example

```
Server: rtmps://xxxx.global-contribute.live-video.net:443/app
Stream Key: sk_xxxxxxxxx
```

---

## 📺 Video Player

* Uses HLS streaming
* Auto plays live video
* Works in all modern browsers

---

## 🌐 Works on Mobile Hotspot

✅ This project works perfectly on:

* Mobile hotspot
* WiFi
* Office network

### Reason:

* Uses **RTMPS (port 443)**
* Same as HTTPS
* Not blocked by ISPs

---

## 🔐 Environment Variables

Create `.env` file in `api/`:

```
AWS_REGION=your_region
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
JWT_SECRET=your_secret
```

---

## ▶️ How to Run

### 1. Backend

```
cd api
npm install
node server.js
```

---

### 2. Frontend

Open in browser:

```
frontend/login.html
```

---

## 🧪 Testing Flow

1. Register
2. Login
3. Create stream
4. Copy OBS details
5. Start streaming in OBS
6. Click "Open Player"
7. Watch live video

---

## 🚀 Features

* Multi-user system
* Secure authentication (JWT)
* OBS streaming support
* Live playback
* Works globally
* No DNS issues

---

## 🎯 Final Result

You now have a **complete live streaming platform** like YouTube Live:

✔ Users can go live
✔ OBS streaming works
✔ Video plays in browser
✔ Works even on mobile hotspot

---



