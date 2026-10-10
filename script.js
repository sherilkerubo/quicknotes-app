// Query Selectors
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");
const clearAllBtn = document.querySelector("#clear-all-btn");

// Application State
let notes = [];

// Load Notes from LocalStorage
function loadNotes() {
  const savedNotes = localStorage.getItem("quicknotes_app_data");
  if (savedNotes) {
    try {
      notes = JSON.parse(savedNotes);
    } catch (e) {
      notes = [];
    }
  }
}

// Save Notes to LocalStorage
function saveNotes() {
  localStorage.setItem("quicknotes_app_data", JSON.stringify(notes));
}

// Update Note Count Display
function updateCount(count) {
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// Render Notes to DOM
function render(filterTerm = "") {
  notesList.textContent = "";

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(filterTerm.toLowerCase())
  );

  updateCount(notes.length);

  if (filteredNotes.length === 0) {
    if (notes.length > 0 && filterTerm !== "") {
      const emptyMsg = document.createElement("p");
      emptyMsg.className = "no-notes-msg";
      emptyMsg.textContent = "No notes match your search.";
      notesList.appendChild(emptyMsg);
    }
    return;
  }

  filteredNotes.forEach(note => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;

    const headerDiv = document.createElement("div");
    headerDiv.className = "note-header-info";

    const categorySpan = document.createElement("span");
    categorySpan.className = "category-badge";
    categorySpan.textContent = note.category;

    const dateSpan = document.createElement("span");
    dateSpan.className = "note-date";
    dateSpan.textContent = note.createdAt;

    headerDiv.appendChild(categorySpan);
    headerDiv.appendChild(dateSpan);

    const textPara = document.createElement("p");
    textPara.className = "note-text";
    textPara.textContent = note.text; // Safe text handling

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "note-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    actionsDiv.appendChild(deleteBtn);

    li.appendChild(headerDiv);
    li.appendChild(textPara);
    li.appendChild(actionsDiv);

    notesList.appendChild(li);
  });
}

// Add Note Function
function addNote(e) {
  e.preventDefault();
  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validation
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const now = new Date();
  const formattedDate = now.toLocaleDateString() + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: formattedDate
  };

  notes.unshift(newNote); // Add newest note to the top
  saveNotes();
  render(searchInput.value);

  noteInput.value = "";
  noteInput.focus();
}

// Delete Single Note
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  render(searchInput.value);
}

// Bonus: Clear All Notes
function clearAllNotes() {
  if (notes.length === 0) return;
  
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
    errorMessage.textContent = "";
  }
}

// Event Listeners
noteForm.addEventListener("submit", addNote);

searchInput.addEventListener("input", () => {
  render(searchInput.value);
});

clearAllBtn.addEventListener("click", clearAllNotes);

// Initialization
loadNotes();
render();