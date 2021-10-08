import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import store from '../store/store';
import { useState } from '@hookstate/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '../apiServices/authServices';
import {Spinner} from 'react-bootstrap'


const Auth = () => {

	let history = useHistory()

    const {isAuth} = useState(store)
    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    const initialValues = {
      email: "",
      password: ""
    }

    const validationSchema = Yup.object({
      email: Yup.string().email("Invalid Email Format").required("Email is required"),
      password: Yup.string().required("Password is required"),
    })

    useEffect(() => {
      const token = localStorage.getItem("token")
      if(token){
        isAuth.set(true)
        history.push("/dashboard")
      }
	  }, [])

    const onSubmit = async(value) => {
        try{
          const res = await login(value)
          if(res.status === 200){
            localStorage.setItem("token", res.data.token)
            isAuth.set(true)
            alertMessage.set("Login Successful")
            alertType.set("success")
            alertNotification.set(true)
            setTimeout(() => {
              alertNotification.set(false)
              alertMessage.set("")
              alertType.set("")
            }, 1000);
            history.push("/dashboard")
          }
          else{
            alertMessage.set("Registeration Failed")
            alertType.set("danger")
            alertNotification.set(true)
            setTimeout(() => {
              alertNotification.set(false)
              alertMessage.set("")
              alertType.set("")
            }, 1000);
          }
        }
        catch(err){
          console.log(err)
          alertMessage.set("An Error Occured")
            alertType.set("success")
            alertNotification.set(true)
            setTimeout(() => {
              alertNotification.set(false)
              alertMessage.set("")
              alertType.set("")
            }, 1000);
        }
        // console.log(cookieData)
      }

    return (
        <div className="login-page">
            <div className="form">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                isSubmitting,
                handleBlur,
                handleSubmit,
                
                /* and other goodies */
            }) => (
                <form className="login-form" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    <small className="text-danger"> {errors.email && touched.email && errors.email} </small>

                    <input 
                        type="password" 
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <small className="text-danger"> {errors.password && touched.password && errors.password} </small>
                    <button type="submit">
                    {isSubmitting ?
                    <Spinner animation="border"/>
                    :
                    "Log In"
                    }
                    </button>
                </form>
                )}
                </Formik>
            </div>
        </div>
    )
}

export default Auth
