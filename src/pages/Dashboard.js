import React from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation to chapter page
import { Container, Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { useFlashcards } from '../providers/FlashcardProvider';

import MemoryIcon from '@mui/icons-material/Memory';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import CodeIcon from '@mui/icons-material/Code';
import SchemaIcon from '@mui/icons-material/Schema';
import BugReportIcon from '@mui/icons-material/BugReport';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import NumbersIcon from '@mui/icons-material/Numbers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; 
import DatasetIcon from '@mui/icons-material/Dataset';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked'; 
import HubIcon from '@mui/icons-material/Hub';

const chapterIcons = {
    "Computer Architecture": <MemoryIcon color="primary"/>,
    "Algorithms": <AccountTreeIcon color="primary"/>,
    "Designing Algorithms": <ViewQuiltIcon color="primary"/>,
    "Programming": <CodeIcon color="primary"/>,
    "Program Development": <SchemaIcon color="primary"/>,
    "Program Testing": <BugReportIcon color="primary"/>,
    "Ethics": <FaceRetouchingNaturalIcon color="primary"/>,
    "Number Systems & Applications": <NumbersIcon color="primary"/>,
    "Logic Gates": <ArrowForwardIcon color="primary"/>,
    "Excel Theory": <DatasetIcon color="primary"/>,
    "Excel Functions": <DatasetLinkedIcon color="primary"/>,
    "Computer Networks": <HubIcon color="primary"/>
}

const Dashboard = () => {
    const { chapters, loading } = useFlashcards();
    const navigate = useNavigate();
    
    if (loading) {
        return (
            <Container sx={{ padding: "20px", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress/>
            </Container>
        );
    }
    return (
        <Container sx={{ padding: "20px" }}>
        <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
        Chapters
        </Typography>
        </Box>

        <Grid container spacing={3}>
        {Object.keys(chapters).map((chapter, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
            onClick={() => {
                navigate(`/chapter/${chapter}`)
            }}
            sx={{ 
                textDecoration: 'none', 
                    width: 300,
                    height: 180,
                    ':hover': { boxShadow: 3, backgroundColor: '#302d41' }, // Soft hover effect
                    padding: '10px', 
                    backgroundColor: '#302d41',  // Card background (darker shade)
                    color: '#cdd6f4'  // Light text color
            }}>
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
        </Container>
    );
};

export default Dashboard;

