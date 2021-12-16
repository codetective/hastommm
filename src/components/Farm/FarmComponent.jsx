import {Form, Row, Col} from 'react-bootstrap';
import {getCycle} from '../../apiServices/cycleServices';
import {getFarmType} from '../../apiServices/farmTypeServices';
import {deleteFarm} from '../../apiServices/farmServices';
import React, {useEffect} from 'react';
import store from '../../store/store';
import { useState } from '@hookstate/core';
import {FaTrashAlt} from "react-icons/fa";
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
import {Spinner, Alert} from 'react-bootstrap';
import { editFarm } from '../../apiServices/farmServices';


// import {Select} from "@chakra-ui/react";

const FarmComponent = ({data, setContentChanged, contentChanged}) => {
    const [cycles, setCycles] = React.useState([]);
    const [farmTypes, setFarmTypes] = React.useState([])

    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editData, setEditData] = React.useState({})
    
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
    }
    ,[])

    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getFarmType()
                setFarmTypes(res.data.data)
            }
            catch(err){
                console.log(err)
            }
        } 
        fetch()
    }
    ,[])

    const onDelete = async(id) => {
        try{
            const res = await deleteFarm(id)
            if(res.status === 200){
              alertMessage.set("Farm Deleted")
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
              alertMessage.set("Failed to Delete Farm")
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

    const initialValues = {
      label: editData.label,
      description: editData.description,
      amount: editData.amount,
      max: editData.max,
      cycle_id: editData.cycle && editData.cycle.id,
      item_type_id: editData.type && editData.type.id
    }

    const validationSchema = Yup.object({
      label: Yup.string().required("Cycle Name is required"),
      description: Yup.string().required("Description is required"),
      amount: Yup.string().required("Unit Price is required"),
      max: Yup.string().required("Maximum Unit is Required is required"),
      cycle_id: Yup.string().required("Cycle is required"),
      item_type_id: Yup.string().required("Farm Type is required"),
    })

    const onSubmit = async(value) => {
        try{
          const res = await editFarm(editData.id, value)
          if(res.status === 200){
            alertMessage.set("Farm Edited Successfully")
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
            alertMessage.set("Failed to Edit Farm")
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
            {/*                    <select className="form-select form-select-sm" placeholder="Select">*/}
            {/*                        <option selected>Select farm type</option>*/}
            {/*                        {farmTypes.map(data => (*/}
            {/*                        <option value={data.id} key={data.id}>{data.name}</option>*/}
            {/*                        ))}*/}
            {/*                    </select>*/}
            {/*//                 </Col>*/}
            {/*//                 <Col  className="my-2 col-md-6 col-lg-3 col-12" >*/}
            {/*                    <input className="form-control form-control-sm" list="datalistOptions" id="exampleDataList"*/}
            {/*                           placeholder="Cycle..."/>*/}
            {/*                    <datalist id="datalistOptions">*/}
            {/*                        {cycles.map(data => (*/}
            {/*                        <option value={data.label} key={data.id} />*/}
            {/*                        ))}*/}
            {/*                    </datalist>*/}
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
                            <th>ID</th>
                            <th>Farm Name</th>
                            <th>Description of Farm</th>
                            <th>Max unit amount</th>
                            <th>Farm Unit Price</th>
                            <th>Farm Type</th>
                            <th>Cycle</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td><b>{index + 1}</b></td>
                                <td>{item.label}</td>
                                <td className="descr">{item.description}</td>
                                <td>{item.max}</td>
                                <td className="text-success fw-bold">{item.amount}</td>
                                <td className="alert alert-primary">{item.type.name}</td>
                                <td>{item.cycle && item.cycle.label}</td>
                                <td className="d-flex align-items-center">
                                    <span className="text-decoration-underline pointer me-3" onClick={() => viewFarm(item)}>View</span>
                                    <FaTrashAlt onClick={() => onDelete(item.id)} className="pointer"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal  isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent className="mt-3">
                    <ModalHeader className="alert-secondary">View/Edit Farm</ModalHeader>
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
                                <h3 className="mb-1" >Title</h3>
                                <Input 
                                    type="text" 
                                    placeholder="Farm name"
                                    name="label"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.label}
                                />
                                <small className="text-danger">{errors.label && touched.label && errors.label}</small>
                            </div>
                            <div className="mb-3">
                                <h3 className="mb-1" >Description</h3>
                                <Input 
                                    type="text" 
                                    placeholder="Description" 
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                <small className="text-danger">{errors.description && touched.description && errors.description}</small>
                            </div>
                            <Divider my="35px" h="0.5px !important" opacity="0.2" />
                            <div className="mb-3">
                                <h3 className="mb-1" >Farm Type</h3>
                                <Select 
                                    placeholder="--Select Farm Type--"
                                    name="item_type_id"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.item_type_id}
                                >
                                    {farmTypes.map(data => (
                                        <option value={data.id} key={data.id}>{data.name}</option>
                                    ))}
                                </Select>
                                <small className="text-danger">{errors.item_type_id && touched.item_type_id && errors.item_type_id}</small>
                            </div>
                            <div className="mb-3">
                                <h3 className="mb-1" >Cycle</h3>
                                <Select
                                    placeholder="--Select Cycle--"
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
                            <Divider my="35px" h="0.5px !important" opacity="0.2" />
                            <div className="d-flex">
                                <div className="mb-3 pe-4 col-md-6">
                                    <h3 className="mb-1" >Total Units</h3>
                                    <Input 
                                        type="number" 
                                        placeholder="Max Units available"
                                        name="max"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.max} 
                                    />
                                    <small className="text-danger">{errors.max && touched.max && errors.max}</small>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <h3 className="mb-1" >Unit Price</h3>
                                    <Input 
                                        type="number" 
                                        placeholder="Amount"
                                        name="amount"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.amount} 
                                    />
                                    <small className="text-danger">{errors.amount && touched.amount && errors.amount}</small>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn-success px-3 w-100 mt-3 btn"
                            >
                                {isSubmitting ?
                                <Spinner animation="border" size="sm"/>
                                :
                                "Edit Farm"
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

export default FarmComponent
