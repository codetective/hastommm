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
    useDisclosure, Select,
} from "@chakra-ui/react"
import {FaFileAlt,} from 'react-icons/fa';
import PageTitle from '../components/Global/PageTitle';
import {Tab, Tabs} from "react-bootstrap";
import React from "react";
import ReportComponent from "../components/Farm/ReportComponent";
import Report2Component from "../components/Farm/Report2Component";

export default function Cycle() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (

        <Box pb="50px">


            <div className="d-flex flex-wrap justify-content-between align-items-center">

                <div className="farm-card col-lg-6 col-12 p-4 rounded-2 bg-white shadow-sm">
                    <div className="component d-flex flex-wrap align-items-center">
                        <FaFileAlt className="me-2 fs-1 text-warning"/>
                        <div>
                            <div className="component-header fw-bold"> Total Reports </div>
                            <div className="fw-normal fs-5">5000</div>
                        </div>

                    </div>

                </div>
                <div onClick={onOpen} className="btn btn-dark px-3 my-3">Create General Report</div>

            </div>
            <div className="farm-tab-section mt-4">
                <Tabs defaultActiveKey="reports" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="reports" title="General Records">
                        <ReportComponent />
                    </Tab>
                    <Tab eventKey="reports2" title="Targeted Reports">
                        <Report2Component />
                    </Tab>
                </Tabs>
            </div>

            <Modal  isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent className="mt-3">
                    <ModalHeader className="alert-secondary">New General Report</ModalHeader>
                    <ModalCloseButton className="btn-cls" />
                    <ModalBody className=" py-4">
                        <form>
                            <div className="mb-4">
                                <h3 className="mb-1" >Report</h3>
                                <Input type="text" placeholder="Report Title" required/>
                            </div>
                            <div className="mb-4">
                                <h3 className="mb-1" >Cycle</h3>
                                <Select placeholder="Select Cycle to send report" required>
                                    <option value="option1">Rainy Season 2021</option>
                                    <option value="option2">Dry Season 2021</option>
                                </Select>
                            </div>
                            <div className="mb-4 col-lg-12">
                                <h3 className="mb-1" >Report Activity</h3>
                                <textarea className="form-control" rows="5" placeholder="Max 200 chars" required>
                                        </textarea>
                            </div>
                            <div className="mb-4">
                                <h3 className="mb-1" >External Link</h3>
                                <Input type="text" placeholder="Media link"/>
                            </div>
                            <button type="submit" className="btn-success px-3 btn">Send Report</button>


                        </form>


                    </ModalBody>

                    <ModalFooter>


                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    );
}
