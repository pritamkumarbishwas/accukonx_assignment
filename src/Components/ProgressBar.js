import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ProgressBar = ({ title, data }) => {
    const isEmpty = data.length === 0;

    return (
        <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {isEmpty ? (
                        <Typography variant="body2" color="textSecondary">
                            No Data Available
                        </Typography>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 20,
                                    borderRadius: 5,
                                    backgroundColor: '#e0e0e0',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {data.reduce((acc, segment, index) => {
                                    const segmentWidth = segment.value; // percentage value
                                    const segmentColor = segment.color;

                                    const segmentStart = acc; // Starting position of the segment
                                    const segmentEnd = segmentStart + segmentWidth; // Ending position of the segment

                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                position: 'absolute',
                                                left: `${segmentStart}%`, // Set the left position based on accumulated value
                                                width: `${segmentWidth}%`, // Set the width of the segment
                                                height: '100%',
                                                backgroundColor: segmentColor,
                                                borderRadius: index === 0 ? '5px 0 0 5px' : (index === data.length - 1 ? '0 5px 5px 0' : '0'),
                                            }}
                                        />
                                    );
                                }, 0)}
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    mt: 1
                                }}
                            >
                                {data.map((segment, index) => (
                                    <Box key={index} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 1,
                                        mr: 2
                                    }}>
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                backgroundColor: segment.color,
                                                borderRadius: '50%',
                                                mr: 1,
                                            }}
                                        />
                                        <Typography variant="body2">
                                            {segment.name} ({segment.value}%)
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProgressBar;
