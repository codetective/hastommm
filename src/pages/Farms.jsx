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
    const [isLoading, setIsLoading] = React.useState(true)

    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getFarm()
                setFarms(res.data.data)
                setIsLoading(false)
                console.log(res)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    },
    [])
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
                        <FarmComponent data={farms}/>
                    </Tab>
                </Tabs>
            </div>
            
            <Modal  isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent className="mt-3">
                    <ModalHeader className="alert-secondary">Create Farm</ModalHeader>
                    <ModalCloseButton className="btn-cls" />
                    <ModalBody className=" py-4">
                        <form>
                            <div className="mb-4">
                                <h3 className="mb-1" >Title</h3>
                                <Input type="text" placeholder="Farm name" required />
                            </div>
                            <div className="mb-3">
                                <h3 className="mb-1" >Description</h3>
                                <Input type="text" placeholder="Description" required />
                            </div>
                            <Divider my="35px" h="0.5px !important" opacity="0.2" />
                            <div className="mb-3">
                                <h3 className="mb-1" >Farm Type</h3>
                                <Select placeholder="Select" required>
                                    <option value="option1">Cashew</option>
                                    <option value="option2">Cattle</option>

                                </Select>
                            </div>
                            <div className="mb-3">
                                <h3 className="mb-1" >Cycle</h3>
                                <Select placeholder="Select" required>
                                    <option value="option1">Rainy Season 2021</option>
                                    <option value="option2">Dry Season 2021</option>
                                </Select>
                            </div>
                            <Divider my="35px" h="0.5px !important" opacity="0.2" />
                            <div className="d-flex">
                                <div className="mb-3 pe-4 col-md-6">
                                    <h3 className="mb-1" >Total Units</h3>
                                    <Input type="number" placeholder="Max Units available" required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <h3 className="mb-1" >Unit Price</h3>
                                    <Input type="number" placeholder="Amount" required/>
                                </div>
                            </div>

                            <button type="submit" className="btn-success px-3 w-100 mt-3 btn">Create Farm</button>



                        </form>


                    </ModalBody>

                    <ModalFooter>


                    </ModalFooter>
                </ModalContent>
            </Modal>


        </div>
    )
}

export default Farms
