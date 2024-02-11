import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import LessonForm from "../../component/LessonForm";
import DropDown from "../../component/DropDown";

const domainUrl = "https://notes-maker-three.vercel.app/api";
export default function NotesMaker() {
  const [leassonList, setLeassonList] = useState([]);
  const [lesson, setLeasson] = useState("");
  const [note, setNote] = useState({
    topic: "",
    description: "",
    code: "",
    refrenceLink: "",
  });
  const getLessons = async () => {
    const result = await fetch(`${domainUrl}/googlesheet/lesson`);
    return result;
  };
  useEffect(() => {
    getLessons()
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setLeassonList(data?.result);
        setLeasson(data?.result[0]);
      })
      .catch((err) => {
        console.log("Error while fetch leeson list", err);
      });
  }, []);
  const [addLesson, setAddLeasson] = useState("");

  const [open, setOpen] = useState(false);
  const handleSubmitForm = useCallback(async () => {
    const response = await fetch(`${domainUrl}/googlesheet/note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify({ ...note, lesson }),
    });
    if (response.status === 200) {
      setNote({
        topic: "",
        description: "",
        code: "",
        refrenceLink: "",
      });
    }
  });
  const handleNoteFormSubmit = useCallback(() => {
    // Handle form submission logic
    setLeassonList([...leassonList, addLesson]);
    setLeasson(addLesson);
    setOpen(false); // Close the dialog after submission
  });

  const onLessonMenuSelect = useCallback((selected) => {
    setLeasson(selected);
  }, []);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleAddLessonChange = useCallback((lessonInput) => {
    setAddLeasson(lessonInput);
  });
  console.log(leassonList);
  return (
    <Grid
      container
      xs={12}
      md={12}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        gap: "1rem",
        alignItems: "baseline",
      }}
    >
      <Grid container item xs={12} md={3}>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <DropDown
            menuList={leassonList}
            onSelect={onLessonMenuSelect}
            selected={lesson}
          />
          <Button variant="contained" onClick={handleOpenDialog}>
            Add Lesson
          </Button>
          <PopUp
            open={open}
            onClose={handleCloseDialog}
            title="Add Lesson"
            value={addLesson}
            handleOnChange={handleAddLessonChange}
            handleCloseDialog={handleCloseDialog}
            handleSubmit={handleNoteFormSubmit}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={8} sx={{}}>
        <LessonForm
          note={note}
          setNote={setNote}
          handleSubmitForm={handleSubmitForm}
        />
      </Grid>
    </Grid>
  );
}
function PopUp({
  open,
  title,
  lable,
  handleOnChange,
  onClose,
  value,
  handleCloseDialog,
  handleSubmit,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          label={lable || title}
          variant="outlined"
          fullWidth
          value={value}
          onChange={(e) => handleOnChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Close</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
