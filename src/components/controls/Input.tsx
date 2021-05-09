import { TextField } from "@material-ui/core";
import { SyntheticEvent } from "react";
// TODO fix adornment
type PropsType = {
  name?: string
  label?: string
  value?: string
  onChange?: (e: SyntheticEvent) => void
  error?: null | string
  // startAdornment?: Element
}

export default function Input({ name, label, value, onChange, error = null }: PropsType) {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      // startAdornment={startAdornment}
      {...(error && { error: true, helperText: error })}
    />
  )
}
