import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';

const CardBox = ({ title, data }) => {
    const total = data.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PieChart width={150} height={140}>
                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={50}
                            outerRadius={70}
                            fill="#8884d8"
                            paddingAngle={5}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="16">
                            {total}
                        </text>
                        <text
                            x="50%"
                            y="60%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#000"
                            fontSize="12"
                        >
                            Total
                        </text>
                    </PieChart>
                    <Box sx={{ ml: 2 }}>
                        <Box>
                            {data.map((entry, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Box
                                        sx={{
                                            width: 12,
                                            height: 12,
                                            backgroundColor: entry.color,
                                            borderRadius: '50%',
                                            mr: 1,
                                        }}
                                    />
                                    <Typography variant="body2">
                                        {entry.name} ({entry.value})
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardBox;
