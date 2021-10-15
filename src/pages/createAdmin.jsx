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
    useDisclosure, Textarea,
} from "@chakra-ui/react"
import AdminComponent from '../components/CreateAdmin/adminComponent';
import {FaUserShield, FaUserSlash} from "react-icons/fa";
import React from "react";
import {Alert, Spinner} from "react-bootstrap";
import {Formik} from "formik";
export default function CreateAdmin() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box pb="50px">

            <div className="d-flex flex-wrap align-items-center justify-content-between flex-wrap">

                <div className="farm-card me-lg-3 col-lg-auto col-12 p-4 px-lg-5 my-3 rounded-2 bg-primary shadow-sm">
                    <div className="component d-flex flex-wrap align-items-center">
                        <FaUserShield className="me-3 fs-1 text-white"/>
                        <div>
                            <div className="component-header text-white fw-bold"> Admins </div>
                            <div className="fw-normal fs-5 text-white">3</div>
                        </div>

                    </div>

                </div>

                <div onClick={onOpen} className="btn btn-dark px-3">Create Admin</div>

            </div>
            <AdminComponent />

            <Modal  isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent className="mt-3">
                    <ModalHeader className=" d-flex align-items-center alert-secondary">
                        <FaUserShield className="me-2" /> Create New Admin</ModalHeader>
                    <ModalCloseButton className="btn-cls" />
                    <ModalBody className=" py-4">

                        <Formik>
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  isSubmitting,
                                  handleBlur,
                                  handleSubmit,

                              }) => (
                                <form>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Full Name</h3>
                                        <Input
                                            type="text"
                                            placeholder="Admin name"
                                            name="label"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Email</h3>
                                        <Input
                                            type="text"
                                            placeholder="Admin Valid Email"
                                            name="label"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Phone Number</h3>
                                        <Input
                                            type="text"
                                            placeholder="Phone Number"
                                            name="label"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Address</h3>
                                        <Input
                                            type="text"
                                            placeholder="Address"
                                            name="label"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Password</h3>
                                        <Input
                                            type="text"
                                            placeholder="Input Password"
                                            name="label"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                    </div>

                                    <button type="submit" className="btn-success px-3 btn">
                                        Create Admin
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
