// SettingsDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SettingsDialog = ({ open, handleCloseSettings, currentTheme, toggleTheme, themes }) => {
    const handleChange = (event) => {
        const selectedTheme = event.target.value;
        toggleTheme(selectedTheme); // Call toggleTheme with the selected theme
    };

    return (
        <Dialog open={open} onClose={handleCloseSettings}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Choose your preferred theme for the app.
                </DialogContentText>
                <Box sx={{ mt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="theme-select-label">Theme</InputLabel>
                        <Select
                            labelId="theme-select-label"
                            value={currentTheme}
                            onChange={handleChange}
                        >
                            {Object.keys(themes).map((themeKey) => (
                                <MenuItem key={themeKey} value={themeKey}>
                                    {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)} {/* Capitalize theme names */}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseSettings} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SettingsDialog;

