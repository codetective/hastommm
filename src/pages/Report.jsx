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
    useDisclosure, Select,
} from "@chakra-ui/react"
import {FaFileAlt,} from 'react-icons/fa';
import PageTitle from '../components/Global/PageTitle';
import {Tab, Tabs} from "react-bootstrap";
import React, {useEffect} from "react";
import ReportComponent from "../components/Farm/ReportComponent";
import Report2Component from "../components/Farm/Report2Component";
import ContentLoader from '../components/ContentLoader/ContentLoader';
import {Formik} from 'formik';
import * as Yup from 'yup';
import store from '../store/store';
import { useState } from '@hookstate/core';
import {Spinner, Alert} from 'react-bootstrap';
import {generateReportForCycle, getAllReports} from '../apiServices/ReportServices';
import {getCycle} from '../apiServices/cycleServices';


export default function Cycle() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cycles, setCycles] = React.useState([])
    const [totalReports, setTotalReports] = React.useState(0)
    const [generalReports, setGeneralReports] = React.useState([])



    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getCycle()
                setCycles(res.data.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getAllReports()
                setTotalReports(res.data.meta.total)
                setGeneralReports(res.data.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [])

    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    const initialValues = {
      title: "",
      description: "",
      link: "",
      cycle_id: ""
    }

    const validationSchema = Yup.object({
      title: Yup.string().required("Report Title is required"),
      description: Yup.string().required("Description is required"),
      link: Yup.string().required("Link is required"),
      cycle_id: Yup.string().required("Cycle is required"),
    })

    const onSubmit = async(value) => {
        try{
          const res = await generateReportForCycle(value)
          if(res.status === 200){
            alertMessage.set("Report Generated")
            alertType.set("success")
            alertNotification.set(true)
            setTimeout(() => {
              alertNotification.set(false)
              alertMessage.set("")
              alertType.set("")
            }, 1000);
          }
          else{
            alertMessage.set("Failed to Generate Report")
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

        <Box pb="50px">

            <div className="d-flex flex-wrap justify-content-between align-items-center">

                <div className="farm-card col-lg-6 col-12 p-4 rounded-2 bg-white shadow-sm">
                    <div className="component d-flex flex-wrap align-items-center">
                        <FaFileAlt className="me-2 fs-1 text-warning"/>
                        <div>
                            <div className="component-header fw-bold"> Total Reports </div>
                            <div className="fw-normal fs-5">{totalReports}</div>
                        </div>

                    </div>

                </div>
                <div onClick={onOpen} className="btn btn-dark px-3 my-3">Create General Report</div>

            </div>
            <div className="farm-tab-section mt-4">
                <Tabs defaultActiveKey="reports" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="reports" title="All Reports">
                        <ReportComponent 
                            report={generalReports}
                        />
                    </Tab>
                    {/*<Tab eventKey="reports2" title="Targeted Reports">*/}
                    {/*    <Report2Component />*/}
                    {/*</Tab>*/}
                </Tabs>
            </div>

            <Modal  isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent className="mt-3">
                    <ModalHeader className="alert-secondary">New General Report</ModalHeader>
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
                                <h3 className="mb-1" >Report</h3>
                                <Input 
                                    type="text" 
                                    placeholder="Report Title"
                                    name="title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title} 
                                />
                                <small className="text-danger">{errors.title && touched.title && errors.title}</small>
                            </div>
                            <div className="mb-4">
                                <h3 className="mb-1" >Cycle</h3>
                                <Select 
                                    placeholder="--Select Cycle to send report--"
                                    name="cycle_id"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.cycle_id}
                                >
                                    {cycles.map(data => (
                                        <option value={data.id} key={data.id}>{data.label}</option>
                                    ))}
                                </Select>
                                <small className="text-danger">{errors.cycle_id && touched.cycle_id && errors.cycle_id}</small>
                            </div>
                            <div className="mb-4 col-lg-12">
                                <h3 className="mb-1" >Report Activity</h3>
                                <textarea 
                                    className="form-control" 
                                    rows="5" 
                                    placeholder="Max 200 chars" 
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                >
                                </textarea>
                                <small className="text-danger">{errors.description && touched.description && errors.description}</small>
                            </div>
                            <div className="mb-4">
                                <h3 className="mb-1" >External Link</h3>
                                <Input 
                                    type="text" 
                                    placeholder="Media link"
                                    name="link"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.link}
                                />
                                <small className="text-danger">{errors.link && touched.link && errors.link}</small>
                            </div>
                            <button type="submit" className="btn-success px-3 btn">
                            {isSubmitting ?
                                <Spinner animation="border" size="sm"/>
                                :
                                "Send Report"
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
