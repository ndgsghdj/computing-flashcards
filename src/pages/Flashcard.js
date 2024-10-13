import { Box, CardContent, Typography, useTheme } from "@mui/material";
import './FlashCardStyles.css'; // Import CSS for the flip animation

const Flashcard = ({ keyword, definition, onClick, isFlipped }) => {
    const theme = useTheme()

    return (
        <Box display="flex" justifyContent="center">
                <Box
                    className={`card ${isFlipped ? 'side' : ''}`} // Add flip class based on state
                    onClick={onClick}
                    sx={{
                        backgroundColor: theme.palette.background.paper
                    }}
                >
                    {/* Front face */}
                    <Box className="front">
                        <CardContent>
                            <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
                                {keyword}
                            </Typography>
                        </CardContent>
                    </Box>

                    {/* Back face */}
                    <Box className="back">
                        <CardContent>
                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                {definition}
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
            </Box>
    );
};

export default Flashcard
