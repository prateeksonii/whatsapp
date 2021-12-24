import { FC, HTMLInputTypeAttribute } from "react";

const Input: FC<InputProps> = (props) => {
  const { id, label, placeholder, type } = props;

  return (
    <label htmlFor={id} className='flex flex-col'>
      <div className='mb-1'>{label}</div>
      <input
        className='border-2 rounded-md p-2'
        type={type ?? "text"}
        placeholder={placeholder ?? ""}
      />
    </label>
  );
};

export default Input;

interface InputProps {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}
