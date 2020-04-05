import React, { useState } from "react";

export const JobsContext = React.createContext({
  jobs: {},
  existingJob: null,
  editJob: () => {},
  deleteJob: () => {},
  createJob: () => {},
});

export default (props) => {
  const [jobsList, setJobsList] = useState({
    test1: {
      priority: "Urgent",
    },
    test2: {
      priority: "Trivial",
    },
    test3: {
      priority: "Urgent",
    },
  });
//   const [jobsList, setJobsList] = useState({});
  const [existingJob, setExistingJob] = useState(false);

  const makeCreate = (job) => {
    setJobsList((currentJobs) => {
      if (currentJobs[job.job]) {
        setExistingJob(true);
        return currentJobs;
      }
      setExistingJob(false)
      currentJobs[job.job] = { priority: job.priority };
      let result = { ...currentJobs };
      //   console.log(result);
      return result;
    });
  };
  const makeEdit = (job) => {
      console.log(job)
      setJobsList((currentJobs) => {
          currentJobs[job.job] = {priority: job.priority};
          let result = { ...currentJobs };
          return result;
      });
  };
  const makeDelete = (job) => {
    setJobsList((currentJobs) => {
      delete currentJobs[job];
      //   console.log(job)
      //   console.log(currentJobs)
      let updatedJobsList = { ...currentJobs };
      return updatedJobsList;
    });
  };

  return (
    <JobsContext.Provider
      value={{
        jobs: jobsList,
        isJobExist: existingJob,
        createJob: makeCreate,
        editJob: makeEdit,
        deleteJob: makeDelete,
      }}
    >
      {props.children}
    </JobsContext.Provider>
  );
};
