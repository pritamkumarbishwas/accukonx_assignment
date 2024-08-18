import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const GraphBox = ({ title, data }) => {
    const isEmpty = data.length === 0;

    return (
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 140 }}>
                    {isEmpty ? (
                        <Typography variant="body2" color="textSecondary">
                            No Graph Data Available
                        </Typography>
                    ) : (
                        <BarChart
                            width={500}
                            height={120}
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default GraphBox;
