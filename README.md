# Real-time Screen Sharing System

A simple, lightweight screen sharing application using Node.js, Express, Socket.io, and WebRTC.

## Features
- **Real-time Screen Sharing:** Low latency streaming using WebRTC.
- **Dynamic Rooms:** Support for multiple rooms via URL parameters (e.g., `?room=meeting1`).
- **Minimalist UI:** Vanilla HTML/CSS/JS.
- **Cross-Network Support:** Uses Google's public STUN server.

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open in browser:
   - **Admin (Viewer):** `http://localhost:3000/admin.html`
   - **Client (Sharer):** `http://localhost:3000/index.html`

## Deployment

To deploy this app, you need a service that supports Node.js (like Render, Railway, or Heroku).

### Deploy to Render (Free)
1. Push this code to GitHub.
2. Go to [Render.com](https://render.com).
3. Create a **New Web Service**.
4. Connect your GitHub repo.
5. Set the **Build Command** to `npm install`.
6. Set the **Start Command** to `node server.js`.
