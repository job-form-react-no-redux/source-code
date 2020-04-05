import React, { useContext } from "react";
// import JobsProvider from '../context/jobsContext';

import { JobsContext } from "../context/jobsContext";

import AddJobForm from "../components/AddJobForm";
import JobsTable from "../components/job-table/JobsTable";
import EditJobModal from "../components/modals/EditJobModal"

const JobsDashboard = () => {

  const makeCreate = useContext(JobsContext).createJob;
  const existingJob = useContext(JobsContext).isJobExist;

  const handleSubmitCreateJob = (field) => {
    // console.log(field);
    // let updatedList = { ...this.state.jobsList };
    // updatedList[field.job] = { priority: field.priority };
    // this.setState({ jobsList: updatedList });
    makeCreate(field);
  };

  // const { jobsList } = this.state;
  return (
    <React.Fragment>
      <AddJobForm onSubmitCreateJob={(f) => handleSubmitCreateJob(f)} jobExistErr={existingJob}/>
      <JobsTable />
      <EditJobModal/>
    </React.Fragment>
  );
};

export default JobsDashboard;
