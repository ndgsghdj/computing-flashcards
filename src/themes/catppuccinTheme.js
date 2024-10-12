import { createTheme } from '@mui/material/styles';

const catppuccinTheme = createTheme({
    palette: {
        primary: {
            main: '#cba6f7',
            hover: '#d4b5f8', // Hover color for primary
        },
        secondary: {
            main: '#f38ba8',
            hover: '#f59cb0', // Hover color for secondary
        },
        flashcard: {
            main: '#f5e0dc', // Color for flashcards
        },
        background: {
            default: '#1e1e2e',
            paper: '#302d41',
        },
        background_darker: {
            default: '#302d41',
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

export default catppuccinTheme;

