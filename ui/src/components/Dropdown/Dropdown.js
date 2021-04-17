import React from "react";

export default function Dropdown({ title, options }) {
  const renderOptions = () => {
    return options.map((option) => (
      <li key={option.value}>{option.content}</li>
    ));
  };
  return (
    <ul className="dropdown">
      <li className="btn dropdown-toggle" id={title.content} data-bs-toggle="dropdown">{title.content}</li>
      <ul className="dropdown-menu" aria-labelledby={title.content}>{renderOptions}</ul>
    </ul>
  );
}
