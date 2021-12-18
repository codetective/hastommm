import {Form, Row, Col, Pagination, Tab, Tabs} from 'react-bootstrap';
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
import React, {useEffect} from "react";
import src from '../../assets/farm.jpg';
import UserActivePackComponent from "../User/UserActivePackComponent";
import UserPendingPackComponent from "../User/UserPendingPackComponent";
import {FaBackspace, FaPhone, FaPhoneSquareAlt} from "react-icons/all";
import {getAllUsers, searchUser} from '../../apiServices/userServices';
import store from '../../store/store';
import { useState } from '@hookstate/core';

const UserComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = React.useState([])
    const [userDetail, setUserDetail] = React.useState({})
    const [isSearch, setIsSearch] = React.useState(false)
    const [keyword, setKeyword] = React.useState("")
    const [reRenderToggle, setReRenderToggle] = React.useState(true)


    const [page, setPage] = React.useState(1)
    const [currentPage, setCurrentPage] = React.useState(0)
    const [totalPages, setTotalPages] = React.useState(0)

    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    function goToNextPage() {
        if(page < totalPages){
            setPage(page + 1)
        }
     }
   
    function goToPreviousPage() {
        if(page > 1){
            setPage(page - 1)
        }
     }

    useEffect(() => {
        const fetch = async() => {
          try{
            const res = await getAllUsers(page)
            setUser(res.data.data)
            setTotalPages(res.data.meta.last_page)
            setCurrentPage(res.data.meta.current_page)
          }
          catch(err){
            console.log(err)
          }
        }
        fetch()
      }, [page, reRenderToggle])

    const onSearch = async() => {
        try{
            if(!isSearch){
                if(keyword !== ""){
                    const res = await searchUser(keyword)
                    if(res.data.data.length > 0){
                        setUser(res.data.data)
                        setIsSearch(true)
                    }
                    else{
                        alertMessage.set("User Not Found")
                        alertType.set("success")
                        alertNotification.set(true)
                        setTimeout(() => {
                        alertNotification.set(false)
                        alertMessage.set("")
                        alertType.set("")
                        }, 1000);
                    }
                }
            }
            else{
                setReRenderToggle(!reRenderToggle)
                setIsSearch(false)
            }
        }
        catch(err){
            console.log(err)
        }
    }

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
                                       placeholder="User Name.." value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
                                    <datalist id="datalistOptions" >
                                    {user.map(data => (
                                        <option value={data.name} key={data.id}/>
                                    ))}
                                    </datalist>
                            </Col>

                            <Col className="my-2">
                                <button className="btn btn-add-outline" type="button" onClick={onSearch}>{isSearch ? "Cancel" : "Apply"}</button>
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
                    {/* {data.roles.length === 0 ?<tbody></tbody>: */}
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

                    </tr>
                    </tbody>
                    ))}
                </table>
                {
                !isSearch &&
                <Pagination>
                {page > 1 && <Pagination.Prev onClick={goToPreviousPage}/> }
                    <Pagination.Item className={"active"}>{currentPage}</Pagination.Item>
                {page !== totalPages && <Pagination.Next onClick={goToNextPage}/> }
                    {page === totalPages && <Pagination.Item>Last page</Pagination.Item> }
                </Pagination>
                }
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