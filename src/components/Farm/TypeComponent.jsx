
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image,
    useDisclosure, Input, Avatar, Divider,
} from "@chakra-ui/react"
import React from "react";
import {FaFilePdf, FaTractor, FaTrashAlt,} from "react-icons/fa";
import {switchFarmTypeStatus, editFarmType, createFarmTypeWithDocument, updateFarmTypeImage} from "../../apiServices/farmTypeServices";
import {Formik} from 'formik';
import * as Yup from 'yup';
import store from '../../store/store';
import { useState } from '@hookstate/core';
import {Spinner, Alert} from 'react-bootstrap';

const TypeComponent = ({data, contentChanged, setContentChanged}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toggleFarmStatus = async(id, status) => {
        try{
            let res
            if(status === null || status === 0){
                res = await switchFarmTypeStatus(id, 1)
                console.log(res)
            }
            else{
                res = await switchFarmTypeStatus(id, 0)
                console.log(res)
            }
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

        const [imageInput, setImageInput] = React.useState(null)
        const [imageInputError, setImageInputError] = React.useState(null)
        const [isImageUploading, setIsImageUploading] = React.useState(false)

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

        const onEditTypeImageSubmit = async() => {
            if(fileInput){
                setIsImageUploading(true)
                try{
                    const formData = new FormData() 
                    formData.append("name", data.name);
                    formData.append("type_id", data.id);
                    formData.append("file", imageInput, imageInput.name);
                    const res = await updateFarmTypeImage(data.id, formData)
                    if(res.status === 200){
                      alertMessage.set("Image Added Successfully")
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
                      alertMessage.set("Failed to Add Image")
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
                setIsImageUploading(false)
            }   
            else{
                setFileInputError("No File Selected")
            } 
        
        }
    return (

        <div className="col-xl-6 col-md-12 col-12  px-lg-3 ">
            <div className="d-md-flex rounded-2 bg-dark shadow-sm border-0 text-white  p-4 my-3">
                <Image
                    boxSize='150px'
                    className="mb-4 mb-md-0 rounded-3"
                    objectFit='cover'
                    src={'https://farmlandnigeria.com/storage/' + data.image}
                    alt='Dan Abramov'
                />
                <div className="d-flex flex-column w-100 ms-md-3 ms-xl-4">
                    <span className="d-md-flex flex-column justify-content-between flex-wrap mb-2">
                        <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        checked={data.status === 1 ? true : false}
                        onChange={() => toggleFarmStatus(data.id, data.status)}
                    />
                    <label className="form-check-label text-muted" >{data.status === 1 ? "Farm Opened" : "Farm Closed"}
                    </label>
                </div>
                        <div className="d-flex mt-2 align-items-center">
                        <span className="">
                            <h1 className="mb-1 bold text-white">{data.name}</h1>
                        </span>

                    </div>
                    </span>

                    <Divider className="mb-2 hr" opacity="0.1"/>

                    <p className="mb-2">{data.short_description}</p>

                    <div className=" d-flex w-100 flex-wrap justify-content-end align-items-center">
                            <span  onClick={onOpen}  className="btn w-100 btn-sm btn-success pointer">View / Edit</span>
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
                                    <div className="mb-3 col-lg-12">
                                        <h3 className="mb-1" >Summary</h3>
                                        <Input type="text" placeholder="Keep it simple" />
                                    </div>
                                    <div className="mb-3 pt-4 col-lg-12">
                                        <h3 className="mb-1" >Detailed Description</h3>
                                        <textarea className="form-control" rows="10" placeholder="Max 200 chars">
                                        </textarea>
                                    </div>
                                </div>

                                <div className="col-lg-6  col-12 ps-lg-4">
                                    <div className="mb-4">
                                        <Image
                                            boxSize='150px'
                                            className="mb-4 border rounded-3"
                                            objectFit='cover'
                                            src={'https://farmlandnigeria.com/storage/' + data.image}
                                            alt='Dan Abramov'
                                        />
                                        <h3 className="mb-1" >Default Image</h3>
                                        <input
                                            className="form-control" 
                                            type="file" 
                                            id="formFile"
                                            filename={imageInput && imageInput.name}
                                            onChange={(e) => setImageInput(e.target.files[0])}
                                        />
                                        <button type="submit" className="btn-success px-3 btn mt-2" onClick={onEditTypeImageSubmit}>
                                        {isImageUploading ?
                                            <Spinner animation="border" size="sm"/>
                                            :
                                            "Save"
                                            }
                                        </button>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Upload a <b>3</b> Documents only in PDF and Docx Files Max size 1mb </h3>
                                        <input 
                                            className="form-control" 
                                            type="file" id="formFileMultiple"
                                            filename={fileInput && fileInput.name}
                                            onChange={(e) => setFileInput(e.target.files[0])}
                                        />
                                        <small className="text-danger">{fileInputError}</small><br/>
                                        <button type="submit" className="btn-success px-3 btn mt-2" onClick={onEditTypeDocumentSubmit}>
                                        {isFileUploading ?
                                            <Spinner animation="border" size="sm"/>
                                            :
                                            "Save"
                                            }
                                        </button>
                                        <div className="mt-4">
                                            <h6 className="mb-2 rounded-3 text-decoration-underline">Documents</h6>
                                            <div className="d-flex flex-wrap">
                                                <a className="rounded-2 mb-2 me-2 col-auto d-flex align-items-center btn btn-dark text-white" >
                                                    <FaFilePdf className="fs-2 text-white me-2 "/>
                                                    <a  href={'https://farmlandnigeria.com/storage/' + data.documents[0].path }>
                                                        {data.documents[0].path}
                                                    </a>

                                                    <a href="delete" className="bg-danger p-1 ms-4">
                                                        <FaTrashAlt  />
                                                    </a>

                                                </a>

                                            </div>


                                        </div>



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
