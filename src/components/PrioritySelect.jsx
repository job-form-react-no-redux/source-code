import React, { Component } from "react";

import PRIORITIES_LIST from "../utils/constants";

class PrioritySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {select: this.props.value};
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.reset !== this.props.reset){
      this.setState({select: ''})
    }
    // TODO:
    // if(this.props.reset && this.state.select !== ''){
    //   this.setState({select: ''})
    // }
  }
  render() {
    return (
      <div className="priority-select" name="slot" id="slot">
        <select
          onChange={(e) => {
            this.setState({select: e.target.value});
            this.props.onSelectPriority(e);
          }}
          value={this.state.select}
        >
          {PRIORITIES_LIST.map((p, i) => (
            <option value={p} key={i}>
              {p}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
export default PrioritySelect;
