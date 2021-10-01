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
    useDisclosure,
} from "@chakra-ui/react"
import UserComponent from '../components/User/UserComponent';
import {Tab, Tabs} from "react-bootstrap";
import {FaRegUser, FaUserAlt, FaUsers, FaUserSlash} from "react-icons/fa";
import React from "react";
import {GiGroundSprout} from "react-icons/gi";
export default function Cycle() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (

        <Box pb="50px">


            <div className="d-flex flex-wrap align-items-center">

                <div className="farm-card me-lg-3 col-lg-auto col-12 p-4 px-lg-5 my-3 rounded-2 bg-success shadow-sm">
                    <div className="component d-flex flex-wrap align-items-center">
                        <FaUserAlt className="me-3 fs-1 text-white"/>
                        <div>
                            <div className="component-header text-white fw-bold"> Total Users </div>
                            <div className="fw-normal fs-5 text-white">321</div>
                        </div>

                    </div>

                </div>
                <div className="farm-card me-lg-3 col-lg-auto col-12 px-lg-5  p-4 my-3  rounded-2 bg-white shadow-sm">
                    <div className="component d-flex flex-wrap align-items-center">
                        <GiGroundSprout className="me-3 fs-1 text-warning"/>

                        <div>
                            <div className="component-header fw-bold"> Total Packs </div>
                            <div className="fw-normal fs-5">43</div>
                        </div>

                    </div>

                </div>

            </div>
            <UserComponent />

        </Box>
    );
}
