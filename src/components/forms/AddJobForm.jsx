import React, { Component } from "react";

import PrioritySelect from "../PrioritySelect";

import { validateInputLength } from "../../utils/formValidations";

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
    if(this.props.jobExistErr && this.state.errorMessage === ""){
      this.setState({errorMessage: "Job already exist"})
    }
  }
  handleChange(e, field) {
    let fields = this.state.formFields;
    fields[field] = e.target.value;
    if (field === "job") {
      this.validateInput(fields[field]);
      fields[field] = fields[field].replace(/[^A-Za-z]/gi, "");
    }
    if(this.state.errorMessage === "Job already exist"){
      this.setState({ errorMessage: "" });
    }
    this.setState({ fields, resetSelect: false });
  }
  handleSubmit(e) {
    e.preventDefault();
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
    } else if (validateInputLength(this.state.formFields.job.length)) {
      this.setState({
        errorMessage: "Job name length mus be less then 70 characters",
      });
    } else {
      this.setState({ errorMessage: "" });
    }
  }
  render() {
    console.log(this.state.errorMessage)
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
