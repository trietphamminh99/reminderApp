import { useState } from "react";

export default function AddReminder({ handleAddReminder }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleSaveClick = () => {
    if (!title || !note || !date) return; // simple validation
    handleAddReminder(title, note, date);
    setTitle("");
    setNote("");
    setDate("");
  };

  return (
    <div className="reminder new">
      <textarea
        rows="1"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="4"
        placeholder="Note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <p>---------------------</p>
      <div className="reminder-footer">
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
}
