import {Form, Row, Col, Alert, Spinner, Tab, Tabs} from 'react-bootstrap';
import {
    Box,
    Container,
    Stack,
    Text,
    Button,
    SimpleGrid,
    Flex,
    Input, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    WrapItem,
    Avatar,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import StatsPanel from './StatsPanel';
import React, {useState, useEffect} from "react";
import src from '../../assets/farm.jpg';
import UserActivePackComponent from "../User/UserActivePackComponent";
import UserPendingPackComponent from "../User/UserPendingPackComponent";
import {FaBackspace} from "react-icons/all";
import { getAllUsers } from '../../apiServices/userServices';

const UserComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = useState([])
    const [userDetail, setUserDetail] = useState({})

    useEffect(() => {
        const fetch = async() => {
          try{
            const res = await getAllUsers()
            setUser(res.data.data)
          }
          catch(err){
            console.log(err)
          }
        }
        fetch()
      }, [])

      const viewUserDetail = (detail) => {
        setUserDetail(detail)
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
                                       placeholder="User Name.."/>
                                    <datalist id="datalistOptions">
                                        <option value="James"/>
                                            <option value="Peace"/>

                                    </datalist>
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
                        <th>S/N</th>
                        <th>User</th>
                        <th>Phone</th>
                        <th>Total Packs</th>
                        <th>Pending Packs</th>
                        <th>Action</th>


                    </tr>
                    </thead>
                    <tbody>
                    {user.map((data, index) => (
                    <tr key={data.id}>
                        <td><b>{index + 1}</b></td>
                        <td><b> {data.name}</b> <br/> {data.email}</td>
                        <td><b>{data.phone_number ? data.phone_number : "-"}</b></td>
                        <td className="text-success"><b>-</b></td>
                        <td className="text-danger"><b>-</b></td>
                        <td><span onClick={() => viewUserDetail(data)} className="btn btn-dark btn-sm">View</span></td>

                    </tr>
                    ))}
                    
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size={"full"} >
                <ModalOverlay />
                <ModalContent className="mt-0 rounded-0 pt-3 px-md-5" backgroundColor="#fafafa">
                    <div className="d-flex justify-content-end ">
                        <span onClick={onClose} className="d-flex align-items-center btn btn-dark me-3"> <FaBackspace className="me-2"/> Back</span>
                    </div>
                    {/*<ModalCloseButton className="btn-cls" />*/}
                    <ModalBody className="pb-4" >
                        <div>
                            <ModalHeader className="px-0 mt-3 d-flex flex-wrap ">
                                <WrapItem className="d-flex align-items-center">
                                    <Avatar
                                        size="md"
                                        bg="whatsapp.500"
                                        name="Omolola Daniel"
                                        me="2"
                                        color="white"
                                        border="2px solid #fafafa"
                                    />
                                    {userDetail.name}
                                </WrapItem>

                            </ModalHeader>
                        </div>
                        <section className="d-flex flex-wrap">
                            <div className="col-12">
                                <Stack>
                                    <StatsPanel 
                                        email={userDetail.email}
                                        location={userDetail.location}
                                        phone={userDetail.phone_number}
                                    />
                                </Stack>
                            </div>

                        </section>
                        <Box className="">
                            <div className="farm-tab-section">
                            <Tabs defaultActiveKey="pack" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="pack" title="Active Packs">
                                    <UserActivePackComponent/>

                                </Tab>

                                <Tab eventKey="pending_pack" title="Pending Pack">
                                    <UserPendingPackComponent/>
                                </Tab>
                            </Tabs>
                            </div>
                        </Box>


                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default UserComponent