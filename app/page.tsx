"use client";

import { useState, useEffect } from "react";
import { Button, Grid, Box, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

export interface ButtonConfig {
  title: string;
  link: string;
  color: string;
}

const Dashboard = () => {
  const [buttons, setButtons] = useState<ButtonConfig[]>(Array(9).fill({ title: "", link: "", color: "gray" }));
  const router = useRouter();

  useEffect(() => {
    const savedButtons = JSON.parse(localStorage.getItem("buttons") || "[]");

    if (savedButtons.length) {
      setButtons(savedButtons);
    }
  }, []);

  const handleButtonClick = (index: number) => {
    const button = buttons[index];

    if (button.link) {
      const link = button.link.startsWith("http://") || button.link.startsWith("https://") ? button.link : `https://${button.link}`;
      window.location.href = link;
    } else {
      router.push(`/edit/${index}`);
    }
  };

  const handleEditClick = (index: number) => router.push(`/edit/${index}`);

  const handleDeleteClick = (index: number) => {
    const newButtons = [...buttons];
    newButtons[index] = { title: "", link: "", color: "gray" };
    setButtons(newButtons);
    localStorage.setItem("buttons", JSON.stringify(newButtons));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 3,
      }}
    >
      <Grid
        container
        sx={{
          spacing: 2,
          gap: 2,
          maxWidth: "1000px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {buttons.map((button, index) => (
          <Grid key={index}>
            <Paper
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #dddddd",
                height: "180px",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                fullWidth
                sx={{
                  height: "100px",
                  backgroundColor: button?.color || "gray",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 1,
                  fontSize: { xs: "14px", sm: "16px", md: "18px" },
                  overflow: "hidden",
                  wordBreak: "break-all",
                }}
                onClick={() => handleButtonClick(index)}
              >
                {button.title || "Set Title"}
              </Button>

              {button.title && (
                <Box display="flex" gap={1}>
                  <IconButton onClick={() => handleEditClick(index)} color="inherit" sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(index)} color="error" sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
