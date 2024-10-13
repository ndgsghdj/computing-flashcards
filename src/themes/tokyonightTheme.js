import { createTheme } from '@mui/material/styles';

const tokyoNightTheme = createTheme({
    palette: {
        primary: {
            main: '#7aa2f7', // Light blue (TokyoNight primary)
        },
        secondary: {
            main: '#bb9af7', // Purple (TokyoNight secondary)
        },
        flashcard: {
            main: '#1a1b26', // Dark background for flashcards
        },
        background: {
            default: '#1a1b26', // Main background
            paper: '#24283b', // Paper background
        },
        background_darker: {
            default: '#15161e', // Even darker background
        },
        text: {
            primary: '#c0caf5', // Light text
            secondary: '#a9b1d6', // Subtle text
        },
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
                        backgroundColor: '#3b4261', // Hover color for primary
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#292e42', // Hover color for flashcards
                    },
                },
            },
        },
    },
});

export default tokyoNightTheme;

