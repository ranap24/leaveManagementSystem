import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, id, textarea, ...props },
  ref
) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea id={id} {...props} />
      ) : (
        <input id={id} ref={ref} {...props} />
      )}
    </div>
  );
});

export default Input;
