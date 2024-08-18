import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Card, CardContent, Button, Drawer, TextField, IconButton, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CardBox from './Components/CardBox';
import GraphBox from './Components/GraphBox';
import ProgressBar from './Components/ProgressBar';
import Header from "./Components/Header";
import SearchBox from "./Components/SearchBox";

const Dashboard = ({ initialDashboardConfig }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [widgetName, setWidgetName] = useState('');
  const [dashboardConfig, setDashboardConfig] = useState(initialDashboardConfig);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadConfig = () => {
      const storedConfig = localStorage.getItem('dashboardConfig');
      if (storedConfig) {
        const parsedStoredConfig = JSON.parse(storedConfig);
        setDashboardConfig(prevConfig => mergeConfigs(prevConfig, parsedStoredConfig));
      } else {
        localStorage.setItem('dashboardConfig', JSON.stringify(initialDashboardConfig));
      }
    };
    loadConfig();
  }, [initialDashboardConfig]);

  const mergeConfigs = (currentConfig, newConfig) => {
    const existingWidgetsMap = new Map();
    currentConfig.categories.forEach(category => {
      category.widgets.forEach(widget => existingWidgetsMap.set(widget.id, widget));
    });

    const mergedCategories = newConfig.categories.map(category => {
      const existingCategory = currentConfig.categories.find(c => c.title === category.title) || { widgets: [] };
      const mergedWidgets = [
        ...existingCategory.widgets,
        ...category.widgets.filter(widget => !existingWidgetsMap.has(widget.id))
      ];
      return { ...category, widgets: mergedWidgets };
    });

    return { ...currentConfig, categories: mergedCategories };
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(prev => !prev);
  };

  const handleAddWidget = () => {
    if (!widgetName || !selectedCategory) return;

    const newWidget = {
      id: `widget-${Date.now()}`,
      type: selectedCategory === 'Registry Scan' ? 'RegistryScan' : selectedCategory === 'CWPP Dashboard' ? 'CWPP' : 'CSPM',
      title: widgetName,
      data: []
    };

    setDashboardConfig(prevConfig => {
      const updatedCategories = prevConfig.categories.map(cat => {
        if (cat.title === selectedCategory) {
          return {
            ...cat,
            widgets: [...cat.widgets, newWidget]
          };
        }
        return cat;
      });
      const newConfig = { ...prevConfig, categories: updatedCategories };
      localStorage.setItem('dashboardConfig', JSON.stringify(newConfig));
      return newConfig;
    });

    setWidgetName('');
    handleDrawerToggle();
  };

  const handleCancel = () => {
    setWidgetName('');
    handleDrawerToggle();
  };

  const handleCategoryClick = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
  };

  const handleRemoveWidget = (widgetId) => {
    setDashboardConfig(prevConfig => {
      const updatedCategories = prevConfig.categories.map(cat => {
        if (cat.title === selectedCategory) {
          return {
            ...cat,
            widgets: cat.widgets.filter(widget => widget.id !== widgetId)
          };
        }
        return cat;
      });
      const newConfig = { ...prevConfig, categories: updatedCategories };
      localStorage.setItem('dashboardConfig', JSON.stringify(newConfig));
      return newConfig;
    });
  };

  const handleBackdropClick = (event) => {
    event.stopPropagation();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredCategories = dashboardConfig.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  const selectedCategoryData = filteredCategories.find(cat => cat.title === selectedCategory);

  return (
    <>
      <SearchBox onSearch={handleSearch} />
      <Box sx={{ paddingTop: 1, paddingLeft: 5, paddingRight: 5 }}>
        <Header onOpenDrawer={handleDrawerToggle} /> {/* Pass function to Header */}

        {filteredCategories.map((category, categoryIndex) => (
          <Box key={categoryIndex} sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {category.title}
            </Typography>
            <Grid container spacing={2}>
              {category.widgets.map((widget) => {
                let WidgetComponent;

                switch (widget.type) {
                  case 'CSPM':
                    WidgetComponent = (
                      <Grid item xs={12} md={4} key={widget.id}>
                        <CardBox title={widget.title} data={widget.data} />
                      </Grid>
                    );
                    break;
                  case 'CWPP':
                    WidgetComponent = (
                      <Grid item xs={12} md={4} key={widget.id}>
                        <GraphBox title={widget.title} data={widget.data} />
                      </Grid>
                    );
                    break;
                  case 'RegistryScan':
                    WidgetComponent = (
                      <Grid item xs={12} md={4} key={widget.id}>
                        <ProgressBar title={widget.title} data={widget.data} />
                      </Grid>
                    );
                    break;
                  default:
                    return null;
                }

                return WidgetComponent;
              })}
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 220, background: '#f5f5f5', textAlign: 'center' }}>
                  <CardContent>
                    <Button
                      color="inherit"
                      variant="outlined"
                      size="small"
                      style={{ marginRight: '10px', background: '#f5f5f5', textTransform: 'none' }}
                      onClick={handleDrawerToggle}
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

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 500,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            borderRadius: 0,
            boxShadow: 2,
            padding: 2,
            '& .MuiBackdrop-root': {
              zIndex: 1,
              cursor: 'default',
              pointerEvents: 'none',
            },
          },
        }}
        BackdropProps={{
          onClick: handleBackdropClick,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, backgroundColor: '#0404b2', padding: 2 }}>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Add New Widget
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        <Typography variant="body1" color="textSecondary" sx={{ pb: 2 }}>
          Personalise your dashboard by adding the following widget
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
            <Button
              variant="outlined"
              onClick={() => handleCategoryClick('CSPM Executive Dashboard')}
              sx={{ margin: 0.5 }}
            >
              CSPM
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleCategoryClick('CWPP Dashboard')}
              sx={{ margin: 0.5 }}
            >
              CWPP
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleCategoryClick('Registry Scan')}
              sx={{ margin: 0.5 }}
            >
              Registry Scan
            </Button>
          </Box>
        </Box>

        {selectedCategoryData && (
          <Box>
            <Box>
              {selectedCategoryData.widgets.map(widget => (
                <Box key={widget.id} sx={{ display: 'flex', alignItems: 'center', mb: 1, border: "1px solid gray", padding: 1 }}>
                  <Checkbox />
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {widget.title}
                  </Typography>
                  <IconButton edge="end" onClick={() => handleRemoveWidget(widget.id)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <TextField
          label="Widget Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleAddWidget}>
            Add Widget
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Dashboard;
