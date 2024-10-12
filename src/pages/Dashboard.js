import React from 'react';
import { Link } from 'react-router-dom';  // For navigation to chapter page
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useFlashcards } from '../providers/FlashcardProvider';

const Dashboard = () => {
    const { chapters } = useFlashcards();

    return (
        <Container sx={{ padding: "20px" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
        Chapters
        </Typography>

        <Grid container spacing={3}>
        {Object.keys(chapters).map((chapter, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
            component={Link} 
            to={`/chapter/${chapter}`} 
            sx={{ 
                textDecoration: 'none', 
                    ':hover': { boxShadow: 3, backgroundColor: '#302d41' }, // Soft hover effect
                    padding: '10px', 
                    backgroundColor: '#1e1e2e',  // Card background (darker shade)
                    color: '#cdd6f4'  // Light text color
            }}>
            <CardContent>
            <Typography variant="h5" component="h2" color="primary">
            {chapter}
            </Typography>
            </CardContent>
            </Card>

            </Grid>
        ))}
        </Grid>
        </Container>
    );
};

export default Dashboard;

