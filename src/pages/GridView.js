import { Grid, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useTheme } from "@mui/material";

const GridView = ({ flashcards, handleClickOpen, open, handleClose, selectedCard }) => {
    const theme = useTheme()
    
    return (
       <Grid container rowSpacing={5} columnSpacing={4}>
                    {flashcards.map((card, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    width: 300, // Fixed width
                                    height: 180, // Fixed height
                                    padding: '10px',
                                    backgroundColor: theme.palette.background.paper,
                                    boxShadow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    transition: 'transform 0.3s', // Add transition for scaling effect
                                    '&:hover': {
                                        transform: 'scale(1.05)', // Scale on hover
                                    },
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
                                            whiteSpace: 'nowrap',  // Keeps text on one line with ellipsis
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
                                            whiteSpace: 'normal',  // Allows text to wrap within the line clamp
                                        }}
                                    >
                                        {card.Definition}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
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
    )
}

export default GridView
