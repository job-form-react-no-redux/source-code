import React, { Component } from "react";

import AddJobForm from "../components/AddJobForm";
import JobsTable from "../components/JobsTable";

class JobsDashboard extends Component {
  constructor() {
    super();
    this.state = {
      jobsList: []
    };
  }
  handleSubmitCreateJob(field){
console.log(field)
this.setState({ jobsList: [...this.state.jobsList, field] });
  }

  render() {
    const { jobsList } = this.state;
    return (
      <React.Fragment>
        <AddJobForm onSubmitCreateJob={f => this.handleSubmitCreateJob(f)} />
        <JobsTable jobsList={jobsList} />
      </React.Fragment>
    );
  }
}

export default JobsDashboard;
