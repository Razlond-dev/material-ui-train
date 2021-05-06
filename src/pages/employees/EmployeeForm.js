import { Grid } from "@material-ui/core"
import { Controls } from "../../components/controls/Controls"
import { getDepartmentCollection } from "../../services/employeeService"
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

  const {
    values,
    handleInputChange
  } = useForm(initialFieldValues)

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            variant="outlined"
            label="Full Name"
            value={values.fullName}
            name="fullName"
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
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
            options={getDepartmentCollection()}
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
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}

export default EmployeeForm