
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Input,
} from "@chakra-ui/react"
import React from "react";
import {switchFarmTypeStatus, editFarmType, createFarmTypeWithDocument} from "../../apiServices/farmTypeServices";
import {Formik} from 'formik';
import * as Yup from 'yup';
import store from '../../store/store';
import { useState } from '@hookstate/core';
import {Spinner, Alert} from 'react-bootstrap';

const TypeComponent = ({data, contentChanged, setContentChanged}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toggleFarmStatus = async(id) => {
        try{
            // data.status = 0
            const res = await switchFarmTypeStatus(id)
            console.log(res)
            if(res.data.success === true){
                setContentChanged(contentChanged + 1)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    const editTypeInitialValues = {
      name: data.name,
    }

    const editTypevalidationSchema = Yup.object({
      name: Yup.string().required("Farm Type Name is required"),
    })

    const onEditTypeNameSubmit = async(value) => {
        try{
          const res = await editFarmType(data.id, value)
          if(res.status === 200){
            alertMessage.set("Farm Type Edited Successfully")
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
            alertMessage.set("Failed to Edit Farm Type")
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

        const [fileInput, setFileInput] = React.useState(null)
        const [fileInputError, setFileInputError] = React.useState(null)
        const [isFileUploading, setIsFileUploading] = React.useState(false)

        const onEditTypeDocumentSubmit = async() => {
            if(fileInput){
                setIsFileUploading(true)
                try{
                    const formData = new FormData() 
                    formData.append("name", data.name);
                    formData.append("type_id", data.id);
                    formData.append("file", fileInput, fileInput.name);
                    const res = await createFarmTypeWithDocument(formData)
                    if(res.status === 200){
                      alertMessage.set("Document Added Successfully")
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
                      alertMessage.set("Failed to Add Document")
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
                setIsFileUploading(false)
            }   
            else{
                setFileInputError("No File Selected")
            } 
        
        }

    return (

        <div classname="tab-component-wrapper">
            <div className="card type-card bg-dark text-white col-lg-6 col-md-12 col-12 shadow-sm border-0 p-4">
                <h1 className="mb-2 bold text-white">{data.name}</h1>
                <p>{data.short_description}</p>
                <div className="mt-3 form-check form-switch">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="flexSwitchCheckDefault" 
                        checked={data.status === 1 ? true : false}
                        onChange={() => toggleFarmStatus(data.id)}
                    />
                    <label className="form-check-label text-muted" >{data.status === 1 ? "Close Farm" : "Open Farm"}
                    </label>
                </div>

                <div className="mt-3 d-flex flex-wrap justify-content-between align-items-center">
                    <div>
                        <span  onClick={onOpen}  className="btn btn-sm btn-success pointer">View / Edit</span>
                    </div>
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
                            <div>
                                <ModalHeader className="px-0 mt-3 d-flex flex-wrap justify-content-between">
                                    Edit
                                    <div className="btn-success px-3 btn" onClick={onClose}>Done</div>
                                </ModalHeader>
                            </div>
                            <section className="d-flex flex-wrap">
                                <div className="col-lg-6  col-12 pe-lg-5">
                                <Formik
                                    initialValues={editTypeInitialValues}
                                    onSubmit={onEditTypeNameSubmit}
                                    validationSchema={editTypevalidationSchema}
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
                                        <button type="submit" className="btn-success px-3 btn mt-2">
                                        {isSubmitting ?
                                            <Spinner animation="border" size="sm"/>
                                            :
                                            "Save"
                                            }
                                        </button>
                                    </div>
                                    </form>
                                    )}
                                    </Formik>
                                    {/* <div className="mb-3 col-lg-12">
                                        <h3 className="mb-1" >Summary</h3>
                                        <Input type="text" placeholder="Keep it simple" />
                                    </div>
                                    <div className="mb-3 pt-4 col-lg-12">
                                        <h3 className="mb-1" >Detailed Description</h3>
                                        <textarea className="form-control" rows="3" placeholder="Max 200 chars">
                                        </textarea>
                                    </div> */}
                                </div>

                                <div className="col-lg-6  col-12 ps-lg-4">
                                    {/* <div className="mb-4">
                                        <h3 className="mb-1" >Default Image</h3>
                                        <input className="form-control" type="file" id="formFile"/>
                                    </div> */}
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Upload a Documents in PDF Files Max 3</h3>
                                        <input 
                                            className="form-control" 
                                            type="file" id="formFileMultiple"
                                            filename={fileInput && fileInput.name}
                                            onChange={(e) => setFileInput(e.target.files[0])}
                                        />
                                        <small className="text-danger">{fileInputError}</small>
                                        <button type="submit" className="btn-success px-3 btn mt-2" onClick={onEditTypeDocumentSubmit}>
                                        {isFileUploading ?
                                            <Spinner animation="border" size="sm"/>
                                            :
                                            "Save"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </section>
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default TypeComponent
