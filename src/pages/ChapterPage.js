import React, { useState } from 'react';
import { useParams } from 'react-router-dom';  // To get the chapter name from URL
import {
    Container,
    Box,
    Button,
    Card,
    CardContent,
    Typography,
} from '@mui/material';
import { useFlashcards } from '../providers/FlashcardProvider';
import { Link } from 'react-router-dom';
import Flashcard from './Flashcard';

const ChapterPage = () => {
    const { chapterName } = useParams();  // Get chapter name from URL
    const { chapters } = useFlashcards();  // Access all chapters from the context

    const flashcards = chapters[chapterName];  // Get flashcards for the selected chapter

    const [currentIndex, setCurrentIndex] = useState(0); // State to track the current flashcard index
    const [isFlipped, setIsFlipped] = useState(false); // State to track if the card is flipped

    // Handle flipping the card
    const handleFlip = () => {
        setIsFlipped(prev => !prev);
    };

    // Move to the next flashcard
    const handleNext = () => {
        setIsFlipped(false); // Reset flip state
        setCurrentIndex(prev => (prev + 1) % flashcards.length); // Move to the next card, wrap around
    };

    if (!flashcards) {
        return <Typography variant="h6">Chapter not found</Typography>;
    }

    return (
        <Container sx={{ padding: "20px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1">
                    {chapterName}
                </Typography>
                <Box display="flex" gap={2}>
                    {/* Test Me button */}
                    <Button component={Link} to={`/test/${chapterName}`} variant="contained" color="secondary">
                        Test me
                    </Button>
                    {/* Back to Chapters button */}
                    <Button component={Link} to="/" variant="contained">
                        Back to Chapters
                    </Button>
                </Box>
            </Box>

            <Flashcard 
                keyword={flashcards[currentIndex]?.Keyword}
                definition={flashcards[currentIndex]?.Definition}
                onClick={handleFlip}
                isFlipped={isFlipped}
            />

            {/* Next Button */}
            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    Next Flashcard
                </Button>
            </Box>
        </Container>
    );
};

export default ChapterPage;

