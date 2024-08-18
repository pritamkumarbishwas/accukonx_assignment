import React, { useState } from 'react';
import { Grid, Typography, Box, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardBox from './Components/CardBox';
import GraphBox from './Components/GraphBox';
import ProgressBar from './Components/ProgressBar';
import Header from "./Components/Header";

const Dashboard = ({ initialDashboardConfig }) => {
  const [dashboardConfig, setDashboardConfig] = useState(initialDashboardConfig);
  const [open, setOpen] = useState(false);
  const [newWidget, setNewWidget] = useState({ title: '', type: '', data: [] });
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);

  const handleOpenDialog = (categoryIndex) => {
    setCurrentCategoryIndex(categoryIndex);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewWidget({ title: '', type: '', data: [] });
  };

  const handleAddWidget = () => {
    if (!newWidget.title || !newWidget.type) return;

    const updatedCategories = [...dashboardConfig.categories];
    const category = updatedCategories[currentCategoryIndex];

    const newWidgetData = {
      id: `widget-${Date.now()}`, // Unique ID for the new widget
      type: newWidget.type,
      title: newWidget.title,
      data: newWidget.data,
    };

    category.widgets.push(newWidgetData);
    updatedCategories[currentCategoryIndex] = category;

    setDashboardConfig({ categories: updatedCategories });
    handleCloseDialog();
  };

  const handleRemoveWidget = (categoryIndex, widgetId) => {
    const updatedCategories = [...dashboardConfig.categories];
    const category = updatedCategories[categoryIndex];
    
    category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
    updatedCategories[categoryIndex] = category;

    setDashboardConfig({ categories: updatedCategories });
  };

  return (
    <>
      <Box sx={{ paddingTop: 1, paddingLeft: 5, paddingRight: 5 }}>
        <Header />
        {dashboardConfig.categories.map((category, categoryIndex) => (
          <Box key={categoryIndex} sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {category.title}
            </Typography>
            <Grid container spacing={2}>
              {category.widgets.map((widget) => {
                let WidgetComponent;

                switch (widget.type) {
                  case 'CardBox':
                    WidgetComponent = (
                      <Grid item xs={12} md={12} key={widget.id}>
                        <CardBox title={widget.title} data={widget.data} />
                      </Grid>
                    );
                    break;
                  case 'GraphBox':
                    WidgetComponent = (
                      <Grid item xs={12} md={12} key={widget.id}>
                        <GraphBox title={widget.title} data={widget.data} />
                      </Grid>
                    );
                    break;
                  case 'ProgressBar':
                    WidgetComponent = (
                      <Grid item xs={12} md={12} key={widget.id}>
                        <ProgressBar title={widget.title} data={widget.data} />
                      </Grid>
                    );
                    break;
                  default:
                    return null;
                }

                return (
                  <Grid item xs={12} md={4} key={widget.id}>
                    {WidgetComponent}
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => handleRemoveWidget(categoryIndex, widget.id)}
                    >
                      Remove Widget
                    </Button>
                  </Grid>
                );
              })}
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 220, background: '#f5f5f5', textAlign: 'center' }}>
                  <CardContent>
                    <Button
                      color="inherit"
                      variant="outlined"
                      size="small"
                      style={{ marginRight: '10px', background: '#f5f5f5', textTransform: 'none' }}
                      onClick={() => handleOpenDialog(categoryIndex)}
                    >
                      <AddIcon style={{ marginRight: '8px' }} />
                      Add Widget
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New Widget</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Widget Title"
            type="text"
            fullWidth
            variant="standard"
            value={newWidget.title}
            onChange={(e) => setNewWidget({ ...newWidget, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Widget Type (CardBox, GraphBox, ProgressBar)"
            type="text"
            fullWidth
            variant="standard"
            value={newWidget.type}
            onChange={(e) => setNewWidget({ ...newWidget, type: e.target.value })}
          />
          {/* Optional: Add data input if needed for specific widget types */}
          {newWidget.type === 'ProgressBar' && (
            <TextField
              margin="dense"
              label="Widget Data (JSON format)"
              type="text"
              fullWidth
              variant="standard"
              value={JSON.stringify(newWidget.data)}
              onChange={(e) => setNewWidget({ ...newWidget, data: JSON.parse(e.target.value) })}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddWidget}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
