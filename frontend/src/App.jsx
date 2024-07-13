import { useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Note from "./Components/Note";
import NoteForm from "./Components/CreateArea";
import Pagination from "./Components/Pagination";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  const addNote = (title, content) => {
    const newNote = { id: Date.now(), title, content, isPinned: false };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const editNote = (id, newTitle, newContent) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, title: newTitle, content: newContent }
          : note
      )
    );
  };

  const pinNote = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const getPinnedNotes = () => notes.filter((note) => note.isPinned);
  const getOtherNotes = () => notes.filter((note) => !note.isPinned);

  const getPaginatedNotes = () => {
    const pinnedNotes = getPinnedNotes();
    const otherNotes = getOtherNotes();
    const allNotes = [...pinnedNotes, ...otherNotes];
    const startIndex = (currentPage - 1) * notesPerPage;
    const endIndex = startIndex + notesPerPage;
    return allNotes.slice(startIndex, endIndex);
  };

  return (
    <div>
      <Header />
      <NoteForm addNote={addNote} />
      <div>
        {getPaginatedNotes().map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            isPinned={note.isPinned}
            onDelete={deleteNote}
            onEdit={editNote}
            onPin={pinNote}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(notes.length / notesPerPage)}
        onPageChange={setCurrentPage}
      />
      <Footer />
    </div>
  );
}

export default App;
