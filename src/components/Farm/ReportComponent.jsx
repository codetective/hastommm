import {Form, Row, Col, Alert, Spinner} from 'react-bootstrap';
import {FaTrashAlt} from "react-icons/fa";
import React, {useEffect} from "react";
import store from '../../store/store';
import { useState } from '@hookstate/core';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Input,
    Divider,
    Select,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getCycle} from "../../apiServices/cycleServices";
import {editReport, deleteReport} from "../../apiServices/ReportServices";
const ReportComponent = ({report, contentChanged, setContentChanged}) => {

    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editData, setEditData] = React.useState({})
    const [cycles, setCycles] = React.useState([])

    const viewFarm = (item) => {
        setEditData(item)
        onOpen()
    }

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


    const initialValues = {
        title: editData.title,
        description: editData.description,
        link: editData.link,
        // cycle_id: editData.cycle && editData.cycle.id
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("Report Title is required"),
        description: Yup.string().required("Description is required"),
        link: Yup.string().required("Link is required"),
        // cycle_id: Yup.string().required("Cycle is required"),
    })

    const onSubmit = async(value) => {
        try{
            const res = await editReport(editData.id, value)
            if(res.status === 200){
                alertMessage.set(" Successfully")
                alertType.set("success")
                alertNotification.set(true)
                setContentChanged(contentChanged + 1)
                setTimeout(() => {
                    alertNotification.set(false)
                    alertMessage.set("")
                    alertType.set("")
                }, 3000);
            }
            else{
                alertMessage.set("Failed ")
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

    const deleteOneReport = async (id) => {
        try{
            const res = await deleteReport(id)
            if(res.status === 200){
                alertMessage.set("Deleted")
                alertType.set("success")
                alertNotification.set(true)
                setContentChanged(contentChanged - 1)
                setTimeout(() => {
                    alertNotification.set(false)
                    alertMessage.set("")
                    alertType.set("")
                }, 1000);
            }
            else{
                alertMessage.set("Failed to Delete")
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
        <div classname="tab-component-wrapper">

            {/*<div className="mini-card  mb-4 rounded-2 w-100">*/}
            {/*    <div className="card-name">*/}
            {/*        Filter*/}
            {/*    </div>*/}
            {/*    <div className="card-form w-100">*/}
            {/*        <Form className="w-100 ">*/}
            {/*            <Row className="w-100">*/}
            {/*                <Col className="my-2 col-md-6 col-lg-3 col-12">*/}
            {/*                    <input className="form-control form-control-sm" list="datalistOptions" id="exampleDataList"*/}
            {/*                           placeholder="Cycle..."/>*/}
            {/*                        <datalist id="datalistOptions">*/}
            {/*                            <option value="Rainy Season 2021"/>*/}
            {/*                                <option value="Rainy Season 2022"/>*/}

            {/*                        </datalist>*/}
            {/*                </Col>*/}

            {/*                <Col  className="my-2 col-md-6 col-lg-4 col-12">*/}
            {/*                    <Form.Control placeholder="Filter Date" id="date2" size="sm" type="text" onFocus={(e) => {*/}
            {/*                        document.getElementById("date2").type='date';*/}
            {/*                    }}/>*/}
            {/*                </Col>*/}
            {/*                <Col className="my-2">*/}
            {/*                    <button className="btn btn-add-outline">Apply</button>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*        </Form>*/}
            {/*    </div>*/}
            {/*</div>*/}


            <div className="table-section w-100">
                <table className="table tabx table-responsive over-h">
                    <thead>
                    <tr>
                        <th>Report ID</th>
                        <th>Date</th>
                        <th>Report</th>
                        <th>Activity</th>
                        <th>Action</th>


                    </tr>
                    </thead>
                    <tbody>
                    {report.map(data => (
                        <tr key={data.id}>
                            <td><b>
                               RPO {data.id}T
                            </b></td>
                            <td>
                                {new Date(data.created_at).toLocaleDateString([],
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}

                            </td>
                            <td>{data.title}</td>
                            <td>{data.description}</td>
                            <td className="d-flex align-items-center">
                                <span className="text-decoration-underline pointer me-3" onClick={() => viewFarm(data)}>View</span>
                                <FaTrashAlt className="pointer"  onClick={() => deleteOneReport(data.id)}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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
                            enableReinitialize={true}
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
                    </ModalBody>

                    <ModalFooter>


                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default ReportComponent
