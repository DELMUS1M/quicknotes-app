# QuickNotes App

QuickNotes is a lightweight, responsive web application designed for capturing, categorizing, and searching daily thoughts and reminders instantly. Built entirely from scratch using plain HTML5, modern CSS (Flexbox, CSS Grid, and custom variables), and vanilla JavaScript, QuickNotes enables users to add notes across Personal, Work, and Study categories with real-time character validation and persistent browser storage.

## Features

- **Categorized Note Creation**: Assign notes to **Personal**, **Work**, or **Study** categories with visual color-coded badges and border indicators.
- **Real-Time Input Validation**: Enforces note lengths between 1 and 200 characters with instant user feedback.
- **Instant Keyword Search**: Dynamically filters notes as you type in the search bar.
- **Local Storage Persistence**: Automatically saves and restores your notes across browser sessions using `localStorage`.
- **Note Statistics**: Real-time counter displaying total note counts ("You have no notes yet.", "You have 1 note.", "You have N notes.").
- **Delete & Clear All**: Remove individual notes or safely wipe all notes using browser confirmation dialogs.
- **Responsive Mobile Layout**: Adapted for seamlessly viewing on desktop and mobile screens (under 600px).

## How to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/DELMUS1M/quicknotes-app.git
   cd quicknotes-app
   ```

2. **Open in Browser**:
   - Double-click `index.html` to open it in your default web browser.
   - Alternatively, use VS Code's **Live Server** extension to launch the app locally.

## What I Learned

1. **Safe DOM Manipulation**: Learned how to construct dynamic elements using `document.createElement()` and `textContent` to prevent XSS vulnerabilities, avoiding unsafe `innerHTML` injection for user input.
2. **Persistent Web Data**: Mastered serializing JavaScript arrays of objects using `JSON.stringify()` and deserializing them with `JSON.parse()` to seamlessly persist app state in `localStorage`.
3. **Responsive Flexbox & CSS Card Styling**: Applied CSS box-sizing resets, flex properties, border indicators, and media queries (`@media (max-width: 600px)`) to ensure a polished visual hierarchy on both mobile and desktop screens.
