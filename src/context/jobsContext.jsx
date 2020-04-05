import React, { useState } from "react";

import { saveJobsList, getJobsList } from "../utils/localStorage";
import PRIORITIES_LIST from "../utils/constants";

export const JobsContext = React.createContext({
  jobs: {},
  existingJob: null,
  editJob: () => {},
  deleteJob: () => {},
  createJob: () => {},
});

export default (props) => {
  const [jobsList, setJobsList] = useState(() => {
    let savedList = getJobsList();
    let jobs = {};
    if(savedList){
      jobs = savedList
    }else{
      for (let priority in PRIORITIES_LIST) {
        jobs[PRIORITIES_LIST[priority]] = [];
      }
    }
    return jobs;
  });

  const [existingJob, setExistingJob] = useState(false);

  const makeCreate = (j) => {
    setJobsList((currentJobs) => {
      for (let priority in currentJobs) {
        if (currentJobs[priority].includes(j.job)) {
          setExistingJob(true);
          return currentJobs;
        }
      }
      setExistingJob(false);
      currentJobs[j.priority].unshift(j.job);
      let result = { ...currentJobs };
      saveJobsList(result);
      return result;
    });
  };
  const makeEdit = (j) => {
    setJobsList((currentJobs) => {
    currentJobs[j.newPriority].unshift(j.job);
    makeDelete({job: j.job, priority: j.priority})
    });
  };
  const makeDelete = (j) => {
    setJobsList((currentJobs) => {
      let indexToDelete = currentJobs[j.priority].indexOf(j.job);
      if (indexToDelete >= 0) {
        currentJobs[j.priority].splice(indexToDelete, 1);
      }
      let updatedJobsList = { ...currentJobs };
      saveJobsList(updatedJobsList);
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
