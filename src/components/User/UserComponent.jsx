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
import {FaBackspace, FaPhone, FaPhoneSquareAlt} from "react-icons/all";
import {getAllUsers, getAllUsersBasic} from '../../apiServices/userServices';

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
                        <th>Total Farm</th>
                        <th>Pending Farm</th>
                        <th>Action</th>


                    </tr>
                    </thead>
                    {user.map((data, index) => (
                    <tbody>
                    {data.roles.length > 0 ?<tbody></tbody>:
                    <tr key={data.id}>

                        <td><b>{index + 1}</b></td>
                        <td><b> {data.name}</b> <br/> {data.email} <br/>
                            <span className="small d-flex align-items-center text-primary"><FaPhoneSquareAlt className="me-1"/>{data.phone_number ? data.phone_number : "No Number"}</span></td>
                        <td className="text-success"><b><b>{data.packs.length ? data.packs.length : "0"}</b></b></td>
                        <td className="text-danger">
                            <b>
                                {data.pending_packs.length ? data.pending_packs.length : "-"}
                                {/*{data.active_packs.length ? data.active_packs.length : "-"}*/}
                            </b>
                        </td>
                        <td><span onClick={() => viewUserDetail(data)} className="btn btn-dark btn-sm">View</span></td>

                    </tr>}
                    </tbody>
                    ))}
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
                                        totalprofit={userDetail.total_profit_gotten ? userDetail.total_profit_gotten : "0"}
                                        totalpacks={userDetail.packs?.length > 0 ? userDetail.packs.length : "0"}
                                        totalcapital={userDetail.total_capital_invested ? userDetail.total_capital_invested : "0"}
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
                                    <UserActivePackComponent
                                        id={userDetail.id}
                                    />

                                </Tab>

                                <Tab eventKey="pending_pack" title="Pending Pack">
                                    <UserPendingPackComponent
                                        id={userDetail.id}
                                    />
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