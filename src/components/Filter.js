import React from "react";

function Filter(props) {
  function onChange(event) {
    resetChecked(event);
    props.onFilter(event.target.value);
    
  }
  function resetChecked(event) {
    if (document.getElementsByTagName("input")) {
      Array.from(document.getElementsByTagName("input")).forEach((input) => {
        if (input.type === "checkbox")
          input.checked = input.value === event.target.value ? event.target.checked : input.checked;
      });
    }
  }
  return (
    <div className="filter">
      <div>
        <input
          type="checkbox"
          id="mountains"
          name="mountains"
          value="mountains"
          onChange={onChange}
        />
        <label htmlFor="Mountains">Tags-Mountains</label>
        <input
          type="checkbox"
          id="dogs"
          name="dogs"
          value="dogs"
          onChange={onChange}
        />
        <label htmlFor="Dogs">Tags-Dogs</label>
      </div>
    </div>
  );
}

export default Filter;
