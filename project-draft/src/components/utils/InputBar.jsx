// #10 text input bar, shared by meiyao and ellie for upload configurations
// Owner: Meiyao

// <div class="input-box">
// <label for="linkInput" class="form-label"> Upload from URL / YouTube:</label>
// <input type="link" class="form-control" id="linkInput" placeholder="Enter a link to upload a vocal warm-up, http://...">
// </div>


import { useState } from "react";

export function InputBar({ placeholder = "Type here...", onChange, onEnterPress, className = "" }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && onEnterPress) {
      onEnterPress(inputValue);
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      placeholder={placeholder}
      className={"input-box"}
    />
  );
}

export default InputBar;