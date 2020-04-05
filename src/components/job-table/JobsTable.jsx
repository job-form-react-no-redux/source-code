import React, { useState, useContext } from "react";
import { JobsContext } from "../../context/jobsContext";

import JobTableRow from "./JobsTableRow";

const TABLE_TITLE = "job list";

const JobsTable = () => {
  const jobsList = useContext(JobsContext).jobs;

  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredList, setFilteredList] = useState(jobsList);

  const handleSearch = (e) => {
    let result = {};
    for (let priority in jobsList) {
      result[priority] = [];
      for (let job in jobsList[priority]) {
        if (jobsList[priority][job].includes(e.target.value)) {
          result[priority].push(jobsList[priority][job]);
        }
      }
    }
    setSearchInputValue(e.target.value);
    setFilteredList(result);
  };

  let finalList = searchInputValue.length > 0 ? filteredList : jobsList;

  return (
    <section className="JobsTable">
      <div className="JobsTable__header">
        <div className="JobsTable__title">{TABLE_TITLE.toUpperCase()}</div>
        <div className="JobsTable__search-field">
          <input
            className="app-standard-input"
            type="text"
            placeholder="Search job"
            onChange={(e) => handleSearch(e)}
            value={searchInputValue}
          />
        </div>
      </div>
      <ul>
        {finalList &&
          Object.keys(finalList).map((priority) =>
            finalList[priority].map((job, i) => (
              <JobTableRow key={i + job} job={job} priority={priority} />
            ))
          )}
      </ul>
    </section>
  );
};

export default JobsTable;
