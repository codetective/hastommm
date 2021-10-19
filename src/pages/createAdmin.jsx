import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Input,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Textarea,
} from "@chakra-ui/react"
import AdminComponent from '../components/CreateAdmin/adminComponent';
import {FaUserShield, FaUserSlash} from "react-icons/fa";
import React from "react";
import {Alert, Spinner} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import store from '../store/store';
import { useState } from '@hookstate/core';
import {createAdmin} from '../apiServices/authServices';



export default function CreateAdmin() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [passwordError, setPasswordError] = React.useState("")

    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    const initialValues = {
      name: "",
      location: "",
      phone_number: "",
      password: "",
      passwordConfirmation: "",
      email: "",
    }

    const validationSchema = Yup.object({
      name: Yup.string().required("Admin Name is required"),
      location: Yup.string().required("Address is required"),
      phone_number: Yup.string().required("Phone Number is required"),
      password: Yup.string().required("Password is required"),
      passwordConfirmation: Yup.string().required("Password Confirmation is required"),
      email: Yup.string().email().required("Email is required"),
    })

    const onSubmit = async(value) => {
        try{
        if(value.password === value.passwordConfirmation){
          const res = await createAdmin(value)
          if(res.status === 200){
            alertMessage.set("Admin Created")
            alertType.set("success")
            alertNotification.set(true)
            // setContentChanged(contentChanged + 1)
            setTimeout(() => {
              alertNotification.set(false)
              alertMessage.set("")
              alertType.set("")
            }, 1000);
          }
          else{
            alertMessage.set("Failed to Create Admin")
            alertType.set("danger")
            alertNotification.set(true)
            setTimeout(() => {
              alertNotification.set(false)
              alertMessage.set("")
              alertType.set("")
            }, 1000);
          }
        }
        else{
            setPasswordError("Password Does not match")
        }
        }
        catch(err){
          console.log(err)
          alertMessage.set("An Error Occured")
            alertType.set("danger")
            alertNotification.set(true)
            setTimeout(() => {
              alertNotification.set(false)
              alertMessage.set("")
              alertType.set("")
            }, 1000);
        }
      }
    return (
        <Box pb="50px">

            <div className="d-flex flex-wrap align-items-center justify-content-between flex-wrap">

                <div className="farm-card me-lg-3 col-lg-auto col-12 p-4 px-lg-5 my-3 rounded-2 bg-primary shadow-sm">
                    <div className="component d-flex flex-wrap align-items-center">
                        <FaUserShield className="me-3 fs-1 text-white"/>
                        <div>
                            <div className="component-header text-white fw-bold"> Admins </div>
                            <div className="fw-normal fs-5 text-white">3</div>
                        </div>

                    </div>

                </div>

                <div onClick={onOpen} className="btn btn-dark px-3">Create Admin</div>

            </div>
            <AdminComponent />

            <Modal  isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent className="mt-3">
                    <ModalHeader className=" d-flex align-items-center alert-secondary">
                        <FaUserShield className="me-2" /> Create New Admin</ModalHeader>
                    <ModalCloseButton className="btn-cls" />
                    <ModalBody className=" py-4">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  isSubmitting,
                                  handleBlur,
                                  handleSubmit,

                              }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Full Name</h3>
                                        <Input
                                            type="text"
                                            placeholder="Admin name"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name} 
                                        />
                                        <small className="text-danger">{errors.name && touched.name && errors.name}</small>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Email</h3>
                                        <Input
                                            type="text"
                                            placeholder="Admin Valid Email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email} 
                                        />
                                        <small className="text-danger">{errors.email && touched.email && errors.email}</small>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Phone Number</h3>
                                        <Input
                                            type="text"
                                            placeholder="Phone Number"
                                            name="phone_number"
                                            onChange={handleChange}
                                            value={values.phone_number} 
                                        />
                                        <small className="text-danger">{errors.phone_number && touched.phone_number && errors.phone_number}</small>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Address</h3>
                                        <Input
                                            type="text"
                                            placeholder="Address"
                                            name="location"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.location} 
                                        />
                                        <small className="text-danger">{errors.location && touched.location && errors.location}</small>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Password</h3>
                                        <Input
                                            type="password"
                                            placeholder="Input Password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password} 
                                        />
                                        <small className="text-danger">{errors.password && touched.password && errors.password}</small>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Password</h3>
                                        <Input
                                            type="password"
                                            placeholder="Input Password"
                                            name="passwordConfirmation"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.passwordConfirmation} 
                                        />
                                        <small className="text-danger">{passwordError}{errors.passwordConfirmation && touched.passwordConfirmation && errors.passwordConfirmation}</small>
                                    </div>
                                    <button type="submit" className="btn-success px-3 btn">
                                            {isSubmitting ?
                                        <Spinner animation="border" size="sm"/>
                                        :
                                        "Create Admin"
                                        }
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    );
}
