import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useFlashcards } from "../providers/FlashcardProvider";
import SettingsDialog from "../components/SettingsDialog";

import MemoryIcon from "@mui/icons-material/Memory";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import CodeIcon from "@mui/icons-material/Code";
import SchemaIcon from "@mui/icons-material/Schema";
import BugReportIcon from "@mui/icons-material/BugReport";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import NumbersIcon from "@mui/icons-material/Numbers";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DatasetIcon from "@mui/icons-material/Dataset";
import DatasetLinkedIcon from "@mui/icons-material/DatasetLinked";
import HubIcon from "@mui/icons-material/Hub";

// Chapter Icons
const chapterIcons = {
  "Computer Architecture": <MemoryIcon color="primary" />,
  Algorithms: <AccountTreeIcon color="primary" />,
  "Designing Algorithms": <ViewQuiltIcon color="primary" />,
  Programming: <CodeIcon color="primary" />,
  "Program Development": <SchemaIcon color="primary" />,
  "Program Testing": <BugReportIcon color="primary" />,
  Ethics: <FaceRetouchingNaturalIcon color="primary" />,
  "Number Systems & Applications": <NumbersIcon color="primary" />,
  "Logic Gates": <ArrowForwardIcon color="primary" />,
  "Excel Theory": <DatasetIcon color="primary" />,
  "Excel Functions": <DatasetLinkedIcon color="primary" />,
  "Computer Networks": <HubIcon color="primary" />,
};

const Dashboard = ({ toggleTheme, currentTheme, themes }) => {
  const { chapters } = useFlashcards();
  const navigate = useNavigate();

  // Dialog state for Settings Modal
  const [openSettings, setOpenSettings] = useState(false);

  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  return (
    <Container sx={{ padding: "20px", position: "relative" }}>
      {/* Settings Button at top-right */}
      <IconButton
        sx={{ position: "absolute", top: 10, right: 10 }}
        onClick={handleOpenSettings}
        color="primary"
      >
        <SettingsIcon />
      </IconButton>

      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Chapters
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {Object.keys(chapters).map((chapter, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              onClick={() => {
                navigate(`/chapter/${chapter}`);
              }}
              sx={{
                textDecoration: "none",
                width: 300,
                height: 180,
                ":hover": { boxShadow: 3, backgroundColor: "background" }, // Soft hover effect
                padding: "10px",
                backgroundColor: "background", // Card background (darker shade)
                color: "secondary", // Light text color
              }}
            >
              {chapterIcons[chapter]}
              <CardContent>
                <Typography variant="h5" component="h2" color="primary">
                  {chapter}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <SettingsDialog
        open={openSettings}
        handleCloseSettings={handleCloseSettings}
        currentTheme={currentTheme}
        toggleTheme={toggleTheme}
        themes={themes} // Pass themes to the dialog
      />
    </Container>
  );
};

export default Dashboard;
