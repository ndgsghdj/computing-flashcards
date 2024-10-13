import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Flashcard from "../components/Flashcard";
import GridView from "../components/GridView";

import GridViewIcon from "@mui/icons-material/GridView";
import React, { useState, useEffect } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFlashcards } from "../providers/FlashcardProvider";
import { useParams } from "react-router-dom"; // To get the chapter name from URL
import { Style } from "@mui/icons-material";

const ChapterPage = () => {
  const { chapterName } = useParams(); // Get chapter name from URL
  const { chapters } = useFlashcards(); // Access all chapters from the context

  const flashcards = chapters[chapterName]; // Get flashcards for the selected chapter

  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current flashcard index
  const [isFlipped, setIsFlipped] = useState(false); // State to track if the card is flipped
  const [flashCardView, setFlashCardView] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleChangeView = () => {
    setFlashCardView((flashCardView) => !flashCardView);
  };

  const handleOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Handle flipping the card
  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  // Move to the next flashcard
  const handleNext = () => {
    setIsFlipped(false); // Reset flip state
    setCurrentIndex((prev) => (prev + 1) % flashcards.length); // Move to the next card, wrap around
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    ); // Wrap around if negative
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "h" || event.key === "ArrowLeft") {
        setIsFlipped(false); // Reset flip state
        setCurrentIndex((prev) => (prev + 1) % flashcards.length); // Move to next card, wrap around
      } else if (event.key === "l" || event.key === "ArrowRight") {
        setIsFlipped(false);
        setCurrentIndex(
          (prev) => (prev - 1 + flashcards.length) % flashcards.length
        ); // Move to previous card, wrap around
      } else if (event.key === "Enter") {
        setIsFlipped((isFlipped) => !isFlipped);
      }
    };

    window.addEventListener("keydown", handleKeyDown); // Register keydown listener

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Clean up listener on component unmount
    };
  }, [flashcards.length, handleNext, handlePrevious]);

  if (!flashcards) {
    return <Typography variant="h6">Chapter not found</Typography>;
  }

  return (
    <Container sx={{ padding: "20px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1">
          {chapterName}
        </Typography>
        <Box display="flex" gap={2}>
          <Button color="secondary" onClick={handleChangeView}>
            {flashCardView ? <Style /> : <GridViewIcon />}
          </Button>
          {/* Test Me button */}
          <Button
            component={Link}
            to={`/test/${chapterName}`}
            variant="contained"
            color="secondary"
          >
            Test me
          </Button>
          {/* Back to Chapters button */}
          <Button component={Link} to="/" variant="contained">
            Back to Chapters
          </Button>
        </Box>
      </Box>

      <Box>
        {flashCardView ? (
          <Box>
            <Flashcard
              keyword={flashcards[currentIndex]?.Keyword}
              definition={flashcards[currentIndex]?.Definition}
              onClick={handleFlip}
              isFlipped={isFlipped}
            />
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrevious}
                sx={{ mr: 2 }}
              >
                <ChevronLeftIcon />
              </Button>
              <Typography variant="body1" sx={{ mx: 2 }}>
                {currentIndex + 1} / {flashcards.length}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ ml: 2 }}
              >
                <ChevronRightIcon />
              </Button>
            </Box>
          </Box>
        ) : (
          <GridView
            flashcards={flashcards}
            handleClickOpen={handleOpen}
            open={open}
            handleClose={handleClose}
            selectedCard={selectedCard}
          />
        )}
      </Box>
    </Container>
  );
};

export default ChapterPage;
