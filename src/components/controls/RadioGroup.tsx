import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup } from "@material-ui/core";
import { SyntheticEvent } from "react";
import { GenderItemsType } from "../../pages/employees/EmployeeForm";

type PropsType = {
  name: string
  label: string
  value: string
  onChange: (e: SyntheticEvent) => void
  items: Array<GenderItemsType>
}

export default function RadioGroup({ name, label, value, onChange, items }: PropsType) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row
        name={name}
        value={value}
        onChange={onChange}
      >
        {
          items.map((item) => <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
          )
        }
      </MuiRadioGroup>
    </FormControl>
  )
}
