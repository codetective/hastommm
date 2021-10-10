import {Tabs, Tab} from 'react-bootstrap';
import FarmComponent from '../components/Farm/FarmComponent';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Input,
    ModalBody,
    ModalCloseButton,
    Select,
    Divider,
    useDisclosure,
} from "@chakra-ui/react";
import {getFarmType} from '../apiServices/farmTypeServices';
import {getCycle} from '../apiServices/cycleServices';
import {getFarm, createFarm} from '../apiServices/farmServices';
import React, {useEffect} from 'react';
import ContentLoader from '../components/ContentLoader/ContentLoader';
import {Formik} from 'formik';
import * as Yup from 'yup';
import store from '../store/store';
import { useState } from '@hookstate/core';
import {Spinner, Alert} from 'react-bootstrap';

const Farms = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [farms, setFarms] = React.useState([])
    const [farmTypes, setFarmTypes] = React.useState([])
    const [cycles, setCycles] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [contentChanged, setContentChanged] = React.useState(0)


    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getFarm()
                setFarms(res.data.data)
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    },[contentChanged])

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

    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    const initialValues = {
      label: "",
      description: "",
      amount: "",
      max: "",
      cycle_id: "",
      item_type_id: ""
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
          const res = await createFarm(value)
          if(res.status === 200){
            alertMessage.set("Farm Created")
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
            alertMessage.set("Failed to Create Farm")
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
        <div className="farm-wrapper">

            <div className="d-flex flex-column">
                <div className="farm-header">
                    <h2 className="text-muted ">Farms</h2>
                </div>
                <div className="farm-cards flex-wrap justify-content-between d-flex align-items-center mt-0">
                    <div className="farm-card bg-success2">
                        <div className="component">
                            <div className="component-header text-white"> Total Farms </div>
                            <div className="component-qty text-white">{farms.length}</div>
                        </div>

                    </div>
                    <div onClick={onOpen}  className="btn btn-dark px-4 my-3">Create New Farm</div>

                </div>
            </div>

            <div className="farm-tab-section">
                <Tabs defaultActiveKey="farms" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="farms" title="Farms">
                        <FarmComponent data={farms} contentChanged={contentChanged} setContentChanged={setContentChanged}/>
                    </Tab>
                </Tabs>
            </div>

            <Modal  isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent className="mt-3">
                    <ModalHeader className="alert-secondary">Create Farm</ModalHeader>
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
                                    placeholder="Farm Type"
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
                                    placeholder="Cycle"
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
                                "Create Farm"
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

export default Farms
