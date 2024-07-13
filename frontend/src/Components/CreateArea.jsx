import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      addNote(title, content);
      setTitle("");
      setContent("");
    }
  };

  return (
    <form className="create-note" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">
        <AddIcon />
      </button>
    </form>
  );
};

export default NoteForm;
