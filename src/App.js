import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, CircularProgress } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FlashcardProvider } from './providers/FlashcardProvider';
import Dashboard from './pages/Dashboard'; // Adjust the path if needed
import ChapterPage from './pages/ChapterPage'; // Adjust the path if needed
import TestPage from './pages/TestPage'; // Adjust the path if needed
import TransitionWrapper from './components/TransitionWrapper'; // Adjust the path if needed
import { useFlashcards } from './providers/FlashcardProvider';

// Import your theme files
import catppuccinTheme from './themes/catppuccinTheme'; // Adjust the path if needed
import gruvboxTheme from './themes/gruvboxTheme'; // Adjust the path if needed
// Import other themes here as needed

const App = () => {
    const themes = {
        catppuccin: catppuccinTheme,
        gruvbox: gruvboxTheme,
        // Add other themes here
    };

    const { loading } = useFlashcards();

    const defaultTheme = 'catppuccin'; // Default theme

    const [currentTheme, setCurrentTheme] = useState(() => {
        // Check if 'theme' exists in localStorage
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            try {
                // Parse and return the stored theme if it's valid
                return JSON.parse(storedTheme);
            } catch (error) {
                console.error('Error parsing stored theme:', error);
            }
        }
        // Return the default theme if no valid stored theme exists
        return defaultTheme;
    });

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(currentTheme)); // Save theme to localStorage whenever it changes
    }, [currentTheme]);

    const toggleTheme = (theme) => {
        setCurrentTheme(theme);
    };

    if (loading) {
        return (
            <ThemeProvider theme={themes[currentTheme]}>
            <Container sx={{ padding: "20px", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress/>
            </Container>

            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={themes[currentTheme]}>
            <CssBaseline />
                <Router>
                    <TransitionWrapper>
                        <Routes>
                            <Route 
                                path="/" 
                                element={<Dashboard toggleTheme={toggleTheme} currentTheme={currentTheme} themes={themes}/>} 
                            />
                            <Route path="/chapter/:chapterName" element={<ChapterPage />} />
                            <Route path="/test/:chapterName" element={<TestPage />} />
                        </Routes>
                    </TransitionWrapper>
                </Router>
        </ThemeProvider>
    );
};

export default App;

