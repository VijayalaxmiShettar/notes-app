import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { Paper, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {getUserDetails} from '../actions/actions'
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import swal from 'sweetalert'

const useStyles = makeStyles({
    textFieldClass: {
        marginBottom:'10px',
        width:'100%'
    },
  });

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});

const Login = (props)=>{
    const [showPassword, setShowPwd] = useState(false)
    
    const classes = useStyles();
    const dispatch= useDispatch()

    const handleChange = (e)=>{
        const checked = e.target.checked
        setShowPwd(checked)
    }

    const handleSubmit = (data)=>{
        
        axios.post('https://dct-user-auth.herokuapp.com/users/login', data)
            .then((res)=>{
                const response = res.data
                if(Object.keys(response).includes('errors')){
                    swal({text: response.errors.toUpperCase(), icon:"error"})
                }else{
                    localStorage.setItem('token', response.token)
                    //dispatch(addUserData({auth: true}))
                    dispatch(getUserDetails(response.token))
                    props.history.push('/')
                }
            })
            .catch((err)=>{
                swal({text: err.message, icon:"error"})
            })
    }

    const handleCancel = ()=>{
        props.history.push('/')
    }

    return(
        <div className="regLoginContainer">
            {props.location.state && (
                <div>
                    <Typography variant="subtitle1" style={{color:'red'}}>You need to login first</Typography>
                </div>
            )}
            
            <Paper elevation={3}>
                <div className="regLoginDiv">
                    <Typography variant="h5" style={{marginBottom:'25px'}}> Login to your account </Typography>
                        
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={SignupSchema}
                        
                        onSubmit={values => {
                            // same shape as initial values
                            console.log(values);
                            handleSubmit(values)
                        }}
                        >

                        {() => (
                        <Form>
                            <Field
                                component={TextField} name="email" type="email" label="Email"
                                className={classes.textFieldClass} variant="outlined" size="small" disabled={false}
                            />
                            <br />
                            <Field
                                component={TextField} label="Password" name="password"
                                type={showPassword ? 'text' : 'password'} className={classes.textFieldClass}  variant="outlined"  size="small" disabled={false}
                            />
                            <input type="checkbox" id="showPwd" name="showPwd" checked={showPassword} onChange={handleChange}/><label htmlFor="showPwd">Show Password</label><br/>
                            <br />
                            <Button variant="contained" type="submit" size="small"> Login </Button> &nbsp; &nbsp;
                            <Button size="small" onClick={handleCancel} variant="contained">Cancel</Button>
                        </Form>
                        )}
                    </Formik>
                </div>
            </Paper>
        </div>
    )
}

export default Login
