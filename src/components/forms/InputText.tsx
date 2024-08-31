import { ChangeEvent } from "react";

interface IProps {
  type: string;
  name: string | number;
  onChange: (event: string | number) => void;
  onFocus: (event: string | number) => void;
  required: boolean;
}

export function App(props: IProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value)
  }
  
  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    props.onFocus(e.target.value)
  }

  return (
    <div>
      <input
        id="name"
        type={props.type}
        value={props.name}
        onChange={(e) => handleChange(e)}
        onFocus={(e) => handleFocus(e)}
        required={props.required}
      />
    </div>
  );
}
