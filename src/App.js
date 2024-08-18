import React from 'react';
import Dashboard from './Dashboard'; // Import the Dashboard component
import initialDashboardConfig from './dashboardConfig.json'; // Import the initial dashboard configuration

const App = () => {
  return (
    <div>
      <Dashboard initialDashboardConfig={initialDashboardConfig} />
    </div>
  );
};

export default App;
