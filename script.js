// DOM Element Selections using querySelector
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const clearAllBtn = document.querySelector("#clear-all-btn");

// Initialize notes array from localStorage
let notes = JSON.parse(localStorage.getItem("quicknotes_data")) || [];

/**
 * Saves current notes array to localStorage
 */
function saveNotes() {
  localStorage.setItem("quicknotes_data", JSON.stringify(notes));
}

/**
 * Updates the note count paragraph text
 * @param {number} count - Number of currently displayed notes
 * @param {boolean} isFiltered - Whether search filter is active
 */
function updateNoteCount(count, isFiltered = false) {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (isFiltered) {
    noteCount.textContent = `Showing ${count} of ${notes.length} ${notes.length === 1 ? "note" : "notes"}.`;
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

/**
 * Renders the notes list to the DOM safely using createElement and textContent
 * @param {Array} listToRender - Array of note objects to render
 */
function render(listToRender = notes) {
  // Clear list contents
  notesList.replaceChildren();

  const query = searchInput.value.trim().toLowerCase();
  const isFiltered = query.length > 0;

  if (listToRender.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "empty-message";
    emptyLi.textContent = isFiltered
      ? "No notes match your search."
      : "No notes here yet. Add one above!";
    notesList.appendChild(emptyLi);
  } else {
    listToRender.forEach((note) => {
      // Create Note Card Element
      const li = document.createElement("li");
      li.className = `note-card category-${note.category}`;

      // Content Wrapper
      const contentDiv = document.createElement("div");
      contentDiv.className = "note-content";

      // Note Text (Safely assigned via textContent)
      const textP = document.createElement("p");
      textP.className = "note-text";
      textP.textContent = note.text;

      // Note Meta Details (Category Badge + Date)
      const metaDiv = document.createElement("div");
      metaDiv.className = "note-meta";

      const badgeSpan = document.createElement("span");
      badgeSpan.className = "badge";
      badgeSpan.textContent = note.category;

      const dateSpan = document.createElement("span");
      dateSpan.className = "note-date";
      dateSpan.textContent = note.createdAt;

      metaDiv.appendChild(badgeSpan);
      metaDiv.appendChild(dateSpan);

      contentDiv.appendChild(textP);
      contentDiv.appendChild(metaDiv);

      // Delete Button
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "btn-delete";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteNote(note.id));

      // Assemble Card
      li.appendChild(contentDiv);
      li.appendChild(deleteBtn);

      notesList.appendChild(li);
    });
  }

  // Update Note Count
  updateNoteCount(listToRender.length, isFiltered);
}

/**
 * Deletes a note by ID and updates storage & view
 * @param {number} id - Note ID to delete
 */
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();

  // Re-apply current search filter if active
  const query = searchInput.value.trim().toLowerCase();
  const filtered = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );
  render(filtered);
}

/**
 * Form Submit Handler - Validates and adds new note
 */
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const rawText = noteInput.value;
  const trimmedText = rawText.trim();
  const category = noteCategory.value;

  // Validation 1: Empty text
  if (trimmedText === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // Validation 2: Max length 200 characters
  if (trimmedText.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear any existing error message
  errorMessage.textContent = "";

  // Format readable timestamp
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Create note object
  const newNote = {
    id: Date.now(),
    text: trimmedText,
    category: category,
    createdAt: dateFormatted,
  };

  // Add to array & persist
  notes.unshift(newNote); // Add newest note to top
  saveNotes();

  // Reset form inputs & search
  noteInput.value = "";
  searchInput.value = "";

  // Render updated list
  render();
});

/**
 * Search Input Event Handler - Filters list dynamically
 */
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );
  render(filteredNotes);
});

/**
 * Bonus: Clear All Notes with Confirmation
 */
if (clearAllBtn) {
  clearAllBtn.addEventListener("click", () => {
    if (notes.length === 0) return;
    if (confirm("Delete all notes?")) {
      notes = [];
      saveNotes();
      searchInput.value = "";
      render();
    }
  });
}

// Initial render on page load
render();
