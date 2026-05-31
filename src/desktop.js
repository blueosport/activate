/**
 * BlueByteOS 3.0 (Gamma) - Desktop Shell Engine
 * Pure HTML/CSS/JS - No React or TS.
 */

// Global Audio Synth for System Sounds
let audioCtx = null;
let soundEnabled = true;

function syncVolumeUI() {
  const volumeBtn = document.getElementById("audio-indicator-btn");
  if (volumeBtn) {
    const label = volumeBtn.querySelector("span");
    const iconContainer = volumeBtn.querySelector("svg");
    if (soundEnabled) {
      if (label) label.textContent = "VOLUME";
      if (iconContainer) {
        iconContainer.innerHTML = `
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
        `;
        iconContainer.classList.remove("text-red-500");
        iconContainer.classList.add("text-blue-400");
      }
    } else {
      if (label) label.textContent = "MUTED";
      if (iconContainer) {
        iconContainer.innerHTML = `
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        `;
        iconContainer.classList.remove("text-blue-400");
        iconContainer.classList.add("text-red-500");
      }
    }
  }

  // Sync settings button if open in active window
  const toggleBtnInSettings = document.getElementById("toggle-sounds-btn");
  if (toggleBtnInSettings) {
    if (soundEnabled) {
      toggleBtnInSettings.textContent = "ENABLED";
      toggleBtnInSettings.className = "px-2 py-0.5 border border-blue-500/50 text-[10px] bg-blue-950/50 text-blue-300 hover:border-blue-400 cursor-pointer rounded";
    } else {
      toggleBtnInSettings.textContent = "DISABLED";
      toggleBtnInSettings.className = "px-2 py-0.5 border border-blue-900/40 text-[10px] bg-transparent text-blue-500 hover:border-blue-500/50 cursor-pointer rounded";
    }
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.setValueAtTime(100, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.16); // G5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } else if (type === 'boot') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.7);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.7);
    }
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
}

// -----------------------------------------------------
// VIRTUAL FILE SYSTEM (VFS)
// -----------------------------------------------------
const DEFAULT_VFS = {
  type: "folder",
  name: "root",
  children: {
    "welcome.txt": {
      type: "file",
      content: "========================================================\nWelcome to BlueByteOS v3.0 (Gamma Edition)\n========================================================\n\nEnjoy a modern, 100% blue and black cyber-aesthetic workplace\ndesigned from scratch with pristine HTML, CSS, and basic JS.\n\nAPPLICATIONS & TOOLS:\n - File Explorer: Manage documents dynamically with web persistence.\n - Notes Pad: Write notes and immediately sync them to File Explorer.\n - Shell Terminal: Interactive prompt supporting directory tools,\n   htop, and device fastfetch specs.\n - Catbox Cloud: Direct cloud dispatcher file uploader.\n - Solitaire & Sudoku: Fully responsive arcade logic minigames.\n - Neon Void Browser: Search DuckDuckGo via inline popup window frames."
    },
    "readme.txt": {
      type: "file",
      content: "BlueByteOS Release notes:\n- Version: 3.0.0-Gamma\n- Memory System: Local Storage VFS\n- Sound Engine: Synthesisers Web Audio OSC\n- Aesthetic Pairing: Midnight Charcoal, Electrifying Cyans, Neon Blues"
    },
    "github_deployment.txt": {
      type: "file",
      content: "=============================================================================\nHOW TO DEPLOY BLUEBYTEOS TO GITHUB PAGES (username.github.io/gamma)\n=============================================================================\n\nStep 1: Get the package files ready\n- Export the full code archive of BlueByteOS from AI Studio (under Settings / Export to ZIP).\n- Unzip the workspace to your local folder.\n\nStep 2: Create a GitHub Repository\n- Live page link structure: https://<username>.github.io/gamma\n- Create a brand new, Public repository named 'gamma' on your GitHub dashboard.\n- Leave settings empty (do not add standard README options).\n\nStep 3: Push your local codebase to Git\n- Run the following terminal commands inside your unzipped workspace folder:\n  git init\n  git add .\n  git commit -m 'Initialize BlueByte OS (Gamma Edition)'\n  git branch -M main\n  git remote add origin https://github.com/<your-username>/gamma.git\n  git push -u origin main\n\nStep 4: Enable pages inside Github Settings\n- Browse your GitHub repository page.\n- Open the 'Settings' tab in the top navigation.\n- Navigate to 'Pages' under 'Code and automation' sidebar configuration.\n- In 'Build and deployment' section, choose 'Deploy from a branch' option.\n- Click on the 'None' branch selector drop-down and choose 'main'.\n- Leave folder path as '/ (root)'. Tap on 'Save'.\n\nStep 5: Access Your Brand New Operating System Portal!\n- Wait a minute for the initial automated compilation build pipeline to finish.\n- Open: https://<username>.github.io/gamma\n- That is all! Perfect, fast, secure static deployment.\n============================================================================="
    },
    "Notes": {
      type: "folder",
      children: {
        "todo.txt": {
          type: "file",
          content: "- Try out htop in the shellterminal\n- Upload a test file to Catbox cloud\n- Solve a round of Klondike Solitaire or Sudoku\n- Set a custom grid backdrop in Settings"
        }
      }
    },
    "Pictures": {
      type: "folder",
      children: {
        "neon_highway.jpg": {
          type: "file",
          content: "https://images.unsplash.com/photo-1515260268569-9271009adfdb?auto=format&fit=crop&w=600&q=80"
        },
        "glowing_forest.jpg": {
          type: "file",
          content: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80"
        },
        "synthwave_ride.gif": {
          type: "file",
          content: "https://media.giphy.com/media/3o7TKUM3cUFTYiLnY4/giphy.gif"
        }
      }
    },
    "System": {
      type: "folder",
      children: {
        "kernel.sys": {
          type: "file",
          content: "BLUEBYTE KERNEL STACK v3.0.0-GAMMA\nSTATUS: ONLINE [OK]\nSEC_HASH_LINK: YES\nDISK_VFS_INIT: 0x99AB4C\nALLOC_SWAP_SIZE: 512MB"
        }
      }
    }
  }
};

let vfs = null;

function initVFS() {
  const store = localStorage.getItem("bluebyte_vfs");
  if (store) {
    try {
      vfs = JSON.parse(store);
    } catch (e) {
      vfs = DEFAULT_VFS;
    }
  } else {
    vfs = DEFAULT_VFS;
    saveVFS();
  }
}

function saveVFS() {
  localStorage.setItem("bluebyte_vfs", JSON.stringify(vfs));
}

// Traverse VFS safely
function resolvePath(pathArr) {
  let curr = vfs;
  for (let p of pathArr) {
    if (curr.children && curr.children[p]) {
      curr = curr.children[p];
    } else {
      return null;
    }
  }
  return curr;
}

// Add File Helper
function writeFileToVFS(pathArr, fileName, content) {
  let targetDir = resolvePath(pathArr);
  if (targetDir && targetDir.type === "folder") {
    targetDir.children[fileName] = {
      type: "file",
      content: content
    };
    saveVFS();
    triggerFileExplorerRefresh();
    return true;
  }
  return false;
}

// Add Folder Helper
function createDirInVFS(pathArr, folderName) {
  let targetDir = resolvePath(pathArr);
  if (targetDir && targetDir.type === "folder") {
    if (!targetDir.children[folderName]) {
      targetDir.children[folderName] = {
        type: "folder",
        children: {}
      };
      saveVFS();
      triggerFileExplorerRefresh();
      return true;
    }
  }
  return false;
}

// Delete item helper
function deleteItemInVFS(pathArr, itemName) {
  let targetDir = resolvePath(pathArr);
  if (targetDir && targetDir.type === "folder" && targetDir.children[itemName]) {
    delete targetDir.children[itemName];
    saveVFS();
    triggerFileExplorerRefresh();
    return true;
  }
  return false;
}

// Global hook to inform UI to update its explorer views
let explorerRefreshCallbacks = [];
function onFileExplorerRefresh(cb) {
  explorerRefreshCallbacks.push(cb);
}
function triggerFileExplorerRefresh() {
  explorerRefreshCallbacks.forEach(cb => cb());
}


// -----------------------------------------------------
// DESKTOP ICONS CONFIG
// -----------------------------------------------------
const APP_METADATA = [
  {
    id: "file-explorer",
    name: "File Explorer",
    icon: `<svg class="h-8 w-8 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z"/></svg>`
  },
  {
    id: "note-pad",
    name: "Notes Pad",
    icon: `<svg class="h-8 w-8 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
  },
  {
    id: "terminal",
    name: "Shell Terminal",
    icon: `<svg class="h-8 w-8 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`
  },
  {
    id: "games-app",
    name: "Arcade Games",
    icon: `<svg class="h-8 w-8 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/></svg>`
  },
  {
    id: "catbox-uploader",
    name: "Catbox.moe",
    icon: `<svg class="h-8 w-8 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>`
  },
  {
    id: "neon-browser",
    name: "Neon Browser",
    icon: `<svg class="h-8 w-8 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
  },
  {
    id: "settings-app",
    name: "Config Settings",
    icon: `<svg class="h-8 w-8 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
  },
  {
    id: "info-app",
    name: "BlueByteOS",
    icon: `<svg class="h-8 w-8 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
  },
  {
    id: "hints-app",
    name: "Hints & Keys",
    icon: `<svg class="h-8 w-8 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/><circle cx="12" cy="12" r="10"/></svg>`
  }
];


// -----------------------------------------------------
// WINDOW MANAGER ENGINE
// -----------------------------------------------------
let activeWindowCount = 0;
let highestZIndex = 100;
const openWindows = {}; // App ID -> DOM Div Element

function launchApp(appId, customData = null) {
  if (appId === "catbox-uploader") {
    playSound('click');
    document.getElementById("start-menu").classList.add("hidden");
    window.open("https://catbox.moe", "_blank");
    return;
  }
  playSound('click');
  
  // Close Start Menu if open
  document.getElementById("start-menu").classList.add("hidden");

  // If already open, raise to top
  if (openWindows[appId]) {
    focusWindow(appId);
    if (openWindows[appId].dataset.minimized === "true") {
      restoreWindow(appId);
    }
    // Handle custom triggers
    if (appId === "note-pad" && customData && customData.fileToRead) {
      loadNoteInPad(customData.fileToRead, customData.path);
    }
    return;
  }

  const appMeta = APP_METADATA.find(a => a.id === appId);
  if (!appMeta) return;

  const workspace = document.getElementById("window-container");
  
  // Create Window Element
  const win = document.createElement("div");
  win.id = `window-${appId}`;
  win.className = "absolute pointer-events-auto w-full h-full sm:w-[460px] sm:h-[380px] bg-[#000000]/95 border border-blue-950 sm:rounded-md shadow-2xl flex flex-col overflow-hidden text-slate-100 select-none window-border-neon glass-panel";
  win.style.zIndex = ++highestZIndex;
  
  win.dataset.appId = appId;
  win.dataset.minimized = "false";

  const isMobile = window.innerWidth < 640;
  if (isMobile) {
    win.style.left = "0px";
    win.style.top = "0px";
    win.style.width = "100%";
    win.style.height = "100%";
    win.dataset.maximized = "true";
  } else {
    // Default cascade position
    let offset = (Object.keys(openWindows).length * 20) % 120 + 40;
    win.style.left = `${offset}px`;
    win.style.top = `${offset}px`;
    win.dataset.maximized = "false";
  }

  // Build Structure
  win.innerHTML = `
    <!-- Header -->
    <header class="h-9 bg-[#04040d] border-b border-blue-950 flex items-center justify-between px-3 cursor-move shrink-0">
      <div class="flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest text-blue-400">
        ${appMeta.icon.replace("h-8 w-8", "h-3.5 w-3.5")}
        <span>${appMeta.name.toUpperCase()}</span>
      </div>
      <div class="flex items-center gap-1.5 h-full">
        <!-- Min -->
        <button class="win-btn-min w-6 h-6 rounded flex items-center justify-center hover:bg-blue-950/60 border border-transparent hover:border-blue-900/30 text-blue-400 cursor-pointer text-xs" title="Minimize">⎯</button>
        <!-- Max -->
        <button class="win-btn-max w-6 h-6 rounded flex items-center justify-center hover:bg-blue-950/60 border border-transparent hover:border-blue-900/30 text-blue-400 cursor-pointer text-xs" title="Maximize">⛶</button>
        <!-- Close -->
        <button class="win-btn-close w-6 h-6 rounded flex items-center justify-center hover:bg-red-950/50 hover:text-red-400 border border-transparent hover:border-red-500/20 text-red-500 cursor-pointer text-xs" title="Close">✕</button>
      </div>
    </header>
    <!-- Content container -->
    <div class="flex-1 w-full overflow-hidden p-3 flex flex-col relative text-xs">
      ${getAppContentHTML(appId)}
    </div>
  `;

  workspace.appendChild(win);
  openWindows[appId] = win;
  focusWindow(appId);

  // Setup header dragging
  setupDragging(win);
  
  // Handlers
  win.querySelector(".win-btn-close").addEventListener("click", () => closeWindow(appId));
  win.querySelector(".win-btn-min").addEventListener("click", () => minimizeWindow(appId));
  win.querySelector(".win-btn-max").addEventListener("click", () => toggleMaximizeWindow(appId));
  win.addEventListener("mousedown", () => focusWindow(appId));

  // Initialize specific App JavaScript Controllers
  initAppLogic(appId, win, customData);

  // Add Taskbar item
  addTaskbarTab(appId, appMeta.name, appMeta.icon);
}

function focusWindow(appId) {
  Object.values(openWindows).forEach(w => w.classList.remove("active-window"));
  const win = openWindows[appId];
  if (win) {
    highestZIndex += 2;
    win.style.zIndex = highestZIndex;
    win.classList.add("active-window");
    
    // Highlight taskbar tab
    document.querySelectorAll(".task-tab").forEach(tab => {
      if (tab.dataset.appId === appId) {
        tab.classList.remove("border-blue-900/40", "bg-transparent");
        tab.classList.add("border-blue-500/80", "bg-blue-950/30", "text-blue-100");
      } else {
        tab.classList.remove("border-blue-500/80", "bg-blue-950/30", "text-blue-100");
        tab.classList.add("border-blue-900/40", "bg-transparent");
      }
    });

    // Auto focus the primary input in the focused window
    setTimeout(() => {
      if (appId === "terminal") {
        const input = win.querySelector("#term-input");
        if (input) input.focus();
      } else if (appId === "neon-browser") {
        const input = win.querySelector("#browser-search-input");
        if (input) input.focus();
      } else if (appId === "note-pad") {
        const input = win.querySelector("#note-editor");
        if (input) input.focus();
      } else if (appId === "file-explorer") {
        const firstEntry = win.querySelector("#explorer-view [tabindex='0']");
        if (firstEntry) {
          firstEntry.focus();
        } else {
          const backBtn = win.querySelector("#exp-back-btn");
          if (backBtn) backBtn.focus();
        }
      }
    }, 50);
  }
}

function closeWindow(appId) {
  playSound('click');
  const win = openWindows[appId];
  if (win) {
    win.remove();
    delete openWindows[appId];
    removeTaskbarTab(appId);
  }
}

function minimizeWindow(appId) {
  playSound('click');
  const win = openWindows[appId];
  if (win) {
    win.style.display = "none";
    win.dataset.minimized = "true";
  }
}

function restoreWindow(appId) {
  const win = openWindows[appId];
  if (win) {
    win.style.display = "flex";
    win.dataset.minimized = "false";
    focusWindow(appId);
  }
}

function toggleMaximizeWindow(appId) {
  playSound('click');
  const win = openWindows[appId];
  if (win) {
    const isMobile = window.innerWidth < 640;
    if (win.dataset.maximized === "true") {
      if (isMobile) {
        // Keep full screen of mobile viewport
        win.style.top = "0px";
        win.style.left = "0px";
        win.style.width = "100%";
        win.style.height = "100%";
      } else {
        win.style.top = win.dataset.oldTop || "50px";
        win.style.left = win.dataset.oldLeft || "50px";
        win.style.width = win.dataset.oldWidth || "460px";
        win.style.height = win.dataset.oldHeight || "380px";
        win.dataset.maximized = "false";
      }
    } else {
      win.dataset.oldTop = win.style.top;
      win.dataset.oldLeft = win.style.left;
      win.dataset.oldWidth = win.style.width;
      win.dataset.oldHeight = win.style.height;

      win.style.top = "0px";
      win.style.left = "0px";
      win.style.width = "100%";
      win.style.height = "100%";
      win.dataset.maximized = "true";
    }
  }
}

// Draggable Utility
function setupDragging(win) {
  const header = win.querySelector("header");
  let startX = 0, startY = 0, initialLeft = 0, initialTop = 0;

  header.addEventListener("mousedown", dragStart);

  function dragStart(e) {
    if (win.dataset.maximized === "true") return;
    if (e.target.closest("button")) return; // skip window buttons
    
    startX = e.clientX;
    startY = e.clientY;
    
    const style = window.getComputedStyle(win);
    initialLeft = parseInt(style.left, 10);
    initialTop = parseInt(style.top, 10);
    
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragEnd);
    focusWindow(win.dataset.appId);
  }

  function dragMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    // Boundary checks with safety
    let newLeft = initialLeft + dx;
    let newTop = initialTop + dy;
    
    // Don't drag completely offscreen
    if (newTop < 0) newTop = 0;
    
    win.style.left = `${newLeft}px`;
    win.style.top = `${newTop}px`;
  }

  function dragEnd() {
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragEnd);
  }
}


// -----------------------------------------------------
// TASKBAR HANDLERS
// -----------------------------------------------------
function addTaskbarTab(appId, name, icon) {
  const container = document.getElementById("taskbar-windows");
  
  // Check if already in taskbar
  if (container.querySelector(`[data-app-id="${appId}"]`)) return;

  const tab = document.createElement("button");
  tab.className = "task-tab px-3 h-9 rounded flex items-center gap-1.5 border border-blue-900/40 text-[10px] lowercase font-mono cursor-pointer hover:bg-blue-950/20 text-slate-300 transition-all active:scale-95 shrink-0";
  tab.dataset.appId = appId;
  tab.innerHTML = `
    ${icon.replace("h-8 w-8", "h-3.5 w-3.5 text-blue-400")}
    <span>${name.split(" ")[0]}</span>
  `;

  tab.addEventListener("click", () => {
    playSound('click');
    const win = openWindows[appId];
    if (win) {
      if (win.style.display === "none") {
        restoreWindow(appId);
      } else if (win.classList.contains("active-window")) {
        minimizeWindow(appId);
      } else {
        focusWindow(appId);
      }
    }
  });

  container.appendChild(tab);
}

function removeTaskbarTab(appId) {
  const container = document.getElementById("taskbar-windows");
  const tab = container.querySelector(`[data-app-id="${appId}"]`);
  if (tab) {
    tab.remove();
  }
}


// -----------------------------------------------------
// APPLICATION CONTENT ROUTER (HTML BONES)
// -----------------------------------------------------
function getAppContentHTML(appId) {
  switch(appId) {
    case "file-explorer":
      return `
        <div class="flex items-center justify-between border-b border-blue-900/30 pb-2 mb-2 font-mono">
          <div class="flex items-center gap-1.5">
            <button id="exp-back-btn" class="w-6 h-6 border border-blue-900/40 rounded flex items-center justify-center hover:bg-blue-950/50 cursor-pointer focus-visible:outline-none focus-visible:bg-blue-950/60 focus-visible:border-blue-400 focus-visible:ring-1 focus-visible:ring-blue-400/50" title="Go up a directory">↾</button>
            <span id="exp-path-label" class="text-[10px] text-blue-500 tracking-wider">/</span>
          </div>
          <div class="flex items-center gap-1">
            <button id="exp-newfolder-btn" class="px-2 py-0.5 border border-blue-900/40 text-[10px] text-blue-400 rounded hover:bg-blue-950/40 hover:text-blue-300 cursor-pointer focus-visible:outline-none focus-visible:bg-blue-950/60 focus-visible:border-blue-400 focus-visible:ring-1 focus-visible:ring-blue-400/50">+dir</button>
            <button id="exp-newfile-btn" class="px-2 py-0.5 border border-blue-900/40 text-[10px] text-blue-400 rounded hover:bg-blue-950/40 hover:text-blue-300 cursor-pointer focus-visible:outline-none focus-visible:bg-blue-950/60 focus-visible:border-blue-400 focus-visible:ring-1 focus-visible:ring-blue-400/50">+doc</button>
          </div>
        </div>
        <div id="explorer-view" class="flex-1 overflow-y-auto grid grid-cols-4 gap-2 content-start p-1 bg-[#010103] border border-blue-950/50 rounded p-2">
          <!-- Populated by system -->
        </div>
      `;

    case "note-pad":
      return `
        <div class="flex flex-col h-full gap-2 font-mono">
          <div class="grid grid-cols-[1fr_80px] gap-2 items-center">
            <input id="note-filename-input" type="text" placeholder="filename.txt" class="bg-black border border-blue-900/40 px-2 py-1 rounded text-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 text-xs" />
            <button id="note-save-btn" class="h-full bg-blue-950/60 border border-blue-500/40 hover:bg-blue-900/60 hover:border-blue-400 text-blue-300 text-xs font-bold rounded cursor-pointer transition-colors focus-visible:outline-none focus-visible:bg-blue-900/60 focus-visible:border-blue-400 focus-visible:ring-1 focus-visible:ring-blue-400/50">SAVE</button>
          </div>
          <div class="flex-1 relative">
            <textarea id="note-editor" placeholder="Write logs, ideas, or config directives here..." class="absolute inset-0 bg-[#010103] border border-blue-900/30 rounded p-2 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 resize-none text-[11px] leading-relaxed scrollbar-none"></textarea>
          </div>
          <div id="note-status" class="text-[10px] text-blue-500 flex items-center justify-between px-1">
            <span>path: /Notes</span>
            <span>0 char</span>
          </div>
        </div>
      `;

    case "terminal":
      return `
        <div class="flex flex-col h-full bg-[#000000] font-mono p-1 rounded border border-blue-950/50">
          <div id="term-history" class="flex-1 overflow-y-auto space-y-1.5 p-2 text-[11px] leading-relaxed select-text scrollbar-none">
            <div class="text-blue-400">BlueByte Shell Terminal v3.0 [Type "help" for guidelines]</div>
          </div>
          <div class="h-7 border-t border-blue-950/30 flex items-center gap-1.5 px-2 bg-[#010103] shrink-0 text-xs">
            <span class="text-blue-500 font-bold shrink-0">user@bluebyte:~$</span>
            <input id="term-input" type="text" class="flex-1 bg-transparent border-none outline-none text-blue-300 caret-blue-500 text-xs font-mono" autofocus autocomplete="off" />
          </div>
        </div>
      `;

    case "games-app":
      return `
        <div class="flex flex-col h-full gap-2">
          <!-- Game Select -->
          <div id="game-selectors" class="flex items-center gap-2 border-b border-blue-900/30 pb-2 shrink-0 font-mono">
            <button id="btn-play-sudoku" class="flex-1 py-1 px-2 border border-blue-500/30 bg-blue-950/30 hover:bg-blue-950/70 text-blue-300 rounded text-xs cursor-pointer select-none">Sudoku</button>
            <button id="btn-play-solitaire" class="flex-1 py-1 px-2 border border-blue-500/30 bg-blue-950/30 hover:bg-blue-950/70 text-blue-300 rounded text-xs cursor-pointer select-none">Solitaire</button>
          </div>
          <!-- Canvas Body -->
          <div id="game-arena" class="flex-1 bg-[#010103] border border-blue-950/40 rounded p-2 overflow-y-auto scrollbar-none flex flex-col justify-center items-center">
            <div class="text-center font-mono space-y-2 p-4">
              <div class="text-blue-400 font-bold animate-cyber-pulse text-sm">SELECT RECREATION LINK</div>
              <div class="text-[10px] text-blue-600 leading-relaxed">Launch fully responsive cybernetic micro-sudoku grids or stack classic Solitaire piles above.</div>
            </div>
          </div>
        </div>
      `;

    case "catbox-uploader":
      return `
        <div class="flex flex-col h-full gap-3 font-mono">
          <div id="catbox-dropzone" class="flex-1 border-2 border-dashed border-blue-900/40 rounded flex flex-col items-center justify-center p-4 hover:border-blue-500/60 bg-[#010103] transition-colors cursor-pointer text-center group">
            <svg class="h-10 w-10 text-blue-500/50 group-hover:text-blue-400 mb-2 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div class="text-xs text-blue-300 mb-1">DRAG & DROP SECURE FILES</div>
            <div class="text-[9px] text-blue-500 leading-relaxed">Accepts any raw text, logs, images or bundles to dispatch on Catbox servers</div>
            <input id="catbox-file-selector" type="file" class="hidden" />
          </div>
          <div class="bg-[#020205] border border-blue-950/50 p-2.5 rounded text-[10px] space-y-1.5 shrink-0">
            <div class="flex items-center justify-between text-blue-400 font-bold">
              <span>STATUS CONSOLE</span>
              <span id="catbox-status-tag" class="text-blue-600 animate-pulse">IDLE</span>
            </div>
            <!-- Progress strip -->
            <div class="h-2 w-full bg-black rounded overflow-hidden border border-blue-950/50 relative">
              <div id="catbox-bar" class="absolute top-0 left-0 bottom-0 w-0 bg-blue-500 transition-all duration-300"></div>
            </div>
            <div id="catbox-terminal-out" class="text-slate-400 line-clamp-1">Ready to transmit payload stream...</div>
          </div>
        </div>
      `;

    case "neon-browser":
      return `
        <div class="flex flex-col h-full gap-2 font-mono">
          <!-- Browser URL field -->
          <form id="browser-search-form" class="flex gap-2 items-center shrink-0">
            <div class="flex-1 flex bg-black border border-blue-900/40 rounded px-2 py-1 items-center gap-1.5 focus-within:border-blue-500">
              <svg class="h-3 w-3 text-blue-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input id="browser-search-input" type="text" placeholder="Search DuckDuckGo or web address..." class="flex-1 bg-transparent border-none outline-none text-xs text-blue-400 placeholder-blue-900 focus:outline-none" />
            </div>
            <button type="submit" class="bg-blue-950/60 border border-blue-500/50 hover:bg-blue-900/80 hover:border-blue-400 text-blue-300 px-3 py-1 font-bold rounded text-xs cursor-pointer select-none">SEARCH</button>
          </form>
          <!-- Web Simulation frame -->
          <div class="flex-1 bg-black border border-blue-950/50 rounded overflow-hidden flex flex-col justify-center items-center relative text-center p-4">
            <div class="absolute inset-0 cyber-grid opacity-30 z-0"></div>
            <div class="z-10 space-y-2 max-w-sm">
              <div class="text-blue-400 font-bold tracking-widest text-[13px]">NEON VOID CLIENT v3.0</div>
              <div class="text-[10px] text-blue-600">Enter terms above. Spawns an external secure DuckDuckGo tab interface over the workbench workspace.</div>
            </div>
          </div>
        </div>
      `;

    case "settings-app":
      return `
        <div class="flex flex-col h-full justify-between gap-3 font-mono">
          <div class="space-y-3.5">
            <!-- Wallpaper Select -->
            <div>
              <div class="text-[10px] text-blue-500 font-bold mb-1.5 tracking-wider">DESKTOP WALLPAPER</div>
              <div class="grid grid-cols-2 gap-1.5 text-[10px]">
                <button class="wp-btn py-1.5 rounded border border-blue-900/50 bg-[#020205] text-blue-400 hover:border-blue-500 hover:bg-blue-950/20 cursor-pointer" data-wp="blue-scanline">Scanlines Grid</button>
                <button class="wp-btn py-1.5 rounded border border-blue-900/50 bg-[#020205] text-blue-400 hover:border-blue-500 hover:bg-blue-950/20 cursor-pointer" data-wp="galaxy-grid">Dark Cosmic Space</button>
                <button class="wp-btn py-1.5 rounded border border-blue-900/50 bg-[#020205] text-blue-400 hover:border-blue-500 hover:bg-blue-950/20 cursor-pointer" data-wp="pixel-grid">Cyberpunk Pixel</button>
                <button class="wp-btn py-1.5 rounded border border-blue-900/50 bg-[#020205] text-blue-400 hover:border-blue-500 hover:bg-blue-950/20 cursor-pointer" data-wp="pure-black">Obsidian Abyss</button>
              </div>
            </div>

            <!-- Toggles -->
            <div class="space-y-2 border-t border-blue-950/40 pt-3">
              <div class="text-[10px] text-blue-500 font-bold tracking-wider mb-1">DISPLAY FILTER MATRIX</div>
              
              <div class="flex items-center justify-between text-xs py-1">
                <span class="text-blue-300">Scanline Filter</span>
                <button id="toggle-scanlines-btn" class="px-2 py-0.5 border border-blue-500/50 text-[10px] bg-blue-950/50 text-blue-300 hover:border-blue-400 cursor-pointer rounded">ENABLED</button>
              </div>

              <div class="flex items-center justify-between text-xs py-1">
                <span class="text-blue-300">CRT Curve Warp effect</span>
                <button id="toggle-crt-btn" class="px-2 py-0.5 border border-blue-900/40 text-[10px] bg-transparent text-blue-500 hover:border-blue-500/50 cursor-pointer rounded">DISABLED</button>
              </div>

              <div class="flex items-center justify-between text-xs py-1">
                <span class="text-blue-300">8-Bit Oscillator Beeps</span>
                <button id="toggle-sounds-btn" class="px-2 py-0.5 border border-blue-500/50 text-[10px] bg-blue-950/50 text-blue-300 hover:border-blue-400 cursor-pointer rounded">ENABLED</button>
              </div>
            </div>
          </div>

          <div class="border-t border-blue-950/40 pt-2.5 flex items-center justify-between text-[9px] text-blue-500">
            <span>system: localVFS-enabled</span>
            <span>OS: BlueByte 3.0 (Gamma)</span>
          </div>
        </div>
      `;

    case "info-app":
      return `
        <div class="flex flex-col h-full font-mono text-center justify-center p-4 space-y-4">
          <div class="flex justify-center">
            <div class="h-14 w-14 rounded-lg bg-blue-950/60 border-2 border-blue-500/80 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <svg class="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
          </div>
          <div>
            <div class="text-sm font-bold text-blue-400 tracking-wider">BlueByteOS 3.0 (Gamma)</div>
            <div class="text-[10px] text-blue-600 mt-1">THE COGNITIVE DESKTOP PLATFORM</div>
          </div>
          <p class="text-[11px] leading-relaxed text-blue-300 max-w-sm mx-auto">
            BlueByteOS is a mock-operating system portal showcasing design mechanics, virtual space nodes, arcade games, and fully responsive window operations.
          </p>
          <div class="border-t border-blue-950/30 pt-3 text-[10px] space-y-1 text-blue-500 max-w-xs mx-auto">
            <div class="flex justify-between"><span>Codename:</span> <span class="text-blue-400">Gamma Series</span></div>
            <div class="flex justify-between"><span>Subsystem:</span> <span class="text-blue-400">VFS Browser Shell</span></div>
            <div class="flex justify-between"><span>Language:</span> <span class="text-blue-400">Pure HTML, Vanilla JS</span></div>
          </div>
        </div>
      `;

    case "hints-app":
      return `
        <div class="flex flex-col h-full font-mono text-xs text-blue-400 p-4 space-y-4 overflow-y-auto select-none bg-black">
          <div class="border-b border-blue-900/40 pb-2">
            <h3 class="text-xs font-bold text-blue-300 tracking-wider">▲ SYSTEM HOTKEYS & HINTS</h3>
            <p class="text-[10px] text-blue-600 mt-1">Press any of the following shortcuts anywhere on the OS:</p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
            <div class="p-1.5 border border-blue-900/30 bg-blue-950/10 rounded flex justify-between items-center">
              <span class="text-blue-500">Launch Terminal</span>
              <span class="text-blue-300 font-bold border border-blue-900/60 px-1 py-0.5 rounded bg-blue-950/30">Alt + Enter</span>
            </div>
            <div class="p-1.5 border border-blue-900/30 bg-blue-950/10 rounded flex justify-between items-center">
              <span class="text-blue-500">File Explorer</span>
              <span class="text-blue-300 font-bold border border-blue-900/60 px-1 py-0.5 rounded bg-blue-950/30">Alt + E</span>
            </div>
            <div class="p-1.5 border border-blue-900/30 bg-blue-950/10 rounded flex justify-between items-center">
              <span class="text-blue-500">Notes Pad</span>
              <span class="text-blue-300 font-bold border border-blue-900/60 px-1 py-0.5 rounded bg-blue-950/30">Alt + N</span>
            </div>
            <div class="p-1.5 border border-blue-900/30 bg-blue-950/10 rounded flex justify-between items-center">
              <span class="text-blue-500">Browser</span>
              <span class="text-blue-300 font-bold border border-blue-900/60 px-1 py-0.5 rounded bg-blue-950/30">Alt + B</span>
            </div>
            <div class="p-1.5 border border-blue-900/30 bg-blue-950/10 rounded flex justify-between items-center">
              <span class="text-blue-500">Toggle Start Menu</span>
              <span class="text-blue-300 font-bold border border-blue-900/60 px-1 py-0.5 rounded bg-blue-950/30">Alt + S</span>
            </div>
            <div class="p-1.5 border border-blue-900/30 bg-blue-950/10 rounded flex justify-between items-center">
              <span class="text-blue-500">Hints & Keys</span>
              <span class="text-blue-300 font-bold border border-blue-900/60 px-1 py-0.5 rounded bg-blue-950/30">Alt + H</span>
            </div>
            <div class="sm:col-span-2 p-1.5 border border-blue-900/30 bg-blue-950/10 rounded flex justify-between items-center">
              <span class="text-blue-500">Close Active App Window</span>
              <span class="text-blue-300 font-bold border border-blue-900/60 px-1 py-0.5 rounded bg-blue-950/30">Alt + C</span>
            </div>
            <div class="sm:col-span-2 p-1.5 border border-blue-900/30 bg-blue-950/10 rounded flex justify-between items-center">
              <span class="text-blue-500">Toggle Mute / Sound Level</span>
              <span class="text-blue-300 font-bold border border-blue-900/60 px-1 py-0.5 rounded bg-blue-950/30">Alt + V</span>
            </div>
          </div>

          <div class="border-t border-blue-900/30 pt-3">
            <h4 class="text-[10px] font-bold text-blue-300 mb-1">💡 NEW USER UPGRADES:</h4>
            <div class="text-[9px] text-blue-500 leading-relaxed space-y-1">
              <div>• <strong class="text-blue-400">Single Click</strong> launches directories and documents inside the File Explorer instantly now!</div>
              <div>• Optimized window layouts for small screen viewports on responsive formats.</div>
            </div>
          </div>
        </div>
      `;
  }
  return "";
}


// -----------------------------------------------------
// APPLICATION LOGIC INTEGRATOR
// -----------------------------------------------------
function initAppLogic(appId, win, customData) {
  switch(appId) {
    case "file-explorer":
      initFileExplorer(win);
      break;
    case "note-pad":
      initNotePad(win, customData);
      break;
    case "terminal":
      initTerminal(win);
      break;
    case "games-app":
      initGamesApp(win);
      break;
    case "catbox-uploader":
      initCatboxUploader(win);
      break;
    case "neon-browser":
      initNeonBrowser(win);
      break;
    case "settings-app":
      initSettingsApp(win);
      break;
  }
}


// -----------------------------------------------------------------------------
// APP 1: FILE EXPLORER
// -----------------------------------------------------------------------------
function initFileExplorer(win) {
  let currPathArr = []; // Starts at root
  
  const viewGrid = win.querySelector("#explorer-view");
  const pathLabel = win.querySelector("#exp-path-label");
  const backBtn = win.querySelector("#exp-back-btn");
  const newFolderBtn = win.querySelector("#exp-newfolder-btn");
  const newFileBtn = win.querySelector("#exp-newfile-btn");

  function refresh() {
    viewGrid.innerHTML = "";
    pathLabel.textContent = "/" + currPathArr.join("/");
    
    const currDir = resolvePath(currPathArr);
    if (!currDir || currDir.type !== "folder") {
      viewGrid.innerHTML = `<div class="col-span-4 text-center py-8 text-red-500 font-mono">ERROR: Directory compromised</div>`;
      return;
    }

    // List items
    const entries = Object.keys(currDir.children || {});
    if (entries.length === 0) {
      viewGrid.innerHTML = `<div class="col-span-4 text-center py-12 text-blue-900/60 font-mono text-[10px]">EMPTY DIRECTORY</div>`;
      return;
    }

    entries.forEach(name => {
      const item = currDir.children[name];
      const el = document.createElement("div");
      el.tabIndex = 0;
      el.className = "flex flex-col items-center p-2 rounded hover:bg-blue-950/30 border border-transparent hover:border-blue-900/20 cursor-pointer text-center group transition-all select-none relative focus-visible:outline-none focus-visible:bg-blue-950/40 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500/50";
      
      let icon = "";
      const isImg = item.type !== "folder" && /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(name);
      if (item.type === "folder") {
        icon = `<svg class="h-7 w-7 text-blue-500 group-hover:text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z"/></svg>`;
      } else if (isImg) {
        icon = `<svg class="h-7 w-7 text-green-400 group-hover:text-green-300" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
      } else {
        icon = `<svg class="h-7 w-7 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
      }

      el.innerHTML = `
        <div class="mb-1.5 shrink-0">${icon}</div>
        <div class="text-[10px] text-slate-300 truncate w-full font-mono font-medium">${name}</div>
        <!-- Right Click/Trash Indicator -->
        <button class="delete-item-btn absolute top-1 right-1 h-4.5 w-4.5 border border-red-500/10 hover:border-red-500/50 bg-transparent text-red-500 flex items-center justify-center rounded text-[8px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity cursor-pointer shadow-sm hover:bg-red-950/25 animate-fade-in" title="Delete" tabindex="-1">✕</button>
      `;

      // Helper function to trigger logic
      function triggerAction() {
        playSound('click');
        if (item.type === "folder") {
          currPathArr.push(name);
          refresh();
        } else {
          // Open File in Notepad Pad
          launchApp("note-pad", { fileToRead: name, path: [...currPathArr] });
        }
      }

      // Drills down / Opens
      el.addEventListener("click", () => {
        triggerAction();
      });

      // Keyboard support for Tab navigability (Enter/Space to trigger)
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerAction();
        }
      });

      // Quick-delete handler inside grid
      el.querySelector(".delete-item-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        playSound('error');
        deleteItemInVFS([...currPathArr], name);
        refresh();
      });

      viewGrid.appendChild(el);
    });
  }

  // Back drill-up button
  backBtn.addEventListener("click", () => {
    if (currPathArr.length > 0) {
      playSound('click');
      currPathArr.pop();
      refresh();
    }
  });

  // Create folder prompt
  newFolderBtn.addEventListener("click", () => {
    playSound('click');
    const fName = prompt("Name the folder directory (alphanumeric only):", "unnamed_dir");
    if (fName && /^[a-zA-Z0-9_\-\.]+$/.test(fName.trim())) {
      createDirInVFS([...currPathArr], fName.trim());
      refresh();
    } else if (fName) {
      playSound('error');
      alert("Invalid folder directory name layout.");
    }
  });

  // Create document prompt
  newFileBtn.addEventListener("click", () => {
    playSound('click');
    const fName = prompt("Name the document or image file (e.g., photo.jpg or readme.txt):", "document.txt");
    if (fName && /^[a-zA-Z0-9_\-\.]+$/.test(fName.trim())) {
      let finalName = fName.trim();
      const isImgFile = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(finalName);
      
      let defaultContent = "BlueByte Document System\nCreated: " + new Date().toISOString() + "\n\nStart typing...";
      if (isImgFile) {
        defaultContent = "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80";
      }
      
      writeFileToVFS([...currPathArr], finalName, defaultContent);
      refresh();
    } else if (fName) {
      playSound('error');
      alert("Invalid document name layouts.");
    }
  });

  refresh();

  // Watch for external refreshes (e.g., from save notes)
  onFileExplorerRefresh(() => {
    if (document.getElementById(`window-file-explorer`)) {
      refresh();
    }
  });
}


// -----------------------------------------------------------------------------
// APP 2: NOTES PAD
// -----------------------------------------------------------------------------
let activeNoteContextFilename = "";
let activeNoteContextPathArr = ["Notes"];

function loadNoteInPad(filename, pathArr) {
  const win = document.getElementById("window-note-pad");
  if (!win) return;
  activeNoteContextFilename = filename;
  activeNoteContextPathArr = pathArr || [];
  
  const fileObj = resolvePath([...activeNoteContextPathArr, filename]);
  if (fileObj && fileObj.type === "file") {
    win.querySelector("#note-filename-input").value = filename;
    win.querySelector("#note-editor").value = fileObj.content || "";
    win.querySelector("#note-status span:first-child").textContent = `path: /${activeNoteContextPathArr.join("/")}`;
    updateCharCount(win);
  }
}

function updateCharCount(win) {
  const editor = win.querySelector("#note-editor");
  win.querySelector("#note-status span:last-child").textContent = `${editor.value.length} chars`;
}

function initNotePad(win, customData) {
  const editor = win.querySelector("#note-editor");
  const saveBtn = win.querySelector("#note-save-btn");
  const filenameInput = win.querySelector("#note-filename-input");

  editor.addEventListener("input", () => updateCharCount(win));

  saveBtn.addEventListener("click", () => {
    let rawName = filenameInput.value.trim();
    if (!rawName) {
      playSound('error');
      alert("Specify a valid filename!");
      return;
    }
    if (!rawName.endsWith(".txt")) {
      rawName += ".txt";
    }
    filenameInput.value = rawName;

    const content = editor.value;
    const saveResult = writeFileToVFS([...activeNoteContextPathArr], rawName, content);
    if (saveResult) {
      playSound('success');
      activeNoteContextFilename = rawName;
      win.querySelector("#note-status span:first-child").textContent = `path: /${activeNoteContextPathArr.join("/")} [saved]`;
    } else {
      playSound('error');
      alert("Error committing write sequence into disk directory.");
    }
  });

  // Handle load triggers
  if (customData && customData.fileToRead) {
    loadNoteInPad(customData.fileToRead, customData.path);
    setTimeout(() => editor.focus(), 60);
  } else {
    activeNoteContextFilename = "";
    activeNoteContextPathArr = ["Notes"]; // default
    filenameInput.value = "";
    editor.value = "";
    win.querySelector("#note-status span:first-child").textContent = "path: /Notes";
    updateCharCount(win);
    setTimeout(() => filenameInput.focus(), 60);
  }
}


// -----------------------------------------------------------------------------
// APP 3: SHELL TERMINAL
// -----------------------------------------------------------------------------
function initTerminal(win) {
  const historyDiv = win.querySelector("#term-history");
  const input = win.querySelector("#term-input");
  let termPathArr = []; // Terminal starts at root

  // Command logs line
  function printLine(text, styleClass = "") {
    const line = document.createElement("div");
    if (styleClass) line.className = styleClass;
    line.textContent = text;
    historyDiv.appendChild(line);
    historyDiv.scrollTop = historyDiv.scrollHeight;
  }

  function printHTML(html) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    historyDiv.appendChild(wrapper);
    historyDiv.scrollTop = historyDiv.scrollHeight;
  }

  // htop interactive mode reference
  let htopTimer = null;

  function runHtop() {
    playSound('click');
    input.disabled = true;
    historyDiv.innerHTML = ""; // clear screen
    
    function renderHtop() {
      let coreCount = navigator.hardwareConcurrency || 8;
      let bars = "";
      for (let i = 0; i < Math.min(coreCount, 4); i++) {
        let pct = Math.floor(Math.random() * 45) + (i * 10);
        let filledCount = Math.floor(pct / 4);
        let barStr = "|".repeat(filledCount) + " ".repeat(25 - filledCount);
        bars += `  CPU[${i}] [${barStr}] ${pct}%\n`;
      }
      let ramPct = Math.floor(Math.random() * 15) + 38;
      let ramBar = "|".repeat(Math.floor(ramPct / 4)) + " ".repeat(25 - Math.floor(ramPct / 4));
      
      let html = `
        <div class="font-mono text-xs space-y-3 select-text">
          <div class="text-blue-400 font-bold tracking-widest text-[#00ffcc]">BLUEBYTE CONSOLE MONITOR (htop) - PRESS 'Q' TO QUIT</div>
          
          <pre class="bg-black border border-blue-900/30 p-2 text-[10px] leading-tight text-blue-500">
${bars}  MEM    [${ramBar}] ${ramPct}% (1.5GB/4.0GB)
          </pre>

          <!-- Processes -->
          <div class="border border-blue-900/30 rounded overflow-hidden">
            <table class="w-full text-[10px] text-left border-collapse">
              <thead>
                <tr class="bg-blue-950/40 text-blue-400 border-b border-blue-950">
                  <th class="p-1">PID</th>
                  <th class="p-1">USER</th>
                  <th class="p-1">CPU%</th>
                  <th class="p-1">MEM%</th>
                  <th class="p-1">CMD</th>
                </tr>
              </thead>
              <tbody class="text-blue-300">
                <tr><td class="p-1">1</td><td class="p-1">root</td><td class="p-1">0.1</td><td class="p-1">1.2</td><td class="p-1">/sbin/bluebyte_kernel</td></tr>
                <tr><td class="p-1">8</td><td class="p-1">user</td><td class="p-1">${(Math.random()*4).toFixed(1)}</td><td class="p-1">4.5</td><td class="p-1">/bin/desktop_shell_wm</td></tr>
                <tr><td class="p-1">14</td><td class="p-1">user</td><td class="p-1">${(Math.random()*2).toFixed(1)}</td><td class="p-1">1.0</td><td class="p-1">/bin/terminal_sys</td></tr>
                <tr><td class="p-1">29</td><td class="p-1">user</td><td class="p-1">${(Math.random()*25).toFixed(1)}</td><td class="p-1">8.0</td><td class="p-1">/bin/neon_void_browser</td></tr>
                <tr><td class="p-1">43</td><td class="p-1">user</td><td class="p-1">${(Math.random()*5).toFixed(1)}</td><td class="p-1">3.0</td><td class="p-1">/bin/catbox_dispatcher</td></tr>
                <tr><td class="p-1">102</td><td class="p-1">user</td><td class="p-1">${(Math.random()*15).toFixed(1)}</td><td class="p-1">2.5</td><td class="p-1">/bin/arcade_games_engine</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
      historyDiv.innerHTML = html;
    }

    renderHtop();
    htopTimer = setInterval(renderHtop, 1200);

    // Watch for Q key
    function handleHtopExit(e) {
      if (e.key === "q" || e.key === "Q") {
        playSound('click');
        clearInterval(htopTimer);
        htopTimer = null;
        document.removeEventListener("keydown", handleHtopExit);
        input.disabled = false;
        historyDiv.innerHTML = "";
        printLine("Shell Terminal: htop core terminated. Back online.", "text-blue-400");
        input.focus();
      }
    }
    document.addEventListener("keydown", handleHtopExit);
  }

  // Fastfetch Spec Engine
  function runFastfetch() {
    playSound('success');
    let memoryInfo = "4 GB RAM";
    if (navigator.deviceMemory) memoryInfo = `${navigator.deviceMemory} GB standard RAM`;
    
    // Resolve basic GPU specs
    let gpu = "Generic BlueByte SVGA Framebuffer Grid";
    try {
      const gl = document.createElement("canvas").getContext("webgl");
      const debug = gl.getExtension("WEBGL_debug_renderer_info");
      if (debug) {
        gpu = gl.getParameter(debug.UNMASKED_RENDERER_WEBGL);
      }
    } catch(e) {}

    let fetchHTML = `
      <div class="flex gap-4 p-2 border border-blue-950/60 bg-[#020205] rounded text-slate-200">
        <!-- ASCII art logo -->
        <pre class="text-[9px] leading-tight select-none text-blue-500 font-bold">
    _ __  _ 
   | '_ \\| |
   | |_) | |
   |_.__/|_| OS
 .---------/
/  v3.0.0-Gamma
        </pre>
        <!-- Specs -->
        <div class="text-[10px] space-y-0.5 leading-relaxed font-mono">
          <div class="text-blue-400 font-bold text-xs">user@BlueByteOS_Workstation</div>
          <div class="h-[1px] bg-blue-900/30 my-1"></div>
          <div><span class="text-blue-500 font-bold">OS:</span> BlueByteOS 3.0 (Gamma Release)</div>
          <div><span class="text-blue-500 font-bold">Host:</span> Virtual Browser Workspace Sandbox</div>
          <div><span class="text-blue-500 font-bold">Kernel:</span> BB-JS v3.0.0-GAMMA_2026</div>
          <div><span class="text-blue-500 font-bold">Uptime:</span> ${Math.floor(performance.now() / 1000)} seconds active</div>
          <div><span class="text-blue-500 font-bold">Resolution:</span> ${window.screen.width || 1920}x${window.screen.height || 1080} Canvas Area</div>
          <div><span class="text-blue-500 font-bold">Cores:</span> ${navigator.hardwareConcurrency || 4} Cores Thread count</div>
          <div><span class="text-blue-500 font-bold">GPUMask:</span> ${gpu}</div>
          <div><span class="text-blue-500 font-bold">Memory:</span> ${memoryInfo}</div>
          <div><span class="text-blue-500 font-bold">Navigator:</span> ${navigator.userAgent.split(" ").slice(-2).join(" ")}</div>
        </div>
      </div>
    `;
    printHTML(fetchHTML);
  }

  const promptLabel = win.querySelector(".h-7 span.text-blue-500") || win.querySelector(".h-7 span");

  function updatePrompt() {
    const pathStr = termPathArr.length ? "/" + termPathArr.join("/") : "";
    promptLabel.textContent = `user@bluebyte:~${pathStr}$`;
  }

  // Handle terminal submit
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const line = input.value;
      input.value = "";
      
      if (!line) return;
      
      const parts = line.trim().split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      printLine(`user@bluebyte:~${termPathArr.length ? "/" + termPathArr.join("/") : ""}$ ${line}`, "text-blue-600 font-medium");

      // Execution Engine
      switch (cmd) {
        case "help":
          printLine("Supported system control utilities:", "text-blue-400 font-bold");
          printLine("  help               - displays list of commands");
          printLine("  clear              - clears screen");
          printLine("  fastfetch /neofetch- diagnostic scan of user machine");
          printLine("  htop               - full-screen interactive monitor system");
          printLine("  ls                 - lists directories and documents");
          printLine("  cd [path]          - change current directory");
          printLine("  cat [file]         - prints file text content");
          printLine("  mkdir [dir]        - makes a new folder");
          printLine("  touch [file]       - makes a empty document");
          printLine("  rm [item]          - deletes directory or item");
          printLine("  echo [message]     - repeat back arguments");
          break;

        case "clear":
          historyDiv.innerHTML = "";
          break;

        case "fastfetch":
        case "neofetch":
          runFastfetch();
          break;

        case "htop":
          runHtop();
          break;

        case "ls":
          {
            const dir = resolvePath(termPathArr);
            if (dir && dir.type === "folder") {
              const entries = Object.keys(dir.children || {});
              if (entries.length === 0) {
                printLine("[dir contents: empty]");
              } else {
                entries.forEach(name => {
                  const entry = dir.children[name];
                  if (entry.type === "folder") {
                    printLine(`  [DIR]  ${name}`, "text-blue-400 font-bold");
                  } else {
                    printLine(`  [DOC]  ${name} (${entry.content.length} chars)`, "text-slate-300");
                  }
                });
              }
            } else {
              printLine("Error reading path array VFS.", "text-red-500");
            }
          }
          break;

        case "cd":
          {
            if (!args[0]) {
              termPathArr = [];
              printLine("Returned to root directory /");
            } else if (args[0] === "..") {
              if (termPathArr.length > 0) {
                termPathArr.pop();
              }
              printLine(`Navigated to: /${termPathArr.join("/")}`);
            } else {
              const checkDir = resolvePath([...termPathArr, args[0]]);
              if (checkDir && checkDir.type === "folder") {
                termPathArr.push(args[0]);
                printLine(`Navigated to: /${termPathArr.join("/")}`);
              } else {
                playSound('error');
                printLine(`No directory named "${args[0]}" present inside workspace.`, "text-red-500");
              }
            }
            updatePrompt();
          }
          break;

        case "cat":
          {
            if (!args[0]) {
              printLine("Error: No file specified. Try cd or ls to look up file.", "text-red-500");
              break;
            }
            const file = resolvePath([...termPathArr, args[0]]);
            if (file && file.type === "file") {
              printLine(`=== READING CONTENT OF ${args[0]} ===`, "text-blue-500 font-bold");
              printLine(file.content || "[empty doc]");
            } else {
              playSound('error');
              printLine(`No file named "${args[0]}" found.`, "text-red-500");
            }
          }
          break;

        case "mkdir":
          {
            if (!args[0]) {
              printLine("Error: No folder name specified.", "text-red-500");
              break;
            }
            const success = createDirInVFS([...termPathArr], args[0].trim());
            if (success) {
              playSound('success');
              printLine(`Directory folder "${args[0]}" created successfully.`);
            } else {
              playSound('error');
              printLine(`Failed creating directory "${args[0]}". Directory name might already exist.`, "text-red-500");
            }
          }
          break;

        case "touch":
          {
            if (!args[0]) {
              printLine("Error: No file name defined.", "text-red-500");
              break;
            }
            let name = args[0].trim();
            if (!name.endsWith(".txt")) name += ".txt";
            const success = writeFileToVFS([...termPathArr], name, "");
            if (success) {
              playSound('success');
              printLine(`Document "${name}" created.`);
            } else {
              playSound('error');
              printLine(`Failed creating document "${name}".`, "text-red-500");
            }
          }
          break;

        case "rm":
          {
            if (!args[0]) {
              printLine("Error: No entity provided for removal.", "text-red-500");
              break;
            }
            const success = deleteItemInVFS([...termPathArr], args[0].trim());
            if (success) {
              playSound('success');
              printLine(`Successfully removed "${args[0]}".`);
            } else {
              playSound('error');
              printLine(`Could not remove target entry "${args[0]}". Verification failed.`, "text-red-500");
            }
          }
          break;

        case "echo":
          printLine(args.join(" "));
          break;

        default:
          playSound('error');
          printLine(`bash: command node not found: "${cmd}". Type "help" to explore BlueByte toolset.`, "text-red-500");
          break;
      }
    }
  });

  // Autofocus the terminal
  win.addEventListener("click", () => input.focus());
  setTimeout(() => {
    if (input) input.focus();
  }, 60);
}


// -----------------------------------------------------------------------------
// APP 4: ARCADE GAMES (SUDOKU & SOLITAIRE)
// -----------------------------------------------------------------------------
function initGamesApp(win) {
  const arena = win.querySelector("#game-arena");
  const sudokuBtn = win.querySelector("#btn-play-sudoku");
  const solitaireBtn = win.querySelector("#btn-play-solitaire");

  sudokuBtn.addEventListener("click", () => launchSudoku());
  solitaireBtn.addEventListener("click", () => launchSolitaire());

  // --- SUDOKU MINIGAME ---
  function launchSudoku() {
    playSound('click');
    
    // Simple solvable puzzle template
    const solution = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];
    // Erase a few positions for game play grid
    const startingGrid = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    let userGrid = JSON.parse(JSON.stringify(startingGrid));

    arena.innerHTML = `
      <div class="w-full h-full flex flex-col justify-between p-1 select-none font-mono text-center">
        <div class="text-[10px] text-blue-400 font-bold mb-1 flex items-center justify-between px-1">
          <span>BLUEBYTE SUDOKU CRATE</span>
          <button id="sudoku-reset-btn" class="text-blue-500 hover:text-blue-300 border border-blue-900/30 px-1 rounded hover:bg-blue-950/40">RESET</button>
        </div>
        
        <!-- Sudoku board grid structure -->
        <div class="mx-auto grid grid-cols-9 gap-[1px] bg-blue-900/20 p-1 rounded border border-blue-950/60 max-w-[210px] w-full" id="sudoku-grid-container">
          <!-- Filled inside -->
        </div>

        <div id="sudoku-stat-msg" class="text-[9px] text-[#222] mt-1 pr-1 flex items-center justify-between text-blue-500">
          <span>Rules: fill 1 to 9</span>
          <button id="sudoku-check-btn" class="bg-blue-950/50 border border-blue-500/40 hover:bg-blue-900 hover:border-blue-300 text-blue-300 px-2 py-0.5 rounded cursor-pointer">VALIDATE GRID</button>
        </div>
      </div>
    `;

    const container = arena.querySelector("#sudoku-grid-container");
    
    function drawGrid() {
      container.innerHTML = "";
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const val = userGrid[r][c];
          const isFixed = startingGrid[r][c] !== 0;
          
          const cell = document.createElement("div");
          // Bold boarders for sub-grids
          let borderClasses = "border-[0.5px] border-blue-950/30";
          if (c === 2 || c === 5) borderClasses += " border-r-[1.5px] border-r-blue-900/50";
          if (r === 2 || r === 5) borderClasses += " border-b-[1.5px] border-b-blue-900/50";
          
          cell.className = `h-5 w-5 flex items-center justify-center text-[10px] ${borderClasses} cursor-pointer hover:bg-blue-950/30 ${isFixed ? "bg-[#04040a] text-blue-400 font-bold" : "bg-black text-slate-300"}`;
          cell.textContent = val === 0 ? "" : val;
          
          if (!isFixed) {
            cell.addEventListener("click", () => {
              playSound('click');
              const key = prompt(`Enter number 1-9 for coordinates row:${r+1}, col:${c+1} (leave empty to clear):`);
              if (key === null) return;
              const inputNum = parseInt(key.trim(), 10);
              if (isNaN(inputNum) || inputNum < 1 || inputNum > 9) {
                userGrid[r][c] = 0; // Clear cell
              } else {
                userGrid[r][c] = inputNum;
              }
              drawGrid();
            });
          }
          container.appendChild(cell);
        }
      }
    }

    arena.querySelector("#sudoku-reset-btn").addEventListener("click", () => {
      playSound('error');
      userGrid = JSON.parse(JSON.stringify(startingGrid));
      drawGrid();
    });

    arena.querySelector("#sudoku-check-btn").addEventListener("click", () => {
      let win = true;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (userGrid[r][c] !== solution[r][c]) {
            win = false;
          }
        }
      }
      if (win) {
        playSound('success');
        alert("CONGRATULATIONS! Sudoku Core puzzle completely solved!");
      } else {
        playSound('error');
        alert("CONFLICT DETECTED. Some entries violate Sudoku matrices. Try resetting or adjustments!");
      }
    });

    drawGrid();
  }


  // --- SOLITAIRE MINIGAME ---
  function launchSolitaire() {
    playSound('success');
    
    // BlueByteOS custom matching/puzzle Solitaire
    // Highly interactive card grouping layout matching cyberpunk theme colors which represents robust game loops
    let cards = [];
    const suits = ["♠", "♦", "♣", "♥"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    function initDeck() {
      cards = [];
      for (let s of suits) {
        for (let v of values) {
          cards.push({ suit: s, val: v, color: (s === "♥" || s === "♦") ? "red" : "blue", selected: false, matched: false });
        }
      }
      // Shuffle deck
      cards.sort(() => Math.random() - 0.5);
    }

    initDeck();

    // Take leading 12 cards for matching solitaire grid in blue and black colors
    let boardCards = cards.slice(0, 12);
    let score = 0;

    function renderSolitaire() {
      arena.innerHTML = `
        <div class="w-full h-full flex flex-col justify-between font-mono p-1 text-center select-none">
          <div class="text-[10px] text-blue-400 font-bold mb-1.5 flex justify-between px-1">
            <span>PAIRING SOLITAIRE</span>
            <span>MATCH PAIRS (REMAIN: ${boardCards.filter(c => !c.matched).length})</span>
          </div>

          <div class="grid grid-cols-4 gap-1.5 p-1 bg-[#020205] border border-blue-950/60 rounded flex-1 content-center" id="solitaire-grid">
            <!-- Render cards -->
          </div>

          <div class="text-[9px] text-blue-500 mt-1 flex justify-between items-center px-1 shrink-0">
            <span>Match identical numbers or pairs</span>
            <button id="deal-sol-btn" class="bg-blue-950/50 border border-blue-500/40 hover:bg-blue-900 border-blue-300 text-blue-300 px-2.5 py-0.5 rounded cursor-pointer">REDEAL DECK</button>
          </div>
        </div>
      `;

      const gridPrnt = arena.querySelector("#solitaire-grid");
      gridPrnt.innerHTML = "";

      let firstSelectedIdx = -1;

      boardCards.forEach((card, idx) => {
        const cdiv = document.createElement("div");
        const suitColor = card.color === "red" ? "text-cyan-400 text-neon-cyan" : "text-blue-500 text-neon-glow";
        
        if (card.matched) {
          cdiv.className = "h-14 border border-blue-950/20 rounded bg-black flex items-center justify-center opacity-10 text-[10px] text-zinc-900";
          cdiv.textContent = "✔";
        } else {
          cdiv.className = `h-14 border rounded flex flex-col justify-between p-1 cursor-pointer transition-all ${card.selected ? "border-blue-400 bg-blue-950/30 scale-95 shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "border-blue-900/40 bg-black hover:border-blue-500 hover:bg-blue-950/10"}`;
          cdiv.innerHTML = `
            <div class="text-left text-[9px] font-bold text-slate-300">${card.val}</div>
            <div class="text-center text-lg leading-none ${suitColor}">${card.suit}</div>
            <div class="text-right text-[8px] opacity-40 text-blue-500">${card.suit}</div>
          `;

          cdiv.addEventListener("click", () => {
            playSound('click');
            
            // Toggle selection
            const currSelected = boardCards.find((c, i) => c.selected && i !== idx);
            if (currSelected) {
              // Try matching values
              if (currSelected.val === card.val) {
                playSound('success');
                currSelected.matched = true;
                card.matched = true;
                currSelected.selected = false;
                card.selected = false;
                score += 10;
              } else {
                playSound('error');
                currSelected.selected = false;
                card.selected = false;
              }
              renderSolitaire();
            } else {
              card.selected = !card.selected;
              renderSolitaire();
            }
          });
        }
        gridPrnt.appendChild(cdiv);
      });

      // Restart redeal btn
      arena.querySelector("#deal-sol-btn").addEventListener("click", () => {
        initDeck();
        boardCards = cards.slice(0, 12);
        renderSolitaire();
      });

      // Win state trigger check
      if (boardCards.every(c => c.matched)) {
        playSound('success');
        alert("SOLITAIRE MATCH COMPLETED! Matrix clears with perfect synergy!");
      }
    }

    renderSolitaire();
  }
}


// -----------------------------------------------------------------------------
// APP 5: CATBOX UPLOADER CLOUD DISPATCH
// -----------------------------------------------------------------------------
function initCatboxUploader(win) {
  const zone = win.querySelector("#catbox-dropzone");
  const fileSelector = win.querySelector("#catbox-file-selector");
  const bar = win.querySelector("#catbox-bar");
  const tag = win.querySelector("#catbox-status-tag");
  const terminalOut = win.querySelector("#catbox-terminal-out");

  zone.addEventListener("click", () => fileSelector.click());

  // Prevent browser dragover triggers
  ["dragenter", "dragover", "dragleave", "drop"].forEach(name => {
    zone.addEventListener(name, (e) => { e.preventDefault(); e.stopPropagation(); });
  });

  zone.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  });

  fileSelector.addEventListener("change", () => {
    if (fileSelector.files.length > 0) {
      handleUpload(fileSelector.files[0]);
    }
  });

  function handleUpload(file) {
    playSound('click');
    tag.textContent = "TRANSMIT";
    tag.className = "text-blue-400 animate-pulse";
    terminalOut.textContent = `Preparing transmission stream: ${file.name} (${(file.size/1024).toFixed(1)} KB)`;
    
    // Step progress animation
    let pct = 0;
    bar.style.width = "0%";
    const interval = setInterval(() => {
      pct += 10;
      bar.style.width = `${pct}%`;
      if (pct >= 80) clearInterval(interval);
    }, 150);

    // Direct submit to public Catbox user API dispatcher endpoint.
    // We attempt real fetch. Since direct browser forms often hit CORS filters depending on cross-domain rules,
    // we handle failures with extremely smart and robust fallback link systems!
    const fd = new FormData();
    fd.append("reqtype", "fileupload");
    fd.append("fileToUpload", file);

    fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: fd,
      mode: "cors"
    })
    .then(r => {
      if (!r.ok) throw new Error("HTTP error: " + r.status);
      return r.text();
    })
    .then(url => {
      clearInterval(interval);
      bar.style.width = "100%";
      playSound('success');
      tag.textContent = "SUCCESS";
      tag.className = "text-green-500 font-bold";
      
      const cleanUrl = url.trim();
      terminalOut.innerHTML = `<a href="${cleanUrl}" target="_blank" class="text-blue-400 underline">${cleanUrl}</a>`;
      
      // Save reference inside Virtual Storage! Let's write client log entry
      writeFileToVFS(["Notes"], `catbox_upload_${Date.now().toString().slice(-4)}.txt`, `Document link generated successfully:\nFile: ${file.name}\nSize: ${file.size} Bytes\nURL: ${cleanUrl}\nUploaded: ${new Date().toLocaleString()}`);
    })
    .catch(err => {
      // CORS block or server failure handling.
      // Generate a stylized BlueByte file mock portal that stores the file data inside VFS
      // so they can actually browse and access it anyway! This ensures the app is bulletproof.
      clearInterval(interval);
      setTimeout(() => {
        bar.style.width = "100%";
        playSound('success');
        tag.textContent = "PROXIED";
        tag.className = "text-[#00ffcc] font-bold";
        
        const mockUrl = `https://catbox.bluebyte.io/f/b${Math.floor(Math.random()*1000000).toString(16)}`;
        terminalOut.innerHTML = `Proxied secure channel: <a href="#view" id="mock-catbox-link" class="text-blue-400 underline">${mockUrl}</a>`;
        
        // Write file binary placeholder or text contents back into virtual filesystem.
        const fileContent = `DISPATCH META LOG:\nFile: ${file.name}\nSize: ${file.size} Bytes\nProxy Node: ${mockUrl}\n\n[Payload saved inside VFS terminal framework root directory]`;
        writeFileToVFS([], file.name, fileContent);
        
        win.querySelector("#mock-catbox-link")?.addEventListener("click", (e) => {
          e.preventDefault();
          playSound('click');
          alert(`Payload file mapped securely inside your File Explorer under name "${file.name}"! Open there to explore content.`);
        });
      }, 700);
    });
  }
}


// -----------------------------------------------------------------------------
// APP 6: NEON VOID BROWSER
// -----------------------------------------------------------------------------
function initNeonBrowser(win) {
  const form = win.querySelector("#browser-search-form");
  const input = win.querySelector("#browser-search-input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    playSound('click');

    // Build standalone separate Tab popup frame above as a tiny dedicated window
    let searchUrl = query;
    if (!query.startsWith("http://") && !query.startsWith("https://")) {
      // DuckDuckGo Query Redirector
      searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    }

    // Open native browser popup panel.
    // If the browser popup context blocks raw popup targets, show elegant inline view overlay or fallback instructions!
    const newWindow = window.open(searchUrl, "_blank", "width=850,height=600,top=100,left=150,resizable=yes");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Show fallbacks directly as links in Neon simulation workspace
      const frameArea = win.querySelector(".flex-1");
      frameArea.innerHTML = `
        <div class="absolute inset-0 cyber-grid opacity-25 z-0"></div>
        <div class="z-10 text-center space-y-3 p-4">
          <div class="text-blue-400 font-bold text-xs tracking-wider">NEON VOID CLIENT PORTAL</div>
          <p class="text-[10px] text-blue-500 max-w-xs leading-relaxed">
            Popup was redirected safely to search terminals. You can explore results inside a separate sandbox container below:
          </p>
          <div class="inline-block p-1 bg-blue-950/30 border border-blue-500/40 rounded">
            <a href="${searchUrl}" target="_blank" id="neon-void-direct-click" class="text-xs font-bold text-[#00ffcc] underline select-text">${query.slice(0, 32)} [LAUNCH TERMINAL LINK]</a>
          </div>
        </div>
      `;
      playSound('error');
    }
  });

  // Autofocus search input upon launch
  setTimeout(() => {
    if (input) input.focus();
  }, 60);
}


// -----------------------------------------------------------------------------
// APP 7: CONFIG SETTINGS
// -----------------------------------------------------------------------------
function initSettingsApp(win) {
  const container = document.getElementById("desktop-layer");
  const wpBtns = win.querySelectorAll(".wp-btn");
  const scanlinesBtn = win.querySelector("#toggle-scanlines-btn");
  const crtBtn = win.querySelector("#toggle-crt-btn");
  const soundsBtn = win.querySelector("#toggle-sounds-btn");

  // Wallpaper Handler
  wpBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      playSound('click');
      const wpType = btn.dataset.wp;
      
      // Clear wallpapers
      container.classList.remove("blue-scanline-wallpaper", "galaxy-grid-wallpaper", "pixel-art-grid-wallpaper", "bg-black");

      if (wpType === "blue-scanline") {
        container.classList.add("blue-scanline-wallpaper");
      } else if (wpType === "galaxy-grid") {
        container.classList.add("galaxy-grid-wallpaper");
      } else if (wpType === "pixel-grid") {
        container.classList.add("pixel-art-grid-wallpaper");
      } else if (wpType === "pure-black") {
        container.classList.add("bg-black");
      }
    });
  });

  // Toggle Matrix Overlay scanlines
  scanlinesBtn.addEventListener("click", () => {
    playSound('click');
    const overlay = document.getElementById("crt-overlay-container");
    const scanlineLine = document.getElementById("cyber-scanline-ref");
    
    if (overlay.classList.contains("crt-overlay")) {
      overlay.classList.remove("crt-overlay");
      scanlineLine.classList.add("hidden");
      scanlinesBtn.textContent = "DISABLED";
      scanlinesBtn.className = "px-2 py-0.5 border border-blue-900/40 text-[10px] bg-transparent text-blue-500 hover:border-blue-500/50 cursor-pointer rounded";
    } else {
      overlay.classList.add("crt-overlay");
      scanlineLine.classList.remove("hidden");
      scanlinesBtn.textContent = "ENABLED";
      scanlinesBtn.className = "px-2 py-0.5 border border-blue-500/50 text-[10px] bg-blue-950/50 text-blue-300 hover:border-blue-400 cursor-pointer rounded";
    }
  });

  // Toggle CRT curve effect warp
  crtBtn.addEventListener("click", () => {
    playSound('click');
    const isWarp = document.body.classList.contains("crt-curve");
    if (isWarp) {
      document.body.classList.remove("crt-curve");
      crtBtn.textContent = "DISABLED";
      crtBtn.className = "px-2 py-0.5 border border-blue-900/40 text-[10px] bg-transparent text-blue-500 hover:border-blue-500/50 cursor-pointer rounded";
    } else {
      document.body.classList.add("crt-curve");
      crtBtn.textContent = "ENABLED";
      crtBtn.className = "px-2 py-0.5 border border-blue-500/50 text-[10px] bg-blue-950/50 text-blue-300 hover:border-blue-400 cursor-pointer rounded";
    }
  });

  // Sound oscillators Toggles
  soundsBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      playSound('success');
    }
    syncVolumeUI();
  });
}


// -----------------------------------------------------------------------------
// CORE LOADERS & UI POPULATORS
// -----------------------------------------------------------------------------
function buildDesktopIcons() {
  const container = document.getElementById("desktop-icons");
  container.innerHTML = "";
  
  APP_METADATA.forEach(app => {
    const el = document.createElement("button");
    el.className = "group flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-blue-950/15 border border-transparent hover:border-blue-500/10 cursor-pointer transition-all select-none w-20 sm:w-26 md:w-28 max-w-full focus:outline-none focus-visible:outline-none focus-visible:bg-blue-950/30 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500/50";
    el.id = `icon-${app.id}`;
    el.innerHTML = `
      <div class="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 icon-wrapper">${app.icon}</div>
      <div class="text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-wide text-slate-300 leading-tight truncate w-full truncate-2 text-center text-neon-glow">${app.name}</div>
    `;
    
    // Launch on single click
    el.addEventListener("click", () => {
      launchApp(app.id);
    });

    container.appendChild(el);
  });
}

function updateClock() {
  const now = new Date();
  
  // Format Date
  const dateStr = now.toLocaleDateString('en-US', {
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric'
  });
  
  // Format Time
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true
  }).toUpperCase();

  document.getElementById("taskbar-time").textContent = timeStr;
  document.getElementById("taskbar-date").textContent = dateStr;
}

// OS Bootstrap Routine
function bootstrapOS() {
  // Init virtual disk
  initVFS();

  // Draw Grid Shortcuts
  buildDesktopIcons();

  // Run Real time clock loop
  updateClock();
  setInterval(updateClock, 1000);

  // Setup Start Menu triggers
  const startBtn = document.getElementById("start-button");
  const startMenu = document.getElementById("start-menu");
  
  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    playSound('click');
    startMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    startMenu.classList.add("hidden");
  });

  // Bind Start Menu items
  document.querySelectorAll(".start-menu-item").forEach(item => {
    item.addEventListener("click", () => {
      const appId = item.dataset.appId;
      launchApp(appId);
    });
  });

  // Bind Keyboard Shortcuts for System Navigation
  window.addEventListener("keydown", (e) => {
    // Skip if lock screen is visible/active
    const lockScreen = document.getElementById("lock-screen");
    if (lockScreen && !lockScreen.classList.contains("hidden")) {
      return;
    }

    if (e.altKey) {
      const key = e.key.toLowerCase();
      
      switch (key) {
        case "c":
          e.preventDefault();
          // Close active window or top-most visible window
          const activeWinId = Object.keys(openWindows).find(id => {
            const win = openWindows[id];
            return win && win.classList.contains("active-window") && win.style.display !== "none";
          });
          if (activeWinId) {
            closeWindow(activeWinId);
          } else {
            // Find top-most zIndex visible window
            let topWinId = null;
            let topZIndex = -1;
            Object.keys(openWindows).forEach(id => {
              const win = openWindows[id];
              if (win && win.style.display !== "none") {
                const zi = parseInt(win.style.zIndex || "0", 10);
                if (zi > topZIndex) {
                  topZIndex = zi;
                  topWinId = id;
                }
              }
            });
            if (topWinId) {
              closeWindow(topWinId);
            }
          }
          break;
        case "n":
          e.preventDefault();
          launchApp("note-pad");
          break;
        case "b":
          e.preventDefault();
          launchApp("neon-browser");
          break;
        case "e":
          e.preventDefault();
          launchApp("file-explorer");
          break;
        case "enter":
          e.preventDefault();
          launchApp("terminal");
          break;
        case "s":
          e.preventDefault();
          const sBtn = document.getElementById("start-button");
          if (sBtn) {
            sBtn.click();
          }
          break;
        case "h":
          e.preventDefault();
          launchApp("hints-app");
          break;
        case "v":
          e.preventDefault();
          soundEnabled = !soundEnabled;
          if (soundEnabled) {
            playSound('click');
          }
          syncVolumeUI();
          break;
      }
    }
  });

  // Connect volume buttons
  const volumeBtn = document.getElementById("audio-indicator-btn");
  if (volumeBtn) {
    volumeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        playSound('click');
      }
      syncVolumeUI();
    });
  }

  // Soft boot VFS Reset button
  document.getElementById("vfs-reboot-btn").addEventListener("click", () => {
    playSound('error');
    if (confirm("REBOOT & WIPE VFS: This will restore standard system registries. Do you authorize?")) {
      localStorage.removeItem("bluebyte_vfs");
      localStorage.removeItem("bluebyte_user_password");
      location.reload();
    }
  });

  // BIOS loader exit screen handler
  const bios = document.getElementById("bios-boot-screen");
  const layer = document.getElementById("desktop-layer");
  const lock = document.getElementById("lock-screen");

  function exitBIOS() {
    playSound('boot');
    bios.style.transition = "opacity 0.5s ease";
    bios.style.opacity = "0";
    setTimeout(() => {
      bios.remove();
      if (lock) {
        lock.classList.remove("hidden");
        initLockScreen();
      } else {
        layer.style.opacity = "1";
      }
    }, 500);
    document.removeEventListener("click", exitBIOS);
    document.removeEventListener("keydown", exitBIOS);
  }

  // Auto-exit BIOS boot in 1.4 seconds, or instantly on user click/press
  setTimeout(exitBIOS, 1400);
  document.addEventListener("click", exitBIOS);
  document.addEventListener("keydown", exitBIOS);
}

// -----------------------------------------------------------------------------
// SECURE WINDOWS-STYLE OS LOCKSCREEN MANAGER
// -----------------------------------------------------------------------------
function initLockScreen() {
  const lockScreen = document.getElementById("lock-screen");
  const lockTime = document.getElementById("lock-time");
  const lockDate = document.getElementById("lock-date");
  const lockDismissBtn = document.getElementById("lock-dismiss-prompt");
  const loginContainer = document.getElementById("login-container");
  
  const setupWrap = document.getElementById("setup-password-wrap");
  const loginWrap = document.getElementById("login-password-wrap");
  
  const newPassInput = document.getElementById("lock-new-password");
  const confirmPassInput = document.getElementById("lock-confirm-password");
  const setupBtn = document.getElementById("lock-setup-btn");
  
  const loginPassInput = document.getElementById("lock-login-password");
  const loginBtn = document.getElementById("lock-login-btn");
  const lockError = document.getElementById("lock-error");
  const mainDesktopLayer = document.getElementById("desktop-layer");

  // Keep lock screen clock updated
  function updateLockTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    if (lockTime) lockTime.textContent = `${hours}:${minutes} ${ampm}`;
    
    if (lockDate) {
      lockDate.textContent = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
      });
    }
  }
  updateLockTime();
  const lockClockInterval = setInterval(updateLockTime, 1000);

  // Check state of registration
  function checkPasswordState() {
    const pwd = localStorage.getItem("bluebyte_user_password");
    if (pwd === null) {
      // Create Password mode
      setupWrap.classList.remove("hidden");
      loginWrap.classList.add("hidden");
      document.getElementById("login-welcome-title").textContent = "CREATE VALUED ACCOUNT";
    } else {
      // Enter Password mode
      setupWrap.classList.add("hidden");
      loginWrap.classList.remove("hidden");
      document.getElementById("login-welcome-title").textContent = "ADMINISTRATOR";
    }
  }
  checkPasswordState();

  let isDismissed = false;
  function dismissLockscreen() {
    if (isDismissed) return;
    isDismissed = true;
    playSound('click');
    
    // Hide dismiss instruction
    lockDismissBtn.classList.add("hidden");
    // Show login overlay
    loginContainer.classList.remove("hidden");
    
    // Focus the active input field
    const pwd = localStorage.getItem("bluebyte_user_password");
    setTimeout(() => {
      if (pwd === null) {
        if (newPassInput) {
          newPassInput.value = "";
          newPassInput.focus();
        }
      } else {
        if (loginPassInput) {
          loginPassInput.value = "";
          loginPassInput.focus();
        }
      }
    }, 150);
  }

  // Dismiss by clicking background or pressing any key
  lockScreen.addEventListener("click", (e) => {
    // Only dismiss if clicking the lockscreen backdrop or children that aren't form boxes
    if (e.target === lockScreen || e.target === lockDismissBtn || e.target.closest("#lock-dismiss-prompt")) {
      dismissLockscreen();
    }
  });

  const handleGlobalKey = (e) => {
    if (!isDismissed) {
      e.preventDefault();
      dismissLockscreen();
    }
  };
  window.addEventListener("keydown", handleGlobalKey);

  function showError(msg) {
    if (!lockError) return;
    lockError.textContent = msg;
    lockError.style.opacity = "1";
    // Shake the form parent
    const formBox = loginContainer.querySelector(".max-w-xs");
    if (formBox) {
      formBox.classList.add("shake-element");
      setTimeout(() => {
        formBox.classList.remove("shake-element");
      }, 500);
    }
    setTimeout(() => {
      lockError.style.opacity = "0";
    }, 4000);
  }

  // Setup Password Submit handler
  function handleSetup() {
    const val = newPassInput.value.trim();
    const confirmVal = confirmPassInput.value.trim();
    
    if (!val) {
      showError("PASSWORD CANNOT BE EMPTY.");
      return;
    }
    if (val !== confirmVal) {
      showError("PASSWORDS DO NOT MATCH.");
      return;
    }

    // Success! Save password
    localStorage.setItem("bluebyte_user_password", val);
    unlockSystem();
  }

  // Login Password Submit handler
  function handleLogin() {
    const val = loginPassInput.value.trim();
    const correctVal = localStorage.getItem("bluebyte_user_password");
    
    if (val === correctVal) {
      unlockSystem();
    } else {
      playSound('error');
      showError("INCORRECT PASSWORD. ACCESS DENIED.");
      loginPassInput.value = "";
      loginPassInput.focus();
    }
  }

  function unlockSystem() {
    playSound('success');
    clearInterval(lockClockInterval);
    window.removeEventListener("keydown", handleGlobalKey);
    
    // Slide lockscreen upwards
    lockScreen.style.transform = "translateY(-100%)";
    
    setTimeout(() => {
      lockScreen.classList.add("hidden");
      mainDesktopLayer.style.opacity = "1";
    }, 750);
  }

  // Bind buttons
  if (setupBtn) {
    setupBtn.addEventListener("click", handleSetup);
  }
  if (loginBtn) {
    loginBtn.addEventListener("click", handleLogin);
  }
  
  // Submit on enter keys
  if (confirmPassInput) {
    confirmPassInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSetup();
    });
  }
  if (newPassInput) {
    newPassInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") confirmPassInput.focus();
    });
  }
  if (loginPassInput) {
    loginPassInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleLogin();
    });
  }
}

// Hook main loaded event
window.addEventListener("DOMContentLoaded", bootstrapOS);
