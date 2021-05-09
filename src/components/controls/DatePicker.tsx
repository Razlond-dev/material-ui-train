import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import React from 'react'

type PropsType = {
  name: string
  value: Date
  onChange: (target: { name: string; value: MaterialUiPickersDate; }) => void
  label: string
}


export default function DatePicker({name, value, label, onChange}: PropsType) {
 
  const convertToDefaultParametr = (name: string, value: MaterialUiPickersDate) => ({
      name, value
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
