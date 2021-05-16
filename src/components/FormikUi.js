import React from 'react'
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too short').required('Required')
  });

const FormikUi = (props)=>{
    return (

function App() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >

      {({  errors, touched  }) => (
        <Form>
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
          />
          <br />
          <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
    )
}

export default FormikUi