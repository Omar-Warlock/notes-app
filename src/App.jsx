import { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import Notes from "./components/Notes";

function App() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);
  
  const handleAddNote = (newNote) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes); // This triggers re-render
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Persist to localStorage
  };

  const handleUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setEditingNote(null);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleToggle = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, checked: !note.checked } : note
    );
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      activeCategory === "ALL" || note.category === activeCategory;
    const matchesSearch = note.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCompletion = !showOnlyCompleted || note.checked;
    return matchesCategory && matchesSearch && matchesCompletion;
  });

  return (
    <>
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        showOnlyCompleted={showOnlyCompleted}
        setShowOnlyCompleted={setShowOnlyCompleted}
        onAddNote={handleAddNote}
        onUpdateNote={handleUpdateNote}
        editingNote={editingNote}
        setEditingNote={setEditingNote}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Notes
        notes={filteredNotes}
        onToggle={handleToggle}
        onEdit={setEditingNote}
        onDelete={handleDeleteNote}
      />
      <footer className="text-center py-3 text-muted small border-top">
        <div className="container">
          NotaFlow © {new Date().getFullYear()} | Made with ❤️ by Omar
        </div>
      </footer>
    </>
  );
}

export default App;
