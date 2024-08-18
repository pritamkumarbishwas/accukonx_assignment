import React from 'react';
import { Typography, Button, IconButton, Menu, MenuItem, FormControl, Select, InputLabel, InputAdornment } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dateRange, setDateRange] = React.useState(2); // Default value set to 2

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDateChange = (event) => {
        setDateRange(event.target.value);
    };

    return (
        <div style={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center',  }}>
            <Typography variant="h6">
                CNAPP Dashboard
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    color="inherit"
                    variant="outlined"
                    size="small"
                    style={{ marginRight: '10px', background: '#fff', textTransform: 'none' }}
                >
                    Add Widget
                    <AddIcon style={{ marginLeft: '8px' }} />
                </Button>
                <Button
                    color="inherit"
                    size="small"
                    style={{ padding: '5px', minWidth: 'auto', marginRight: '10px' }}
                >
                    <RestartAltIcon style={{ padding: '5px', borderRadius: '5px', background: '#fff' }} />
                </Button>
                <IconButton
                    color="inherit"
                    onClick={handleMenuClick}
                    style={{ marginRight: '10px', background: '#fff', padding: '5px', borderRadius: '5px' }}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Menu>
                <FormControl
                    style={{ marginRight: '16px', background: '#fff', fontSize: '14px' }}
                    size="small"
                >
                    <Select
                        value={dateRange}
                        onChange={handleDateChange}
                        label="Date Range"
                        style={{ minWidth: '150px', fontSize: '14px' }} 
                        startAdornment={
                            <InputAdornment position="start">
                                <AccessTimeIcon />
                            </InputAdornment>
                        }
                    >
                        <MenuItem value={2} style={{ fontSize: '18px' }}>2 Days Ago</MenuItem>
                        <MenuItem value={3} style={{ fontSize: '18px' }}>3 Days Ago</MenuItem>
                        <MenuItem value={7} style={{ fontSize: '18px' }}>7 Days Ago</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default Header;
