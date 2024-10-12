import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { FlashcardProvider } from './providers/FlashcardProvider';
import ChapterPage from './pages/ChapterPage';
import TestPage from './pages/TestPage';
import TransitionWrapper from './components/TransitionWrapper';

const catppuccinTheme = createTheme({
  palette: {
    primary: {
      main: '#cba6f7',
      hover: '#d4b5f8', // Add a hover color for primary
    },
    secondary: {
      main: '#f38ba8',
      hover: '#f59cb0', // Add a hover color for secondary
    },
    flashcard: {
        main: '#f5e0dc'
    },
    background: {
      default: '#1e1e2e',
      paper: '#302d41',
    },
    background_darker: {
        default: '#302d41'
    },
    text: {
      primary: '#cdd6f4',
      secondary: '#f5e0dc',
    },
  },
  typography: {
    fontFamily: `'JetBrains Mono', 'Roboto', sans-serif`,
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 4px 6px rgba(0, 0, 0, 0.1)',
  ],
});

const gruvboxTheme = createTheme({
  palette: {
    primary: {
      main: '#fb4934',
      hover: '#ff6f61', // Add a hover color for primary
    },
    secondary: {
      main: '#83c992',
      hover: '#8be6b8', // Add a hover color for secondary
    },
    background: {
      default: '#282828',
      paper: '#3c3836',
    },
    background_darker: {
        default: '#1d2021'
    },
    text: {
      primary: '#ebdbb2',
      secondary: '#d5c4a1',
    },
  },
  typography: {
    fontFamily: `'JetBrains Mono', 'Roboto', sans-serif`,
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 4px 6px rgba(0, 0, 0, 0.1)',
  ],
});


function App() {
  const [isCatppuccin, setIsCatppuccin] = useState(true);
  
  const toggleTheme = () => {
    setIsCatppuccin(prev => !prev);
  };

  const theme = isCatppuccin ? catppuccinTheme : gruvboxTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FlashcardProvider>
        <Router>
          <TransitionWrapper>
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard toggleTheme={toggleTheme} isCatppuccin={isCatppuccin} />} 
              />
              <Route path="/chapter/:chapterName" element={<ChapterPage />} />
              <Route path="/test/:chapterName" element={<TestPage />} />
            </Routes>
          </TransitionWrapper>
        </Router>
      </FlashcardProvider>
    </ThemeProvider>
  );
}

export default App;

