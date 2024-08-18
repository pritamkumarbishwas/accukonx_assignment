import React, { useState } from 'react';
import { TextField, Button, Box, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 2,
                backgroundColor: '#fff',
                borderBottom: '1px solid #ddd'
            }}
        >
            {/* Left Side: Home > Dashboard */}
            <Typography variant="h6">
                Home &gt; Dashboard
            </Typography>

            {/* Right Side: Search Box */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '4px',
                    padding: '4px',
                    maxWidth: '400px',
                    flexGrow: 1,
                    margin: '0 auto',
                }}
            >
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleSearch}
                    sx={{ ml: 1 }}
                >
                    Search
                </Button>
            </Box>
        </Box>
    );
};

export default SearchBox;
