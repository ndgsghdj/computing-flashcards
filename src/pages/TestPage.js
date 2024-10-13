import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from "@mui/material";
import { useFlashcards } from "../providers/FlashcardProvider";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./TestPage.css"; // Import CSS for animations
import ResultsView from "../components/ResultsView";

const TestPage = () => {
  const theme = useTheme();

  const { chapterName } = useParams(); // Get chapter name from URL
  const { chapters } = useFlashcards(); // Access flashcards from context
  const flashcards = chapters[chapterName]; // Get flashcards for the selected chapter

  const [userResponse, setUserResponse] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current keyword index
  const [results, setResults] = useState(null); // Store results for correct/incorrect
  const [openDialog, setOpenDialog] = useState(false); // State for completion dialog
  const [openResultsDialog, setOpenResultsDialog] = useState(false); // State for results dialog

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const definition = flashcards[currentIndex]?.Definition; // Get the definition for the current keyword
    const keywords = definition.split(" ");
    const userWords = userResponse.split(" ").map((word) => word.toLowerCase());

    // Determine which keywords the user got correct
    const correctWords = keywords.filter((keyword) =>
      userWords.includes(keyword.toLowerCase())
    );

    // Set results only if there are correct words
    if (correctWords.length > 0) {
      setResults({ correctWords, totalWords: keywords });
      setOpenResultsDialog(true); // Open results dialog if there are results
    } else {
      setResults(null); // Reset results if no correct words
    }

    // Move to the next keyword or open completion dialog if it was the last keyword
    if (currentIndex === flashcards.length - 1) {
      setOpenDialog(true); // Open completion dialog if it was the last keyword
    }
  };

  // Move to the next keyword
  const handleNextKeyword = () => {
    setUserResponse("");
    setResults(null); // Reset results for the next keyword
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, flashcards.length - 1)
    ); // Move to the next keyword
    setOpenResultsDialog(false)
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentIndex(0); // Reset to the first keyword if desired
  };

  // Handle results dialog close
  const handleCloseResultsDialog = () => {
    setOpenResultsDialog(false);
    setResults(null); // Reset results when closing dialog
    handleNextKeyword()
  };

  return (
    <Container
      sx={{
        padding: "20px",
        minHeight: "100vh", // Ensures the container takes up the full viewport height
        display: "flex", // Use Flexbox for alignment
        flexDirection: "column", // Stack elements vertically
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Test Your Knowledge - {chapterName}
      </Typography>

      <Box sx={{ padding: "10px", width: "100%", maxWidth: "600px" }}>
        <Typography variant="h6" component="h2" gutterBottom>
          What is the meaning of the following keyword?
        </Typography>
      </Box>

      {/* Display the keyword for testing */}
      <TransitionGroup>
        <CSSTransition key={currentIndex} timeout={300} classNames="fade">
          <Box sx={{ padding: "20px", marginBottom: 2, textAlign: "center" }}>
            <Typography variant="h5" component="h3" color="primary">
              {flashcards[currentIndex]?.Keyword}
            </Typography>
          </Box>
        </CSSTransition>
      </TransitionGroup>

      {/* Input form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {/* TextField */}
        <TextField
          label="Your Answer"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={userResponse}
          onChange={(e) => setUserResponse(e.target.value)}
          required
          sx={{
            marginBottom: 3, // Space between the TextField and the buttons
            "& .MuiOutlinedInput-root": {
              backgroundColor: "background_darker",
              borderRadius: "12px",
              "& fieldset": {
                borderColor: "#4b4b4d",
              },
              "&:hover fieldset": {
                borderColor: "#4fd3c3",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4fd3c3",
              },
              "& input": {
                backgroundColor: "transparent",
                color: "#f5e0dc",
              },
            },
          }}
        />

        {/* Buttons Row */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ flex: "1", marginRight: 1 }}
            color="secondary"
          >
            Submit
          </Button>
          <Button
            variant="contained"
            onClick={handleNextKeyword}
            sx={{ flex: "1", marginX: 1 }}
          >
            Next
          </Button>
          {/* Link back to chapter */}
          <Button
            component={Link}
            to={`/chapter/${chapterName}`}
            variant="contained"
            sx={{ flex: "1", marginLeft: 1 }}
          >
            Back to Chapter
          </Button>
        </Box>
      </Box>

      {/* Dialog for completion */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have completed all the keywords in this chapter!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for results */}
      <Dialog open={openResultsDialog && results !== null} onClose={handleCloseResultsDialog}>
        <DialogTitle>Answer</DialogTitle>
        <DialogContent>
          {results && <ResultsView results={results} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResultsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TestPage;

