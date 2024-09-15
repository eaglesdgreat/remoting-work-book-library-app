import { ChangeEvent } from "react";

interface IProps {
  type: string;
  name: string;
  value: string | number;
  onChange: (event: string | number) => void;
  onFocus: (event: string | number) => void;
  onBlur: (event: string | number) => void;
  required: boolean;
  classes: string
}

export function InputText({
  className,
  label,
  errors,
  isError,
  isSuccess,
  helperText,
  hideLabel = false,
  name,
  onChange,
  onFocus,
  onEnter,
  onBlur,
  required = false,
  hasSlideUpLabel = false,
  noNegativeValue = false,
  showCC,
  type = "text",
  leftIcon,
  rightIcon,
  iconSpacing,
  width,
  height,
  color,
  background,
  borderWidth,
  borderColor,
  borderStyle,
  borderRadius,
  classNames,
  placeholder,
  inputRef,
  ...props
}: IProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  
  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    onFocus(e.target.value)
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    onBlur(e.target.value)
  }

  return (
    <div>
      <input
        id={name}
        type={type}
        value={props.value}
        onChange={(e) => handleChange(e)}
        onFocus={(e) => handleFocus(e)}
        onBlur={(e) => handleBlur(e)}
        required={required}
        className={className}
      />
    </div>
  );
}
