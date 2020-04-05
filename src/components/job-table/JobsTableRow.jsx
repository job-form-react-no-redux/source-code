import React, { useContext } from "react";
import propTypes from "prop-types";

import { JobsContext } from "../../context/jobsContext";
import { ModalContext } from "../../context/modalContext";

const JobTableRow = (prop) => {
  const modalSetStatus = useContext(ModalContext).setStatus;
  const makeSetProps = useContext(ModalContext).setProps;
  const makeDelete = useContext(JobsContext).deleteJob;

  const handleEdit = () => {
    makeSetProps(prop);
    modalSetStatus(true);
  };
  const handleDelete = (job) => {
    makeDelete(job);
  };

  return (
    <li className={`JobsTableRow Row${prop.priority}`}>
      <div className="JobsTableRow__name">{prop.job}</div>
      <div className="JobsTableRow__priority">{prop.priority}</div>
      <div className="JobsTableRow__interactive">
        <button onClick={() => handleEdit()}>Edit</button>
        <button onClick={() => handleDelete(prop)}>Delete</button>
      </div>
    </li>
  );
};
JobTableRow.propTypes = {
  priority: propTypes.string.isRequired,
  job: propTypes.string.isRequired,
};

export default JobTableRow;
