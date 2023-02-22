import React from "react"
import DialogTitle from "@material-ui/core/DialogTitle"
import { Dialog, DialogContent, DialogActions, Button } from "@material-ui/core"
import axios from "axios"

// validation
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { TextField } from "formik-material-ui"

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  //password validation
  const lowercaseRegEx = /(?=.*[a-z])/
  const uppercaseRegEx = /(?=.*[A-Z])/
  const numericRegEx = /(?=.*[0-9])/
  const lengthRegEx = /(?=.{6,})/

  let validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        lowercaseRegEx,
        "Must contain one lowercase alphabetical character!"
      )
      .matches(
        uppercaseRegEx,
        "Must contain one uppercase alphabetical character!"
      )
      .matches(numericRegEx, "Must contain one numeric character!")
      .matches(lengthRegEx, "Must contain 6 characters!")
      .required("Password is required!"),
  })

  const resetPassword = async (e, { resetForm }) => {
    try {
      await axios.put("/auth/reset-password", {
        password: e.password,
        id: Number(selectedValue),
      })
      handleClose()
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle id="simple-dialog-title">
        Reset password {selectedValue}
      </DialogTitle>
      <Formik
        initialValues={{ password: "" }}
        onSubmit={resetPassword}
        validationSchema={validationSchema}>
        {({ isValid, dirty, handleChange, handleBlur, values }) => {
          return (
            <Form>
              <DialogContent>
                <Field
                  name="password"
                  label="Password"
                  component={TextField}
                  variant="outlined"
                  placeholder="Lowercase/Uppercase/Numeric/Should six"
                  fullWidth
                  type="password"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={!dirty || !isValid}>
                  reset
                </Button>
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
}
