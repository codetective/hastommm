import {Form, Row, Col, Tabs, Tab} from 'react-bootstrap';
import React, {useEffect, useState} from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    WrapItem,
    Avatar,
    ModalOverlay,
    useDisclosure, Stack, Box
} from "@chakra-ui/react";
import UserReportComponent  from "./UserReportComponent";
import {getActivePacks} from "../../apiServices/packServices";

const UserActivePackComponent  = ({id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activePacks, setActivePacks] = useState([])
    const [currentUserPackReport, setCurrentUserPackReport] = useState({})
    const [packID, setPackID] = useState(0)


    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getActivePacks(id)
                setActivePacks(res.data.data)
                console.log(res.data.data)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    },[id])

    const openModal = (data, id) => {
        setCurrentUserPackReport(data)
        setPackID(id)
        onOpen()
    }
    return (
        <div classname="tab-component-wrapper">

            <div className="mini-card  mb-4 rounded-2 w-100">
                <div className="card-name">
                    Filter
                </div>
                <div className="card-form w-100">
                    <Form className="w-100 ">
                        <Row className="w-100">
                            <Col className="my-2 col-md-6 col-lg-3 col-12">
                                <input className="form-control form-control-sm" list="datalistOptions" id="exampleDataList"
                                       placeholder="Cycle..."/>
                                <datalist id="datalistOptions">
                                    <option value="Rainy Season 2021"/>
                                    <option value="Rainy Season 2022"/>

                                </datalist>
                            </Col>

                            <Col  className="my-2 col-md-6 col-lg-4 col-12">
                                <Form.Control placeholder="Filter Date" id="date2" size="sm" type="text" onFocus={(e) => {
                                    document.getElementById("date2").type='date';
                                }}/>
                            </Col>
                            <Col className="my-2">
                                <button className="btn btn-add-outline">Apply</button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>

            <div className="table-section w-100">
                <table className="table tabx table-responsive over-h">
                    <thead>
                    <tr>

                        <th>Pack ID</th>
                        <th>Date Ordered</th>
                        <th>Ordered by</th>
                        <th>Order Details</th>
                        <th>QTY / Price</th>
                        <th>Profit</th>
                        <th>Reports</th>

                    </tr>
                    </thead>
                    <tbody>
                    {activePacks.map(data => (
                        <tr>
                            <td>{data.id}</td>
                            <td><b>15/20/2021</b></td>

                            <td>{data.buyer.name} <br/> <b>{data.buyer.email}</b><br/> {data.buyer.phone_number}</td>
                            <td>
                                <b>Farm: </b>{data.item.label} <br/>
                                <small><b>CYCLE- </b> {data.item.cycle.label}</small><br/>
                                <small><b>Type- </b> {data.item.type.name}</small><br/>
                            </td>
                            <td>
                                <small className="text-white px-3 py-2 bg-dark"><b>QTY- </b>{data.quantity}</small>
                                <small className="text-white px-3 py-2 bg-success2"><b>Price- </b>{data.capital}</small>
                            </td>

                            <td>
                                <span className="text-success"><b> # {data.profit} : yeilding</b></span>
                            </td>
                            <td>
                                <b>{data.report.title}</b> <br/>
                                <span onClick={() => openModal(data.report, data.id)} className="text-decoration-underline pointer">View all</span>
                            </td>

                        </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size={"full"} >
                <ModalOverlay />
                <ModalContent className="mt-0 rounded-0 p-md-5" backgroundColor="#fafafa">
                    <ModalCloseButton className="btn-cls" />
                    <ModalBody className="pb-4 pt-3" >
                        <div>
                            <UserReportComponent
                                report = {currentUserPackReport}
                                packID = {packID}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default UserActivePackComponent
