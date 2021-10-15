import {
    Box,
} from "@chakra-ui/react"
import UserComponent from '../components/User/UserComponent';
import { FaUserAlt} from "react-icons/fa";
import React from "react";
export default function Cycle() {
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


            </div>
            <UserComponent />

        </Box>
    );
}
