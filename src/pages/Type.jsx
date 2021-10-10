import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Input,
    ModalBody,
    ModalCloseButton,
    Divider,
    useDisclosure,
} from "@chakra-ui/react"
import PageTitle from '../components/Global/PageTitle';
import TypeComponent from "../components/Farm/TypeComponent";
import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import {FaTractor,} from "react-icons/fa";
import {getFarmType, createFarmType} from '../apiServices/farmTypeServices';
import React, {useEffect} from 'react';
import ContentLoader from '../components/ContentLoader/ContentLoader';
import {Formik} from 'formik';
import * as Yup from 'yup';
import store from '../store/store';
import { useState } from '@hookstate/core';
import {Spinner, Alert} from 'react-bootstrap';



export default function Cycle() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [farmTypes, setFarmTypes] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [contentChanged, setContentChanged] = React.useState(0)

    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getFarmType()
                setFarmTypes(res.data.data)
                console.log(res.data.data)
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

    const token = localStorage.getItem("token")

    const initialValues = {
      name: "",
      short_description: "",
      long_description: "",
      creator_id: token.split("|")[0]
    }

    const validationSchema = Yup.object({
      name: Yup.string().required("Farm Type Name is required"),
      short_description: Yup.string().required("Summary is required"),
      long_description: Yup.string().required("Description is required"),
    })

    const onSubmit = async(value) => {
        try{
            console.log(value)
          const res = await createFarmType(value)
          console.log(res)
          if(res.status === 200){
            alertMessage.set("Farm Type Created Successfully")
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
            alertMessage.set("Failed to Create Farm Type")
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
        // console.log(cookieData)
      }

    return (
        isLoading ?
        <ContentLoader />
        :
        <Box pb="50px">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="farm-header d-flex align-items-center">
                    <FaTractor className="fs-1 me-3 my-2 text-success"/>
                    <h2 className="text-muted ">Farm Type</h2>
                </div>

                <div onClick={onOpen}  className="btn btn-success my-2 px-3">Create New Type</div>
            </div>
            <Divider mb="15px" h="0.5px !important" opacity="0.1" />
            <div className="farm-wrapper farm-type-card-wrapper">

                <div className="farm-tab-section mt-0">
                    {farmTypes.map(data => (
                        <TypeComponent key={data.id} data={data} setContentChanged={setContentChanged} contentChanged={contentChanged}/>      
                    ))}
                </div>
            </div>


            <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
                <ModalOverlay />
                <ModalContent className="mt-0 rounded-0 p-md-5">
                    <ModalCloseButton className="btn-cls" />
                    <ModalBody className="py-4">
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
                            <div>
                                <ModalHeader className="px-0 mt-3 d-flex flex-wrap justify-content-between">
                                    Create Farm Type
                                    <button type="submit" className="btn-success px-3 btn">Done</button>
                                </ModalHeader>
                            </div>
                            <p className="mb-4">Note: This farm type should be well described with your proper Documents Uploaded in PDF format </p>
                            <section className="d-flex flex-wrap">
                                <div className="col-lg-6  col-12 pe-lg-5">
                                    <div className="mb-4 col-lg-12">
                                        <h3 className="mb-1" >Farm Type</h3>
                                        <Input 
                                            type="text" 
                                            placeholder="Title E.g Cashew Farm" 
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        <small className="text-danger">{errors.name && touched.name && errors.name}</small>
                                    </div>
                                    <div className="mb-3 col-lg-12">
                                        <h3 className="mb-1" >Summary</h3>
                                        <Input 
                                            type="text" 
                                            placeholder="Keep it simple"
                                            name="short_description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.short_description}
                                        />
                                        <small className="text-danger">{errors.short_description && touched.short_description && errors.short_description}</small>
                                    </div>
                                    <div className="mb-3 pt-4 col-lg-12">
                                        <h3 className="mb-1" >Detailed Description</h3>
                                        <textarea 
                                            className="form-control" 
                                            rows="3" 
                                            placeholder="Max 200 chars"
                                            name="long_description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.long_description}
                                        >
                                        </textarea>
                                        <small className="text-danger">{errors.long_description && touched.long_description && errors.long_description}</small>
                                    </div>
                                </div>

                                {/* <div className="col-lg-6  col-12 ps-lg-4">
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Default Image</h3>
                                        <input className="form-control" type="file" id="formFile" required/>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Upload a Documents in PDF Files Max 3</h3>
                                        <input className="form-control" type="file" id="formFileMultiple" required  multiple/>
                                    </div>
                                </div> */}
                            </section>
                            <button type="submit" className="btn-success px-3 btn">
                            {isSubmitting ?
                                <Spinner animation="border" size="sm"/>
                                :
                                "Create"
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
