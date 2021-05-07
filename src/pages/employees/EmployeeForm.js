import { Grid } from "@material-ui/core"
import { Controls } from "../../components/controls/Controls"
import * as employeeService from "../../services/employeeService"
import { useForm, Form } from "../../utils/useForm"

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' },
]

const initialFieldValues = {
  id: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false,
}

const EmployeeForm = () => {

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('fullName' in fieldValues) {
      temp.fullName = fieldValues.fullName ? "" : "This field is required"
    }
    if ('mobile' in fieldValues) {
      temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required"
    }
    if ('email' in fieldValues) {
      temp.email = (/^\S+@\S+\.\S+$/).test(values.email) ? "" : "Email is not valid"
    }
    if ('departmentId' in fieldValues) {
      temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "This field is required"
    }
    setErrors({ ...temp })
    // eslint-disable-next-line eqeqeq
    if (fieldValues == values) return Object.values(temp).every(x => x == '')
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (validate()) {
      employeeService.insertEmployee(values)
      resetForm()
    }
  }

  const {
    values,
    handleInputChange,
    errors,
    setErrors,
    resetForm
  } = useForm(initialFieldValues, true, validate)

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            variant="outlined"
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
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            name="hireDate"
            label="Hire Date"
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button
              type="submit"
              text="Submit"
            />
            <Controls.Button
              color="secondary"
              text="Reset"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}

export default EmployeeForm