import React, { useState, useContext } from "react";
import { JobsContext } from "../../context/jobsContext";

import JobTableRow from "./JobsTableRow";

const JobsTable = () => {
  const TABLE_TITLE = "job list";

  const jobsList = useContext(JobsContext).jobs;

  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredList, setFilteredList] = useState(jobsList);

  const handleSearch = (e) => {
    let result = {};

    for(let job in jobsList){
      if (job.includes(e.target.value)) {
        result[job] = jobsList[job];
      }
    }

    setSearchInputValue(e.target.value);
    setFilteredList(result);
  };

  let finalList = searchInputValue.length > 0 ? filteredList : jobsList
  // let order = Object.keys(finalList).sort(function(a,b){return finalList[a]-finalList[b]})

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
        {finalList && Object.keys(finalList).map((keyName, i) => (
          <JobTableRow
            key={i + keyName}
            job={keyName}
            priority={finalList[keyName].priority}
          />
        ))}
      </ul>
    </section>
  );
  // }
};

export default JobsTable;
