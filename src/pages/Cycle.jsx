import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Input,
    Textarea,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react"
import PageTitle from '../components/Global/PageTitle';
import CycleComponent from '../components/Farm/CycleComponent';
import {Tab, Tabs} from "react-bootstrap";
import {getCycle, createCycle} from '../apiServices/cycleServices';
import React, {useEffect} from 'react';
import ContentLoader from '../components/ContentLoader/ContentLoader';
import {Formik} from 'formik';
import * as Yup from 'yup';
import store from '../store/store';
import { useState } from '@hookstate/core';
import {Spinner, Alert} from 'react-bootstrap';


export default function Cycle() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cycles, setCycles] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [contentChanged, setContentChanged] = React.useState(0)


    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getCycle()
                setCycles(res.data.data)
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [contentChanged])

    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    const initialValues = {
      label: "",
      description: "",
      start_date: "",
      end_date: ""
    }

    const validationSchema = Yup.object({
      label: Yup.string().required("Cycle Name is required"),
      description: Yup.string().required("Description is required"),
      start_date: Yup.string().required("Start Date is required"),
      end_date: Yup.string().required("End Date is required"),

    })

    const onSubmit = async(value) => {
        try{
          const res = await createCycle(value)
          if(res.status === 200){
            alertMessage.set("Cycle Created")
            alertType.set("success")
            alertNotification.set(true)
            setContentChanged(contentChanged + 1)
            setTimeout(() => {
              alertNotification.set(false)
              alertMessage.set("")
              alertType.set("")
            }, 1000);
          }
          else{
            alertMessage.set("Failed to Create Cycle")
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
        isLoading ?
        <ContentLoader />
        :
        <Box pb="50px">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <PageTitle title="Manage Cycles" category={"Cycles"} />
                <div onClick={onOpen} className="btn btn-dark px-3">New Cycle</div>

            </div>
            <p className="alert alert-primary my-2">Cycles are investment windows for clients to invest, it should have a start date and end date, you can give them name tags like rainy season 2021</p>
            <div className="farm-tab-section mt-4">
                <Tabs defaultActiveKey="cycle" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="cycle" title="List of Cycles">
                        <CycleComponent data={cycles}/>
                    </Tab>
                </Tabs>
            </div>

            <Modal  isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent className="mt-3">
                    <ModalHeader className="alert-secondary">Add Cycle</ModalHeader>
                    <ModalCloseButton className="btn-cls" />
                    <ModalBody className=" py-4">
                    <Alert show={alertNotification.get()} variant={alertType.get()}>
                        <p className="alert-p"> {alertMessage.get()} </p>
                    </Alert>
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
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <h3 className="mb-1" >Cycle Name</h3>
                                <Input 
                                    type="text" 
                                    placeholder="Tag name e.g Rainy season" 
                                    name="label"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.label}
                                />
                                <small className="text-danger">{errors.label && touched.label && errors.label}</small>
                            </div>
                            <div className="mb-4">
                                <h3 className="mb-1" >Description</h3>
                                <Textarea 
                                    placeholder="Cycle Description" 
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                <small className="text-danger">{errors.description && touched.description && errors.description}</small>
                            </div>
                            <div className="d-flex flex-wrap">
                                <div className="mb-3 col-lg-6 pe-2">
                                    <h3 className="mb-1" >Start Date</h3>
                                    <Input 
                                        type="date" 
                                        name="start_date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.start_date}
                                    />
                                    <small className="text-danger">{errors.start_date && touched.start_date && errors.start_date}</small>
                                </div>

                                <div className="mb-3 col-lg-6 pe-2">
                                    <h3 className="mb-1" >End Date</h3>
                                    <Input 
                                        type="date" 
                                        name="end_date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.end_date}
                                    />
                                    <small className="text-danger">{errors.end_date && touched.end_date && errors.end_date}</small>
                                </div>

                            </div>
                            <button type="submit" className="btn-success px-3 btn">
                            {isSubmitting ?
                                <Spinner animation="border" size="sm"/>
                                :
                                "Done"
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
