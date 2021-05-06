import { TextField } from "@material-ui/core";

export default function Input({ name, label, value, onChange, type }) {

  return (
    <TextField
      type={type ? type : null}
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}
