import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useFlashcards } from '../providers/FlashcardProvider';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './TestPage.css'; // Import CSS for animations

const TestPage = () => {
    const { chapterName } = useParams(); // Get chapter name from URL
    const { chapters } = useFlashcards(); // Access flashcards from context
    const flashcards = chapters[chapterName]; // Get flashcards for the selected chapter

    const [userResponse, setUserResponse] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0); // Track the current keyword index
    const [results, setResults] = useState(null); // Store results for correct/incorrect
    const [openDialog, setOpenDialog] = useState(false); // State for dialog

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        const definition = flashcards[currentIndex]?.Definition; // Get the definition for the current keyword
        const keywords = definition.split(' ');
        const userWords = userResponse.split(' ').map(word => word.toLowerCase());

        // Determine which keywords the user got correct
        const correctWords = keywords.filter(keyword => userWords.includes(keyword.toLowerCase()));

        setResults({ correctWords, totalWords: keywords });

        // Move to the next keyword or open dialog if it was the last keyword
        if (currentIndex === flashcards.length - 1) {
            setOpenDialog(true); // Open dialog if it was the last keyword
        } 
    };

    // Move to the next keyword
    const handleNextKeyword = () => {
        setUserResponse('');
        setResults(null); // Reset results for the next keyword
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, flashcards.length - 1)); // Move to the next keyword
    };

    // Handle dialog close
    const handleCloseDialog = () => {
        setOpenDialog(false);
        // Optionally reset the test or navigate to another page
        setCurrentIndex(0); // Reset to the first keyword if desired
    };

    return (
        <Container sx={{ padding: "20px" }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Test Your Knowledge - {chapterName}
            </Typography>
            <Box sx={{ padding: "10px" }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    What is the meaning of the following keyword?
                </Typography>
            </Box>

            {/* Display the keyword for testing */}
            <TransitionGroup>
                <CSSTransition key={currentIndex} timeout={300} classNames="fade">
                    <Box sx={{ padding: "20px", marginBottom: 2 }}>
                        <Typography variant="h5" component="h3" color="primary">
                            {flashcards[currentIndex]?.Keyword}
                        </Typography>
                    </Box>
                </CSSTransition>
            </TransitionGroup>

            {/* Input form */}
            <form onSubmit={handleSubmit}>
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
                        marginBottom: 5,
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background_darker', // Set background color
                            borderRadius: '12px', // Ensure rounded borders
                            '& fieldset': {
                                borderColor: '#4b4b4d', // Optional: border color
                            },
                            '&:hover fieldset': {
                                borderColor: '#4fd3c3', // Optional: border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#4fd3c3', // Optional: border color when focused
                            },
                            '& input': {
                                backgroundColor: 'transparent', // Keep input background transparent
                                color: '#f5e0dc' // Text color in the input field
                            },
                        },
                    }}
                />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
                <Button variant="contained" onClick={handleNextKeyword} sx={{ marginLeft: 2 }}>
                    Next Keyword
                </Button>
            </form>

            {/* Display results if available */}
            {results && (
                <Box mt={4}>
                    <Typography variant="h6">Your Results:</Typography>
                    <Typography variant="body1">
                        {results.totalWords.map((word, index) => {
                            const isCorrect = results.correctWords.includes(word);
                            return (
                                <span
                                    key={index}
                                    style={{
                                        color: isCorrect ? 'green' : '#aaa', // Highlight correct answers
                                        textDecoration: isCorrect ? 'none' : 'line-through', // Dull incorrect answers
                                        marginRight: '5px'
                                    }}
                                >
                                    {word}
                                </span>
                            );
                        })}
                    </Typography>
                </Box>
            )}

            {/* Dialog for completion */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Congratulations!</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">You have completed all the keywords in this chapter!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Link back to chapter */}
            <Button component={Link} to={`/chapter/${chapterName}`} variant="contained" sx={{ mt: 3 }}>
                Back to Chapter
            </Button>
        </Container>
    );
};

export default TestPage;

