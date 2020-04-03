import React, { Component } from "react";
import PrioritySelect from "./PrioritySelect";

import { validateInputLength } from "../utils/formValidations";

class AddJobForm extends Component {
  constructor() {
    super();
    this.state = {
      formFields: {
        job: "",
        priority: ""
      },
      errorMessage: ""
    };
  }
  handleChange(e, field) {
    let fields = this.state.formFields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.formFields);
    if (this.isFormValid()) {
      this.props.onSubmitCreateJob(this.state.formFields);
      this.setState({ formFields: { job: "", priority: "" }, errorMessage: "" });
    }
  }
  isFormValid() {
    if (
      this.state.formFields.job.length <= 0 ||
      this.state.formFields.priority.length <= 0
    ) {
      this.setState({ errorMessage: "All fields are required" });
      return false;
    }
    if(validateInputLength(this.state.formFields.job.length, 3)){
      this.setState({ errorMessage: "Job length mus be less then 70 characters" });
      return false;
    }
    return true;
  }
  render() {
    return (
      <form className="AddJobForm" onSubmit={e => this.handleSubmit(e)}>
        <div className="AddJobForm__row">
          <label className="AddJobForm__label" htmlFor="job">
            Job:
          </label>
          <input
            className="AddJobForm__input"
            name="job"
            type="text"
            placeholder="Job"
            onChange={e => this.handleChange(e, "job")}
            value={this.state.formFields["job"]}
          />
        </div>
        <div className="AddJobForm__row">
          <label className="AddJobForm__label" htmlFor="priority">
            Priority:
          </label>
          <PrioritySelect
            value={this.state.formFields.priority}
            onSelectPriority={e => this.handleChange(e, "priority")}
          />
        </div>
        {this.state.errorMessage && <div className="AddJobForm__error-message">{this.state.errorMessage}</div>}
        <button type="submit">Create</button>
      </form>
    );
  }
}

export default AddJobForm;
