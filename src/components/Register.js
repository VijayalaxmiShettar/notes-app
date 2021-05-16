import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Typography, Paper, Button} from '@material-ui/core/';
import '../styles/styles.css'
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert'
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

const useStyles = makeStyles({
    textFieldClass: {
        marginBottom:'10px',
        width:'100%'
    },
  });

const registerSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Too short').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must be atleast 8 characters').required('Required')
});


const Register = (props)=>{
    const classes = useStyles();

    const handleSubmit = (data)=>{
       
        axios.post('http://dct-user-auth.herokuapp.com/users/register', data)
            .then((res)=>{
                const response = res.data
                if(Object.keys(response).includes('errors')){
                    if(response.errors.email?.kind == 'unique'){
                        swal({text: "Email alreay registered", icon:"error"})
                    }else if(response.errors.username?.kind == 'unique')
                        swal({text: "Username already exists", icon:"error"})
                }else{
                    swal({text:'Registration successful!', icon:"success"})
                    props.history.push('/login')
                }
            })
            .catch((err)=>{
                swal({text: err.message, icon:"error" })
            })
        
    }

    const handleCancel = ()=>{
        props.history.push('/')
    }

    return(
        <div className="regLoginContainer">
            <Paper elevation={3}>
                <div className="regLoginDiv">
                    <Typography style={{marginBottom:'25px'}} variant="h5">Register with us</Typography>
                   
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                        }}
                        validationSchema={registerSchema}
                        
                        onSubmit={values => {
                            console.log(values);
                            handleSubmit(values)
                        }}
                        >

                        {() => (
                        <Form className="form-class">
                            <Field
                                component={TextField} name="username" type="text" label="Username"
                                className={classes.textFieldClass} variant="outlined" size="small" disabled={false}
                            />
                            <Field
                                component={TextField} name="email" type="email" label="Email"
                                className={classes.textFieldClass} variant="outlined" size="small" disabled={false}
                            />
                            <br />
                            <Field
                                component={TextField} label="Password" name="password"
                                type='password' className={classes.textFieldClass}  variant="outlined"  size="small" disabled={false}
                            />
                            <br/>
                            <br />
                            <Button variant="contained" type="submit" size="small"> Register </Button> &nbsp; &nbsp;
                            <Button size="small" onClick={handleCancel} variant="contained">Cancel</Button>
                        </Form>
                        )}
                    </Formik>
                </div>
            </Paper>
        </div>
    )
}
export default Register