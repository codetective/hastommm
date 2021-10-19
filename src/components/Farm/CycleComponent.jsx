import {Form, Row, Col} from 'react-bootstrap';
import {FaTrashAlt} from "react-icons/fa";
import React from "react";
import {
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
} from "@chakra-ui/react";
import {Formik} from 'formik';
import * as Yup from 'yup';
import store from '../../store/store';
import { useState } from '@hookstate/core';
import {Spinner, Alert} from 'react-bootstrap';
import { editCycle, deleteCycle } from '../../apiServices/cycleServices';


const CycleComponent = ({data, contentChanged, setContentChanged}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editData, setEditData] = React.useState({})
    
    const viewCycle = (item) => {
        setEditData(item)
        onOpen()
    }

    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    const initialValues = {
      label: editData.label,
      description: editData.description,
      start_date: editData.start_date,
      end_date: editData.end_date
    }

    const validationSchema = Yup.object({
      label: Yup.string().required("Cycle Name is required"),
      description: Yup.string().required("Description is required"),
      start_date: Yup.string().required("Start Date is required"),
      end_date: Yup.string().required("End Date is required"),

    })

    const deleteCycleObject = async (id) => {
        try{
          const res = await deleteCycle(id)
          if(res.status === 200){
            alertMessage.set("Cycle Deleted")
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
            alertMessage.set("Failed to Delete Cycle")
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

    const onSubmit = async(value) => {
        try{
          const res = await editCycle(editData.id, value)
          if(res.status === 200){
            alertMessage.set("Cycle Edited")
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
            alertMessage.set("Failed to Edit Cycle")
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

            <div className="mini-card  mb-4 rounded-2 w-100">
                <div className="card-name">
                    Filter
                </div>
                <div className="card-form w-100">
                    <Form className="w-100 ">
                        <Row className="w-100">
                            <Col className="my-2 col-md-6 col-lg-3 col-12">
                                <input className="form-control form-control-sm" list="datalistOptions" id="exampleDataList"
                                       placeholder="Cycle..."/>
                                <datalist id="datalistOptions">
                                    <option value="Rainy Season 2021"/>
                                    <option value="Rainy Season 2022"/>

                                </datalist>
                            </Col>

                            <Col  className="my-2 col-md-6 col-lg-4 col-12">
                                <Form.Control placeholder="Select Start Date" id="date2" size="sm" type="text" onFocus={(e) => {
                                    document.getElementById("date2").type='date';
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
                        <th>ID</th>
                        <th>Cycle Name</th>
                        <th>Start Date</th>
                        <th>End date</th>
                        <th>Action</th>


                    </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td><b>{index + 1}</b></td>
                                <td>{item.label}</td>
                                <td>{item.start_date}</td>
                                <td>{item.end_date}</td>
                                <td className="d-flex align-items-center">
                                    <span 
                                        className="text-decoration-underline pointer me-3"
                                        onClick={() => viewCycle(item)}
                                    >
                                        View
                                    </span>
                                    <span className="pointer" onClick={() => deleteCycleObject(item.id)}>
                                        <FaTrashAlt />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal  isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent className="mt-3">
                    <ModalHeader className="alert-secondary">View/Edit Cycle</ModalHeader>
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

        </div>
    )
}

export default CycleComponent
