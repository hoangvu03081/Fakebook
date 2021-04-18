import { useEffect } from "react";
import * as bootstrap from "../../../node_modules/bootstrap/dist/js/bootstrap.bundle";

export function TooltipIcon({
  className,
  customClass,
  direction,
  Component,
  style,
  tooltipText,
  ...props
}) {
  useEffect(() => {
    const el = document.querySelector(
      `[data-bs-toggle='tooltip']`
    );
    const tooltip = new bootstrap.Tooltip(el, {customClass: customClass});
  }, []);

  if (!Component)
    return (
      <div
        className={`${className} ${customClass} d-flex justify-content-center align-items-center`}
        data-bs-toggle="tooltip"
        data-bs-customclass={customClass}
        data-bs-placement={direction}
        style={{...style, cursor: "pointer"}}
        {...props}
      >
        {tooltipText}
      </div>
    );
  else
    return (
      <Component
        className={`${className} d-flex justify-content-center align-items-center`}
        data-bs-toggle="tooltip"
        data-bs-placement={direction}
        {...props}
      >
        {tooltipText}
      </Component>
    );
}
