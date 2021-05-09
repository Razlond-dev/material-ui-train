import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import { DepartmentsType } from "../../services/employeeService";


type PropsType = {
  name: string;
  label: string;
  value: string | undefined;
  error?: string | null;
  onChange?: (
    e: React.ChangeEvent<{ name?: string}>,
  ) => void;
  options: Array<DepartmentsType>;
};

export default function Select({
  name,
  label,
  value,
  error = null,
  onChange,
  options,
}: PropsType) {
  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect name={name} value={value} label={label} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
