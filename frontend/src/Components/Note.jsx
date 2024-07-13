import React from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const Note = ({ id, title, content, isPinned, onDelete, onEdit, onPin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(id, newTitle, newContent);
    }
    setIsEditing(!isEditing);
  };

  const noteStyle = {
    backgroundColor: isPinned ? "#40a578" : "#ffffff",
  };

  return (
    <div className={`note ${isPinned ? "pinned" : ""}`} style={noteStyle}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      )}
      <button onClick={() => onPin(id)}>
        <PushPinIcon />
      </button>
      <button onClick={() => onDelete(id)}>
        <DeleteIcon />
      </button>
      <button onClick={handleEdit}>
        {isEditing ? <SaveIcon /> : <EditIcon />}
      </button>
    </div>
  );
};
export default Note;
