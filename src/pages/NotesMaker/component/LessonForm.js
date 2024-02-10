// components/LessonForm.js
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function LessonForm({ note, setNote, handleSubmitForm }) {
  const noteFormFields = {
    topic: "topic",
    description: "description",
    code: "code",
    refrenceLink: "refrenceLink",
  };
  const [error, setError] = useState(false);
  return (
    <form
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        type="text"
        label="Topic"
        variant="outlined"
        margin="normal"
        sx={{ width: "100%", marginBottom: "16px" }}
        error={error}
        value={note[noteFormFields?.topic]}
        onChange={(e) => setNote({ ...note, topic: e.target.value })}
      />
      <TextField
        type="text"
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        margin="normal"
        sx={{ width: "100%", marginBottom: "16px" }}
        value={note[noteFormFields?.description]}
        onChange={(e) => setNote({ ...note, description: e.target.value })}
      />
      <TextField
        type="text"
        label="Code"
        variant="outlined"
        multiline
        rows={6}
        margin="normal"
        sx={{ width: "100%", marginBottom: "16px" }}
        value={note[noteFormFields?.code]}
        onChange={(e) => setNote({ ...note, code: e.target.value })}
      />
      <TextField
        type="url"
        label="Reference Links"
        variant="outlined"
        margin="normal"
        sx={{ width: "100%", marginBottom: "16px" }}
        value={note[noteFormFields?.refrenceLink]}
        onChange={(e) => setNote({ ...note, refrenceLink: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "100%" }}
        onClick={() => {
          if (!note.topic) {
            setError(true);
            return;
          }
          setError(false);

          handleSubmitForm();
        }}
      >
        Submit
      </Button>
    </form>
  );
}

export default LessonForm;
