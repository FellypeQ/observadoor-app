import { React } from "react";

function Inputs(props) {
  //
  function render(type) {
    if (type === "textarea") {
      return (
        <div className="disp-flex flex-direct-col mg-y-1">
          <label className="text-14px">{props.label}</label>
          <textarea
            placeholder={props.placeholder}
            className={props.className}
            value={props.value}
            name={props.name}
            onChange={props.onChange}
          />
        </div>
      );
    }
    if (type === "select") {
      return (
        <div className="disp-flex">
          <label className="text-14px">{props.label}</label>
          <select
            className={props.className}
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            index={props.index}
            objectKey={props.objectKey}
          >
            {props.options.map((element, idx) => (
              <option key={idx}>{element}</option>
            ))}
          </select>
        </div>
      );
    }
    if (type === "radio") {
      return (
        <div className="mg-y-1">
          <label className="text-14px">{props.label}</label>
          <div className="disp-flex">
            {props.options.map((element, idx) => (
              <div key={idx} className="disp-flex mg-x-1">
                <input
                  type={props.type}
                  name={props.name}
                  value={element}
                  onChange={props.onChange}
                  checked={props.value === element ? "checked" : ""}
                />
                <label htmlFor={props.value}>{element}</label>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="disp-flex mg-y-1">
        <label className="text-14px">{props.label}</label>
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className={props.className}
          disabled={props.disabled}
          placeholder={props.placeholder}
          objectKey={props.objectKey}
          index={props.index}
          checked={props.checked}
        />
      </div>
    );
  }

  return render(props.format);
}
export default Inputs;
