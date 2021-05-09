import { Grid } from "@material-ui/core";
import { SyntheticEvent, useEffect } from "react";
import * as employeeService from "../../services/employeeService";
import { useForm, Form, ValidateOneInputType } from "../../utils/useForm";
import { Controls } from './../../components/controls/Controls';

export type GenderItemsType = {
  id: string 
  title: string
}

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const initialFieldValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

type PropsType = {
  addOrEdit: (
    employee: employeeService.EmployeeType,
    resetForm: () => void
  ) => void;
  recordForEdit: employeeService.EmployeeType | null;
};

const EmployeeForm = ({ addOrEdit, recordForEdit }: PropsType) => {
  const validate = (fieldValues: ValidateOneInputType | employeeService.EmployeeType) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues) {
      temp.fullName = fieldValues.fullName ? "" : "This field is required";
    }
    if ("mobile" in fieldValues) {
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required";
    }
    if ("email" in fieldValues) {
      temp.email = /^\S+@\S+\.\S+$/.test(values.email)
        ? ""
        : "Email is not valid";
    }
    if (fieldValues.departmentId) {
      temp.departmentId =
        fieldValues.departmentId.length !== 0 ? "" : "This field is required";
    }
    setErrors({ ...temp });
    // eslint-disable-next-line eqeqeq
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (validate(values)) {
      addOrEdit(values, resetForm);
    }
  };

  const {
    values,
    setValues,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    errors,
    setErrors,
    resetForm,
  } = useForm(initialFieldValues, true, validate);

  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit,
      });
    }
  }, [setValues, recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="Full Name"
            value={values.fullName}
            name="fullName"
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            error={errors.email}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            label="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleSelectChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            name="hireDate"
            label="Hire Date"
            value={values.hireDate}
            onChange={handleCheckboxChange}
          />
          <Controls.Checkbox
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleCheckboxChange}
          />
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button
              color="secondary"
              text="Reset"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeeForm;
