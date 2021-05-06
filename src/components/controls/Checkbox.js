import { FormControlLabel, Checkbox as MuiCheckbox, FormControl } from '@material-ui/core'
import React from 'react'

export default function Checkbox({ name, value, onChange, label }) {

  const convertToDefaultParametr = (name, value) => ({
    target: {
      name, value
    }
  })

  return (
    <FormControl>
      <FormControlLabel
        control={<MuiCheckbox
          onChange={e => onChange(convertToDefaultParametr(name, e.target.checked))}
          checked={value}
          name={name}
        />}
        label={label}
      />
    </FormControl>
  )
}
