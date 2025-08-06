"use client";

import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { ButtonConfig } from "@/app/page";

const EditButton = () => {
  const [button, setButton] = useState<ButtonConfig>({ title: "", link: "", color: "red" });
  const [index, setIndex] = useState<number | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.index) {
      setIndex(Number(params.index));
    }
  }, [params.index]);

  useEffect(() => {
    if (index === null) {
      return;
    }

    const savedButtons = JSON.parse(localStorage.getItem("buttons") || "[]");
    if (savedButtons[index]) {
      setButton(savedButtons[index]);
    }
  }, [index]);

  const handleSave = () => {
    if (index === null) {
      return;
    }

    const savedButtons = JSON.parse(localStorage.getItem("buttons") || "[]");
    savedButtons[index] = button;
    localStorage.setItem("buttons", JSON.stringify(savedButtons));

    router.push("/");
  };

  const handleReset = () => {
    const defaultButton = { title: "", link: "", color: "gray" };
    setButton(defaultButton);

    if (index === null) {
      return;
    }

    const savedButtons = JSON.parse(localStorage.getItem("buttons") || "[]");
    savedButtons[index] = defaultButton;
    localStorage.setItem("buttons", JSON.stringify(savedButtons));
  };

  if (index === null) {
    return <div>Loading...</div>;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setButton((prev) => ({ ...prev, [name as string]: value }));
  };

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField label="Title" variant="outlined" fullWidth name="title" value={button.title} onChange={handleChange} />
        <TextField label="Link" variant="outlined" fullWidth name="link" value={button.link} onChange={handleChange} />
        <FormControl fullWidth>
          <InputLabel>Color</InputLabel>
          <Select label="Color" name="color" value={button.color} onChange={handleChange}>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditButton;
