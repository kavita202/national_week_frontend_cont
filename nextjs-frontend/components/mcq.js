import { nanoid } from "nanoid";
import { Radio, Space } from "antd";
function MCQ({ obj, name, colorChange, checked, onChange }) {
  return (
    <label
      key={nanoid()}
      style={{
        color: obj.correct ? colorChange : "",
      }}
    >
      <input
        type="radio"
        value={obj.correct}
        checked={checked}
        onChange={onChange}
        name={name}
        required
      />
      {obj.answer}
      <br></br>
    </label>
  );
}

export default MCQ;
