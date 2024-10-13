import { createTheme } from '@mui/material/styles';

const kanagawaTheme = createTheme({
    palette: {
        primary: {
            main: '#c5c9c5', // Dark blue-green (Kanagawa primary)
        },
        secondary: {
            main: '#d79921', // Warm yellow (Kanagawa secondary)
        },
        flashcard: {
            main: '#2a3b4d', // Background for flashcards
        },
        background: {
            default: '#1f2d3a', // Main background
            paper: '#2a3b4d', // Paper background
        },
        background_darker: {
            default: '#17212b', // Darker background
        },
        text: {
            primary: '#e2cca9', // Light text
            secondary: '#d3b58d', // Subtle text
        },
        success: {
            main: '#87a987'
        }
    },
    typography: {
        fontFamily: `'SF Mono', 'Roboto', sans-serif`,
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
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#334c5e', // Hover color for primary
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#334c5e', // Hover color for flashcards
                    },
                },
            },
        },
    },
});

export default kanagawaTheme;

