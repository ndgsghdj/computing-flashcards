import {
    Box,
    Typography,
} from '@mui/material'

const ResultsView = ({ results }) => {
    return (
        <Box mt={4} sx={{ width: "100%", maxWidth: "600px", overflow: "auto", wordWrap: "break-word", whiteSpace: "normal" }}>
        <Typography variant="body1">
        {results.totalWords.map((word, index) => {
            const isCorrect = results.correctWords.includes(word);
            return (
                <Typography
                key={index}
                variant="body1"
                component="span"
                sx={{
                    display: 'inline',
                        color: isCorrect ? 'green' : '#aaa',
                        textDecoration: 'none',
                        marginRight: '5px'
                }}
                >
                {word}
                </Typography>
            );
        })}
        </Typography>
        </Box>
    )
}

export default ResultsView
