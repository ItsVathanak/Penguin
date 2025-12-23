# Penguin

A distraction-free, local-first markdown editor built for speed and focus.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)

## Features

- **📝 Live Markdown Preview** — Write in the left pane, see rendered output instantly on the right
- **💾 Local-First Storage** — All notes are stored in IndexedDB, keeping your data private and offline-ready
- **🔄 Auto-Save** — Notes save automatically as you type (debounced at 500ms)
- **🌙 Dark/Light Mode** — Toggle between themes with system preference detection
- **📥 Download Notes** — Export any note as a `.md` file
- **🎨 Syntax Highlighting** — Code blocks are beautifully highlighted using VS Code's dark theme
- **📜 Synchronized Scrolling** — Editor and preview panes scroll together
- **🎯 GFM Support** — GitHub Flavored Markdown including tables, task lists, and strikethrough
---
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Penguin

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```
---
## Project Structure

```
Penguin/
├── src/
│   ├── components/
│   │   ├── AntiGravity.tsx    # Interactive particle background animation
│   │   ├── Navbar.tsx         # Navigation bar for the home page
│   │   └── Sidebar.tsx        # Note list, actions, and theme toggle
│   ├── hooks/
│   │   ├── useAutosave.ts     # Auto-save hook utility
│   │   └── useNotes.ts        # Core note management logic
│   ├── pages/
│   │   ├── Editor.tsx         # Main editor with split-pane view
│   │   └── Home.tsx           # Landing page with particle animation
│   ├── App.tsx                # Router configuration
│   ├── main.tsx               # Application entry point
│   ├── types.ts               # TypeScript type definitions
│   └── index.css              # Global styles and Tailwind imports
├── public/                    # Static assets
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```
---
## Architecture

### Data Flow

```
User Input → useNotes Hook → IndexedDB (idb-keyval)
                ↓
            State Update → React Re-render → UI
```

### Key Components

| Component | Description |
|-----------|-------------|
| `useNotes` | Custom hook managing all note CRUD operations and persistence |
| `Editor` | Split-pane markdown editor with synchronized scrolling |
| `Sidebar` | Note list with create, delete (with confirmation), and download actions |
| `AntiGravity` | Three.js powered particle animation for the home page |

### Note Structure

```typescript
interface Note {
  id: string;        // UUID generated via crypto.randomUUID()
  title: string;     // Auto-extracted from first heading
  content: string;   // Raw markdown content
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
}
```
---
## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Routing** | React Router v7 |
| **Storage** | IndexedDB (via idb-keyval) |
| **Markdown** | react-markdown + remark-gfm |
| **Syntax Highlighting** | react-syntax-highlighter |
| **Icons** | Lucide React |
| **3D Graphics** | Three.js + React Three Fiber |

## Usage

### Creating Notes
Click the **"+ New Note"** button in the sidebar to create a new note.

### Editing Notes
- Select a note from the sidebar
- Type markdown in the left pane
- See the live preview on the right pane

### Dynamic Titles
The note title is automatically extracted from the first heading (`# Title`) in your content.

### Deleting Notes
1. Hover over a note in the sidebar
2. Click the trash icon
3. Confirm deletion in the popup

### Downloading Notes
Select a note and click **"Download Note"** to save it as a `.md` file.

### Theme Toggle
Click the **Light/Dark Mode** button at the bottom of the sidebar to switch themes.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

This project is private and was created as part of a 2-week project.

---


