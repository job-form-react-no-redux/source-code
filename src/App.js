import React from "react";

import JobDashboard from "./pages/JobsDashboard";

import JobsProvider from "./context/jobsContext";
import ModalProvider from "./context/modalContext";

const App = () => {
  return (
    <div className="App">
      <JobsProvider>
        <ModalProvider>
        <JobDashboard />
        </ModalProvider>
      </JobsProvider>
    </div>
  );
};

export default App;
