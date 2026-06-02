# 🌐 BlueByteOS (v3.0.0-Gamma)

[Made under License: GPL v2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
[![Engine: Vite + TS](https://img.shields.io/badge/Engine-Vite%20%2F%20TS-blue.svg)](https://vite.dev/)
[![Design: Cyberpunk Midnight](https://img.shields.io/badge/Aesthetic-Midnight%20Cyber-03030f.svg)](#)

Welcome to **BlueByteOS (Gamma)**, an immersive, 100% responsive, blue-and-black cybernetic desktop workstation dashboard. Built from scratch with advanced styling, custom audio-synthesis sound effects, and clean modular logic. It functions as a complete interactive simulation of an operating system right in your browser.

---

## Live Demo & Development Portal
*   **Production Deployment:** (https://activate-bluebyte.vercel.app/)

---

## Core Visuals & Sound Architecture
*   **The Midnight Palette:** Crafted using ultra-high contrast dark slates, neon blues, and electrifying cyans matching the Cyber-Grid background overlays.
*   **Dynamic Visual Hierarchy:** Fully responsive scaling on all display formats (Desktop, Tablet, and Mobile). Main shortcuts, layout columns, window dimensions, and toolbar assets restructure smoothly depending on screen size.
*   **Web Audio Synthesis Engine:** Completely native audio indicators. No heavy overhead MP3/WAV file downloads—sound effects are synthesized programmatically using dynamic oscillators on the browser Web Audio API context.

---

## Interactive Applications Included

###  1. File Explorer
*   **State-Persistent Memory VFS:** Manages a virtual directory tree saved instantly inside client-side `localStorage`.
*   **Actions:** Read documents, inspect code scripts, and preview dynamic system text files. Fully refreshed and linked automatically when you update items on the disk.

###  2. Notes Pad
*   **Interactive Editing Panel:** Write notes, execute logs, or draft codes.
*   **Disk Integration:** Supports dynamic syncing directly back into your workspace Virtual File System directory tree.

###  3. Shell Terminal
*   **Simulated Prompt:** Supports a complete suite of commands with elegant tab alignments and custom response streams.
*   **Utility Operations:**
    *   `fastfetch` — Display systems metrics and memory load.
    *   `htop` — Monitor running virtual tasks with colorful graphs.
    *   VFS Navigation (`ls`, `cat`, etc.) — Inspect files directly inside the shell terminal.

###  4. Catbox Cloud Dispatcher
*   **Web Upload Engine:** Direct API transmitter integration for temporary payload storage via `catbox.moe`.
*   **Drag-and-Drop:** Intuitive file transfer with drag-over trigger classes.

###  5. Retro Arcade Game Suite
*   **Solitaire:** The good old card logic designed with popups.
*   **Sudoku:** Interactive puzzle builder.

###  6. Neon Void Browser
*   **Integrated Inline Sandbox:** Fully sandboxed custom browser overlay with responsive iframe viewports.
*   **Control Nodes:** Easily pop any address out into a separate, isolated browser tab, or control it fully inline.

---

## ⌨️ Global System Shortcuts
Improve your desktop speed with responsive hotkeys:

| Key Binding | Operational Function |
| :--- | :--- |
| <kbd>Alt</kbd> + <kbd>C</kbd> | **Close Active App Window** – Immediately dismiss the window currently focused on index stack. |
| <kbd>Alt</kbd> + <kbd>V</kbd> | **Toggle Mute / sound indicators** – Instantly mute or play the clicking chime synthesizer feedbacks. |
| <kbd>Alt</kbd> + <kbd>H</kbd> | **Trigger Hint Overlay** – Spawn the system parameters tips modal window. |

---

## 🛠️ Installation & Local Development

Execute the clean dependencies setup on your terminal to launch the environment locally:

### 1. Prerequisite Installations
Make sure you have Node.js (v18+) and npm installed on your machine.

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Start Local Dev Server
```bash
npm run dev
```
Your local server will boot up using `tsx` and Vite. Open [http://localhost:3000](http://localhost:3000) directly inside your web browser.

### 4. Build Production Bundle
To compile down to optimized, minimized static client bundles:
```bash
npm run build
```
Production assets compile cleanly directly inside the `/dist` output directory.

---
### Github forking with Vercel
```bash
https://activate-bluebyte.vercel.app/
```

you can check out the github_deployment file inside the file explorer to get these files hosted on your page

Once its done , head on to vercel and import this project and deploy it using the default React vite configuration.

### And You are All Set! :)

## 📜 License
This software workspace is distributed entirely under the **GPL 2.0 License**. Check out `/LICENSE` variables for more information.
