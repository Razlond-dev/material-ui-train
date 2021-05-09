import { FormControlLabel, Checkbox as MuiCheckbox, FormControl } from '@material-ui/core'
import React from 'react'

type PropsType = {
  name: string
  value: boolean
  onChange: (target: { name: string; value: boolean; }) => void
  label: string
}

export default function Checkbox({ name, value, onChange, label }: PropsType) {

  const convertToDefaultParametr = (name: string, value: boolean) => ({
      name, value
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
