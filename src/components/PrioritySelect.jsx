import React, { useState, useEffect } from "react";
import propTypes from "prop-types";

import PRIORITIES_LIST from "../utils/constants";

const PrioritySelect = (prop) => {
  const [select, setSelect] = useState(prop.value);

  useEffect(() => {
    if(prop.reset){
      setSelect('');
    }
  }, [prop.reset]);

  return (
    <div className="priority-select" name="slot" id="slot">
      <select
        onChange={(e) => {
          setSelect(e.target.value);
          prop.onSelectPriority(e);
        }}
        value={select}
      >
        <option value=""></option>
        {PRIORITIES_LIST.map((p, i) => (
          <option value={p} key={i}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
};
PrioritySelect.propTypes = {
  value: propTypes.string,
  reset: propTypes.bool,
  onSelectPriority: propTypes.func.isRequired,
};

export default PrioritySelect;
