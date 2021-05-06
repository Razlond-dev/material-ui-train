import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'

export default function DatePicker({name, value, label, onChange}) {
 
  const convertToDefaultParametr = (name, value) => ({
    target: {
      name, value
    }
  })

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={date => onChange(convertToDefaultParametr(name, date))}
      >

      </KeyboardDatePicker>
    </MuiPickersUtilsProvider>
  )
}
