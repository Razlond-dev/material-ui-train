import { TextField } from "@material-ui/core";

export default function Input({ name, label, value, onChange, type, error = null }) {

  return (
    <TextField
      type={type ? type : null}
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  )
}
