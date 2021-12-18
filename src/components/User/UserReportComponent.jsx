import {Form, Row, Col, Tabs, Tab} from 'react-bootstrap';
import React, {useEffect} from "react";
import {
    WrapItem,
    Avatar, Accordion, AccordionButton, AccordionItem, Box, AccordionIcon, AccordionPanel, Input, Select
} from "@chakra-ui/react";
import {FaPaperclip, FaTrashAlt} from "react-icons/fa";
import store from '../../store/store';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { useState } from '@hookstate/core';
import {Spinner, Alert} from 'react-bootstrap';
import {generateReportForPack} from '../../apiServices/ReportServices';
import {getCycle} from '../../apiServices/cycleServices';
import { dateConverter } from '../../utils/Functions';


const UserReportComponent  = ({packID, report}) => {
    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    const initialValues = {
      title: "",
      description: "",
      link: "",
      pack_id: packID
    }

    const validationSchema = Yup.object({
      title: Yup.string().required("Report Title is required"),
      description: Yup.string().required("Description is required"),
      link: Yup.string().required("Link is required"),
    })

    const onSubmit = async(value) => {
        try{
          const res = await generateReportForPack(value)
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
        <div className="tab-component-wrapper">
            <div className="d-flex align-items-center flex-wrap  mb-3">
                <FaPaperclip className="fs-3 fw-bold text-warning me-2"/>
                <h1 className="fs-3 fw-bold">Reports [40]</h1>

                <Accordion className="ms-auto col-lg-8 col-12 my-3" allowMultiple>
                    <AccordionItem>
                        <h2>
                            <AccordionButton className=" alert-success pointer d-flex justify-content-between text-decoration-underline ">
                                Add New report to this Pack
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel  className="d-flex p-0 py-3 col-12" py={5}>
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
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>

            <hr/>

            <div className="mini-card mt-4  mb-4 rounded-2 w-100">
                <div className="card-name">
                    Filter
                </div>
                <div className="card-form w-100">
                    <Form className="w-100 ">
                        <Row className="w-100">

                            <Col className="my-2 col-md-6 col-lg-4 col-12">
                                <Form.Control placeholder="Filter Date" id="date2" size="sm" type="text"
                                              onFocus={(e) => {
                                                  document.getElementById("date2").type = 'date';
                                              }}/>
                            </Col>
                            <Col className="my-2">
                                <button className="btn btn-add-outline">Apply</button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>


            <div className="table-section w-100">
                <table className="table tabx table-responsive over-h">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Report</th>
                        <th>Activity</th>
                        <th>Media Link</th>
                        <th>Action</th>
{console.log(report)}
                    </tr>
                    </thead>
                    <tbody>
                    {report.length < 1 ?
                    <tr>
                        <td><b>{dateConverter(report.created_at)}</b></td>
                        <td>{report.title}</td>
                        <td>{report.description}</td>
                        <td><a href={report.link}>Link</a></td>
                        <td className="">
                            <FaTrashAlt/>
                        </td>
                    </tr>
                    :
                    report.map(data => (
                        <tr>
                            <td><b>{dateConverter(data.created_at)}</b></td>
                            <td>{data.title}</td>
                            <td>{data.description}</td>
                            <td><a href={data.link}>Link</a></td>
                            <td className="">
                                <FaTrashAlt/>
                            </td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default UserReportComponent
