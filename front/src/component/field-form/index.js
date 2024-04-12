import { useState } from "react";
import "./index.css";

export default function Component({ placeholder, button, onSubmit }) {
  const [value, setValue] = useState(""); //значення в полі

  const handleChange = (e) => setValue(e.target.value); //задавати значення в полі

  const handleSubmit = () => {
    if (value.length === 0) return null; // якщо поле пусте повертаємо 0

    if (onSubmit) {
      onSubmit(value);
    } else {
      throw new Error("onSubmit props 404");
    }

    setValue("");
  };

  const isDisabled = value.length === 0; // генерується при рендері, відповідає щоб вказати на стан активності кнопки

  return (
    <div className="field-form">
      <textarea
        onChange={handleChange}
        value={value}
        rows={2} // textarea має 2 рядки
        placeholder={placeholder}
        className="field-form__field"
      ></textarea>
      <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className="field-form__button"
      >
        {button}
      </button>
    </div>
  );
}
