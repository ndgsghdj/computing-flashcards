import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { FlashcardProvider } from './providers/FlashcardProvider';
import ChapterPage from './pages/ChapterPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#cba6f7',   // Mauve (for primary elements like buttons and links)
    },
    secondary: {
      main: '#f38ba8',   // Red (for secondary elements)
    },
    background: {
      default: '#1e1e2e',  // Dark background (Mocha's dark)
      paper: '#302d41',    // Darker cards/paper color
    },
    text: {
      primary: '#cdd6f4',  // Light text for contrast
      secondary: '#f5e0dc', // Lighter, softer text color
    },
  },
  typography: {
    fontFamily: `'JetBrains Mono', 'Roboto', sans-serif`, // Catppuccin vibe with mono font
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
    borderRadius: 12,  // Smooth, rounded look
  },
  shadows: [
    'none', // No shadow
    '0px 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for elements
  ],
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures modern base styling */}
      <FlashcardProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chapter/:chapterName" element={<ChapterPage />} />  {/* Dynamic routing for each chapter */}
          </Routes>
        </Router>
      </FlashcardProvider>
    </ThemeProvider>
  );
}

export default App;

