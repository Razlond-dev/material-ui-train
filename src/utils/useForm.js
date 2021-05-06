import { makeStyles } from '@material-ui/core'
import { useState } from 'react'

export function useForm(initialValues, validateChange = false, validate) {

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    if (validateChange) {
      validate({ [name]: value })
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
  }

  return {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  }
}))

export function Form({ children, ...other }) {

  const classes = useStyles()


  return (
    <form className={classes.root} {...other}>
      {children}
    </form>
  )
}
