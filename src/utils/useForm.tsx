import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { EmployeeType } from "../services/employeeService";
import { SyntheticEvent } from "react";
import React from "react";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

export type ValidateOneInputType = {
  [x: string]: string;
};

export function useForm(
  initialValues: EmployeeType,
  validateChange = false,
  validate: (x: ValidateOneInputType | EmployeeType) => void
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({
    mobile: "",
    departmentId: "",
    fullName: "",
    email: "",
  });

  const handleInputChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateChange) {
      validate({ [name]: value });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string }>) => {
    const { name, value } = e.target as HTMLSelectElement;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateChange) {
      validate({ [name]: value });
    }
  };

  const handleCheckboxChange = (target: { name: string; value: boolean | MaterialUiPickersDate }) => {
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({
      mobile: "",
      departmentId: "",
      fullName: "",
      email: "",
    });
  };

  return {
    values,
    setValues,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    errors,
    setErrors,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export type ChildrenPropsType = {
  children: React.ReactNode;
  onSubmit?: (e: SyntheticEvent) => void;
};

export const Form = ({ children, onSubmit }: ChildrenPropsType) => {
  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
