<div align="center">

# ⚡ QuickEdit

**Real-time image editor with cloud storage — built full-stack**

[![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Sharp](https://img.shields.io/badge/Sharp-Image_Processing-99CC00?style=flat-square)](https://sharp.pixelplumbing.com)
[![ImageKit](https://img.shields.io/badge/ImageKit-CDN-F7B731?style=flat-square)](https://imagekit.io)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)

</div>

---

## 📸 Preview

> **Replace this section with a screenshot or screen recording of your app**

<!-- Add your screenshot or GIF below -->
<!-- Example: -->
<!--
![QuickEdit Demo](./assets/demo.gif)
-->

```
📂 Drop a screenshot or GIF here
   e.g. assets/demo.png or assets/demo.gif
```

*To add a screenshot: take one, save it in the repo (e.g. `assets/demo.png`), then replace the block above with:*
```md
![QuickEdit Demo](./assets/demo.png)
```

---

## ✨ Features

- 🎚️ **Live filter controls** — brightness, contrast, saturation with debounced preview
- 🔄 **Transform** — rotate ±90° and flip horizontally / vertically
- ☁️ **Cloud save** — upload to ImageKit CDN, get a shareable URL instantly
- 📥 **Local download** — save the processed image directly to your device
- 🔁 **One-click reset** — restore all settings to default
- 🍞 **Toast notifications** — auto-dismissing feedback for every action

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Node.js, Express 5 |
| Image processing | Sharp |
| Cloud storage | ImageKit SDK |
| File uploads | Multer (memory storage) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- A free [ImageKit account](https://imagekit.io/)

### 1 — Clone

```bash
git clone https://github.com/RashikaLahoti/QuickEdit.git
cd QuickEdit
```

### 2 — Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL=https://ik.imagekit.io/your_id
```

```bash
npm run dev      # → http://localhost:3000
```

### 3 — Frontend

```bash
cd ../frontend
npm install
npm run dev      # → http://localhost:5173
```

Open **http://localhost:5173** and start editing.

---

## 📡 API

`POST /api/image/edit` — returns processed image buffer (JPEG)

`POST /api/image/save` — processes image, uploads to ImageKit, returns CDN URL

Both endpoints accept `multipart/form-data` with fields: `image`, `brightness`, `contrast`, `saturation`, `rotation`, `flipH`, `flipV`.

---

## 📁 Project Structure

```
QuickEdit/
├── backend/
│   ├── server.js
│   └── src/
│       ├── controllers/imageController.js
│       ├── middleware/upload.js
│       ├── routes/imageRoutes.js
│       └── services/storage.services.js
│
└── frontend/
    └── src/
        ├── App.jsx
        ├── api/imageApi.js
        ├── components/          # Header, Upload, Filters, Transform, Actions, Preview, Toast
        ├── hooks/useImageEditor.js
        └── utils/imageFile.js
```

---

<div align="center">
  <sub>Built with ❤️ as part of a Full-Stack Challenge</sub>
</div>
