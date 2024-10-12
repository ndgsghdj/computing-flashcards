import React, { useState } from 'react';
import { useParams } from 'react-router-dom';  // To get the chapter name from URL
import { Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { useFlashcards } from '../providers/FlashcardProvider';
import { Link } from 'react-router-dom';

const ChapterPage = () => {
    const { chapterName } = useParams();  // Get chapter name from URL
    const { chapters } = useFlashcards();  // Access all chapters from the context

    const flashcards = chapters[chapterName];  // Get flashcards for the selected chapter

    const [open, setOpen] = useState(false); // State to control dialog
    const [selectedCard, setSelectedCard] = useState(null); // State to store the selected card

    // Handle card click to open dialog
    const handleClickOpen = (card) => {
        setSelectedCard(card);
        setOpen(true);
    };

    // Close the dialog
    const handleClose = () => {
        setOpen(false);
        setSelectedCard(null);
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

        <Grid container rowSpacing={5} columnSpacing={4}>
        {flashcards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ 
                width: 300,              // Fixed width
                    height: 180,             // Fixed height
                    padding: '10px', 
                    backgroundColor: '#302d41', 
                    boxShadow: 1, 
                    color: '#f5e0dc', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between'
            }}
            onClick={() => handleClickOpen(card)}
            >
            <CardContent>
            <Typography 
            variant="h6" 
            component="h3" 
            color="primary"
            sx={{
                overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap'  // Keeps text on one line with ellipsis
            }}
            >
            {card.Keyword}
            </Typography>
            <Typography 
            variant="body2" 
            color="secondary"
            sx={{
                overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 3,   // Limits text to 3 lines
                    WebkitBoxOrient: 'vertical', 
                    whiteSpace: 'normal'  // Allows text to wrap within the line clamp
            }}
            >
            {card.Definition}
            </Typography>
            </CardContent>
            </Card>

            </Grid>
        ))}

        {/* Dialog for full flashcard view */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{selectedCard?.Keyword}</DialogTitle>
        <DialogContent>
        <Typography variant="body1" color="text.primary">
        {selectedCard?.Definition}
        </Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
        Close
        </Button>
        </DialogActions>
        </Dialog>
        </Grid>
        </Container>
    );
};

export default ChapterPage;

