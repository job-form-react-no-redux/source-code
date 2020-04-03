import React from "react";

const JobsTable = prop => {
  return (
    <section className="JobsTable">
      <div className="JobsTable__header">
        <div className="JobsTable__title"></div>
        <div className="JobsTable__search-field"></div>
      </div>
      {prop.jobsList.map((job, i) => (
        <div key={i}>{job.job}</div>
      ))}
    </section>
  );
};

export default JobsTable;
