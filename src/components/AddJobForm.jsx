import React, { Component } from "react";

import PrioritySelect from "./PrioritySelect";

import { validateInputLength } from "../utils/formValidations";

class AddJobForm extends Component {
  constructor() {
    super();
    this.state = {
      formFields: {
        job: "",
        priority: "",
      },
      errorMessage: "",
      resetSelect: false,
    };
  }
  componentDidUpdate(prevProps, prevState){
    console.log(prevProps.jobExistErr)
    console.log(this.props.jobExistErr)
    if(this.props.jobExistErr && prevProps.jobExistErr !== this.props.jobExistErr){
      this.setState({errorMessage: "Job already exist",  resetSelect: true})
    }
  }
  handleChange(e, field) {
    let fields = this.state.formFields;
    fields[field] = e.target.value;
    if (field === "job") {
      this.validateInput(fields[field]);
      fields[field] = fields[field].replace(/[^A-Za-z]/gi, "");
    }
    this.setState({ fields });
  }
  handleSubmit(e) {
    e.preventDefault();
    // console.log(this.state.formFields);
    if (
      this.state.formFields.job.length > 0 &&
      this.state.formFields.priority.length > 0
    ) {
      this.props.onSubmitCreateJob(this.state.formFields);
      this.setState({
        formFields: { job: "", priority: "" },
        errorMessage: "",
        resetSelect: true
      });
    } else {
      this.setState({ errorMessage: "All fields are required", resetSelect: false });
    }
  }
  validateInput(field) {
    if (/[^A-Za-z]/gi.test(field)) {
      this.setState({ errorMessage: "Only English letters are allowed" });
    } else {
      this.setState({ errorMessage: "" });
    }
    if (validateInputLength(this.state.formFields.job.length)) {
      this.setState({
        errorMessage: "Job name length mus be less then 70 characters",
      });
    }
  }
  render() {
    return (
      <form className="AddJobForm" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="AddJobForm__row">
          <label className="AddJobForm__label" htmlFor="job">
            Job:
          </label>
          <input
            className="app-standard-input"
            name="job"
            type="text"
            placeholder="Job"
            onChange={(e) => this.handleChange(e, "job")}
            value={this.state.formFields["job"]}
          />
        </div>
        <div className="AddJobForm__row">
          <label className="AddJobForm__label" htmlFor="priority">
            Priority:
          </label>
          <PrioritySelect
            reset={this.state.resetSelect}
            value={this.state.formFields.priority}
            onSelectPriority={(e) => this.handleChange(e, "priority")}
          />
        </div>
        {this.state.errorMessage ? (
          <div className="AddJobForm__error-message">
            {this.state.errorMessage}
          </div>
        ) : (
          <div className="AddJobForm__no-error-message">no errors</div>
        )}
        <button type="submit">Create</button>
      </form>
    );
  }
}

export default AddJobForm;
