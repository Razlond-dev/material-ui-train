import { makeStyles } from '@material-ui/core'
import { useState } from 'react'

export function useForm(initialValues) {

  const [values, setValues] = useState(initialValues)

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  return {
    values,
    setValues,
    handleInputChange
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

export function Form({children}) {

  const classes = useStyles()


  return (
    <form className={classes.root}>
      {children}
    </form>
  )
}
