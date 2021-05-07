import { TextField } from "@material-ui/core";

export default function Input({ name, label, value, onChange, error = null, startAdornment }) {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      startAdornment={startAdornment}
      {...(error && { error: true, helperText: error })}
    />
  )
}
