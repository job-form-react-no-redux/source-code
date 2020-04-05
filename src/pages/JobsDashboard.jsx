import React, { useContext } from "react";

import { JobsContext } from "../context/jobsContext";

import AddJobForm from "../components/forms/AddJobForm";
import JobsTable from "../components/job-table/JobsTable";
import EditJobModal from "../components/modals/EditJobModal"

const JobsDashboard = () => {
  const existingJob = useContext(JobsContext).isJobExist;
  
  const makeCreate = useContext(JobsContext).createJob;

  const handleSubmitCreateJob = (field) => {
    makeCreate(field);
  };

  return (
    <React.Fragment>
      <AddJobForm onSubmitCreateJob={(f) => handleSubmitCreateJob(f)} jobExistErr={existingJob}/>
      <JobsTable />
      <EditJobModal/>
    </React.Fragment>
  );
};

export default JobsDashboard;
