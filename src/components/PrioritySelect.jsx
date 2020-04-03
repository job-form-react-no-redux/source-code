import React from "react";
import PRIORITIES_LIST from "../utils/constants";

const PrioritySelect = prop => {
  return (
    <div className="priority-select" name="slot" id="slot">
      <select
        onChange={e => {
          prop.onSelectPriority(e);
        }}
      >
        {PRIORITIES_LIST.map((p, i) => (
          <option value={p} key={i}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PrioritySelect;
