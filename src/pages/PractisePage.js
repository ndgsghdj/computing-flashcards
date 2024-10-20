import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFlashcards } from "../providers/FlashcardProvider";
import { Box, Typography, TextField, Grid, Paper, Button } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './PractisePage.css'; // Import the CSS for transitions

const PractisePage = () => {
    const { chapterName } = useParams();
    const { chapters } = useFlashcards();
    const navigate = useNavigate();

    const flashcards = chapters[chapterName];
    const [userResponse, setUserResponse] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleInputChange = (e) => {
        setUserResponse(e.target.value);
    };

    const getHighlightedText = (definition, userInput) => {
        let correctPart = "";
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === definition[i]) {
                correctPart += definition[i];
            } else {
                break;
            }
        }
        return (
            <Typography variant="body1">
                <span style={{ color: "green" }}>{correctPart}</span>
                <span>{definition.slice(correctPart.length)}</span>
            </Typography>
        );
    };

    const handleBackToChapter = () => {
        navigate(`/chapter/${chapterName}`);
    };

    const handleNextFlashcard = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, flashcards.length - 1));
        setUserResponse("");
    };

    return (
        <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            minHeight: "100vh", 
            padding: 4 
        }}>
            <Grid container spacing={4} sx={{ maxWidth: "80%", justifyContent: "center" }}>
                {/* Definition Section */}
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ 
                        padding: 3, 
                        height: "60vh", 
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center" 
                    }}>
                        <Typography variant="h5" gutterBottom>
                            Definition
                        </Typography>
                        <Box sx={{ overflowY: "auto", paddingRight: 2 }}>
                            <TransitionGroup>
                                <CSSTransition
                                    key={currentIndex}
                                    timeout={500}
                                    classNames="fade"
                                >
                                    <Box>{getHighlightedText(flashcards[currentIndex].Definition, userResponse)}</Box>
                                </CSSTransition>
                            </TransitionGroup>
                        </Box>
                    </Paper>
                </Grid>

                {/* User Input Section */}
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ 
                        padding: 3, 
                        height: "60vh", 
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center" 
                    }}>
                        <Typography variant="h5" gutterBottom>
                            Type the definition
                        </Typography>
                        <TextField
                            label="Start typing..."
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={8}
                            value={userResponse}
                            onChange={handleInputChange}
                            onKeyPress={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleNextFlashcard();
                                }
                            }}
                        />
                        {/* Back Button */}
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ marginTop: 2 }} 
                            onClick={handleBackToChapter}
                        >
                            Back to {chapterName}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PractisePage;

