import { React } from "react";

function Inputs(props) {
  //
  function render(type) {
    if (type === "textarea") {
      return (
        <div className="disp-flex">
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
    return (
      <div className="disp-flex">
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
