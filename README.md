<h1 align="center">
  <br>
  🖼️ QuickEdit Image Editor
  <br>
</h1>

<p align="center">
  <strong>A full-stack image editing web application with real-time preview, cloud storage integration, and a sleek dark UI.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Sharp-Image_Processing-00C4CC?style=for-the-badge&logo=sharp&logoColor=white" />
  <img src="https://img.shields.io/badge/ImageKit-Cloud_Storage-F7B731?style=for-the-badge" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a>
</p>

---

## 🚀 Live Demo

> Upload any image → Adjust filters & transforms in real time → Download locally or save to the cloud in one click.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎚️ **Real-Time Filter Adjustments** | Brightness, contrast, and saturation sliders with debounced live preview (400ms) |
| 🔄 **Image Transforms** | Rotate by arbitrary degrees and flip horizontally / vertically |
| ⚡ **Instant Preview** | Server-side processing via Sharp; result streamed back as a blob URL |
| ☁️ **Cloud Upload** | Save the edited image to **ImageKit CDN** with a single click; get back a shareable URL |
| 📥 **Local Download** | Download the processed JPEG directly to the user's device |
| 🔁 **One-Click Reset** | Restore all settings to their defaults instantly |
| 🍞 **Toast Notifications** | Stacked, auto-dismissing toasts for success, error, and info states |
| 📱 **Responsive Layout** | Sidebar collapses on mobile; full-screen canvas on desktop |
| 🛡️ **File Validation** | Client-side guard — only JPG, PNG, and WEBP files accepted |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** — latest concurrent features, `useCallback` / `useMemo` for performance
- **Tailwind CSS 4** — utility-first styling with a custom dark design system
- **Vite 8** — lightning-fast HMR dev server and optimized production build
- **Custom Hook** (`useImageEditor`) — all editor state and async logic in one reusable hook

### Backend
- **Node.js + Express 5** — minimal REST API with two image endpoints
- **Sharp** — high-performance native image processing (brightness, contrast, saturation, rotate, flip)
- **Multer** — memory-storage multipart/form-data file uploads (no disk I/O)
- **ImageKit SDK** — programmatic cloud upload and CDN delivery
- **dotenv** — environment-variable-based configuration

---

## 🏗️ Architecture

```
Browser (React + Vite)
        │
        │  POST /api/image/edit   ──►  multer (memory) ──► sharp pipeline ──► JPEG buffer ──► blob response
        │  POST /api/image/save   ──►  multer (memory) ──► sharp pipeline ──► base64 ──► ImageKit upload ──► URL
        │
Express Server (Node.js)
```

**Key Design Decisions:**

- **Memory storage over disk** — Multer is configured with `memoryStorage()`, so uploaded bytes never touch disk; Sharp reads straight from `req.file.buffer`. This is faster and avoids cleanup complexity.
- **Debounced processing** — The frontend waits 400 ms after the last slider change before firing the edit request, preventing request flooding while still feeling instant.
- **Blob URL lifecycle management** — The hook revokes the previous object URL before assigning the new one, preventing memory leaks over long editing sessions.
- **Separation of concerns** — API calls are isolated in `imageApi.js`, all state logic lives in `useImageEditor.js`, and each UI panel is its own component.

---

## 📡 API Reference

Base URL: `http://localhost:3000/api/image`

### `POST /edit`
Applies transformations to the uploaded image and **returns the processed image buffer** (for live preview / download).

**Request** — `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `image` | File | The image file (JPG / PNG / WEBP) |
| `brightness` | number | Multiplier — default `1.0` |
| `contrast` | number | Multiplier — default `1.0` |
| `saturation` | number | Multiplier — default `1.0` |
| `rotation` | number | Degrees (0 / 90 / 180 / 270) |
| `flipH` | boolean | Horizontal flip |
| `flipV` | boolean | Vertical flip |

**Response** — `image/jpeg` binary stream

---

### `POST /save`
Applies the same transformations then **uploads the result to ImageKit** and returns the CDN URL.

**Response** — `application/json`

```json
{
  "success": true,
  "url": "https://ik.imagekit.io/...",
  "fileId": "...",
  "name": "edited-1746000000000.jpg"
}
```

---

## 📁 Project Structure

```
Final Challenge/
├── backend/
│   ├── server.js                  # Express app entry point
│   └── src/
│       ├── controllers/
│       │   └── imageController.js  # editImage & saveToImageKit handlers
│       ├── middleware/
│       │   └── upload.js           # Multer memory storage config
│       ├── routes/
│       │   └── imageRoutes.js      # POST /edit & POST /save
│       └── services/
│           └── storage.services.js # ImageKit SDK wrapper
│
└── frontend/
    └── src/
        ├── App.jsx                 # Root layout — sidebar + preview grid
        ├── api/
        │   └── imageApi.js         # Fetch wrappers for both API endpoints
        ├── components/
        │   ├── Header.jsx          # App bar
        │   ├── Upload.jsx          # Drag-and-drop / file picker
        │   ├── Filters.jsx         # Brightness / contrast / saturation sliders
        │   ├── Transform.jsx       # Rotate & flip controls
        │   ├── Actions.jsx         # Download / Save to ImageKit / Reset buttons
        │   ├── Preview.jsx         # Live image canvas
        │   └── Toast.jsx           # Notification stack
        ├── hooks/
        │   └── useImageEditor.js   # All editor state & async logic
        └── utils/
            └── imageFile.js        # Client-side file type validator
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- An **ImageKit** account (free tier works) — [Sign up here](https://imagekit.io/)

### 1. Clone the repository

```bash
git clone https://github.com/RashikaLahoti/quickkit-image-editor.git
cd quickkit-image-editor
```

### 2. Configure the backend

```bash
cd backend
```

Create a `.env` file (copy from `.env.example`):

```env
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL=https://ik.imagekit.io/your_id
```

Install dependencies and start the server:

```bash
npm install
npm run dev      # starts on http://localhost:3000
```

### 3. Start the frontend

```bash
cd ../frontend
npm install
npm run dev      # starts on http://localhost:5173
```

### 4. Open the app

Navigate to **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `IMAGEKIT_PUBLIC_KEY` | ✅ | Your ImageKit public API key |
| `IMAGEKIT_PRIVATE_KEY` | ✅ | Your ImageKit private API key |
| `IMAGEKIT_URL` | ✅ | Your ImageKit URL endpoint |

> ⚠️ **Never commit your `.env` file.** It is listed in `.gitignore` by default.

---

## 🧠 What I Learned / Highlights

- **Sharp image pipeline** — chaining modulate (brightness/saturation) and linear (contrast) operations efficiently on a single buffer pass
- **Memory-only file handling** — avoided disk writes entirely with Multer's `memoryStorage`, keeping the API stateless and fast
- **React custom hook patterns** — extracted all editor state into `useImageEditor` for clean separation and full reusability
- **Blob URL memory management** — learned to revoke stale object URLs to prevent memory leaks in long-running SPA sessions
- **Debounce strategy** — implemented a `useRef`-based debounce inside a `useEffect` without introducing extra libraries

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ as part of a Full-Stack Challenge
</p>
