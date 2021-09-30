
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

const FarmComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (

        <div classname="tab-component-wrapper">
            <div className="card bg-dark text-white col-lg-5 col-md-12 col-12 shadow-sm border-0 p-4">
                <h1 className="mb-2 bold text-white">Cashew Farm</h1>
                <p>This is a description of the type of packages that you offer example is your cattle Ranching pack</p>
                <div className="mt-3 form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                    <label className="form-check-label text-muted" >Close Farm
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
                        <form>
                            <div>
                                <ModalHeader className="px-0 mt-3 d-flex flex-wrap justify-content-between">
                                    Edit
                                    <div className="btn-success px-3 btn">Done</div>
                                </ModalHeader>
                            </div>
                            <section className="d-flex flex-wrap">
                                <div className="col-lg-6  col-12 pe-lg-5">
                                    <div className="mb-4 col-lg-12">
                                        <h3 className="mb-1" >Farm Type</h3>
                                        <Input type="text" placeholder="Title E.g Cashew Farm" />
                                    </div>
                                    <div className="mb-3 col-lg-12">
                                        <h3 className="mb-1" >Summary</h3>
                                        <Input type="text" placeholder="Keep it simple" />
                                    </div>
                                    <div className="mb-3 pt-4 col-lg-12">
                                        <h3 className="mb-1" >Detailed Description</h3>
                                        <textarea className="form-control" rows="3" placeholder="Max 200 chars">
                                </textarea>
                                    </div>
                                </div>

                                <div className="col-lg-6  col-12 ps-lg-4">
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Default Image</h3>
                                        <input className="form-control" type="file" id="formFile"/>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Upload a Documents in PDF Files Max 3</h3>
                                        <input className="form-control" type="file" id="formFileMultiple"  multiple/>
                                    </div>
                                </div>
                            </section>





                        </form>


                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default FarmComponent
