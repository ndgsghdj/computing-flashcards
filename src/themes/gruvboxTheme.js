import { createTheme } from '@mui/material/styles';

const gruvboxTheme = createTheme({
    palette: {
        primary: {
            main: '#fb4934',
            hover: '#ff6f61', // Hover color for primary
        },
        secondary: {
            main: '#83c992',
            hover: '#8be6b8', // Hover color for secondary
        },
        background: {
            default: '#282828',
            paper: '#3c3836',
        },
        background_darker: {
            default: '#1d2021',
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

export default gruvboxTheme;

