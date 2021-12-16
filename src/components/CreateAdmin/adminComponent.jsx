
import {Form, Row, Col, Alert, Spinner, Tab, Tabs} from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import {FaPhoneSquareAlt} from "react-icons/all";
import {getAllAdmin, getAllUsersSuperAdmin, reactivateAdmin, deactivateAdmin } from "../../apiServices/authServices"
import store from "../../store/store";
import {useToast} from "@chakra-ui/react";

const AdminComponent = ({setContentChanged, contentChanged}) => {
    const toast = useToast();
    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    const [user, setUser] = useState([])
    const [superAdmin, setSuperAdmin] = useState([])

    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getAllAdmin()
                setUser(res.data.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getAllUsersSuperAdmin()
                setSuperAdmin(res.data.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [])

    const deleteAdmin = async(id) => {
        try{
            const res = await deactivateAdmin(id)
            if(res.status === 200 || res.status === 201){
                return toast({
                    title: 'Successfull.',
                    description: 'Deactivated',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    padding:"900"
                });
            }
            else{
                return toast({
                    title: 'failed.',
                    description: 'Failed to deactivate user',
                    status: 'failed',
                    duration: 9000,
                    isClosable: true,
                    padding:"900"
                });
            }
        }
        catch(err){
            alertMessage.set(err.message)
            alertType.set("danger")
            alertNotification.set(true)
            setTimeout(() => {
                alertNotification.set(false)
                alertMessage.set("")
                alertType.set("")
            }, 1000);
        }
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


            <div className="farm-tab-section table-section w-100">
                <Tabs defaultActiveKey="pack" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="pack" title="Admins">
                        <table className="table tabx table-responsive over-h">
                            <thead>
                            <tr>
                                <th>S/N</th>
                                <th>User</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {user.map((data, index) => (
                                <tr key={data.id}>
                                    <td><b>{index + 1}</b></td>
                                    <td>
                                        <b> {data.name}</b> <br/> {data.email} <br/>
                                        <span className="small d-flex align-items-center text-primary"><FaPhoneSquareAlt className="me-1"/>{data.phone_number ? data.phone_number : "No Number"}</span></td>
                                    <td>

                                            <span className="text-decoration-underline pointer text-danger" onClick={() => deleteAdmin(data.id)}>Deactivate</span>

                                    </td>

                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </Tab>

                    <Tab eventKey="pending_pack" title="Super Admin">
                        <table className="table tabx table-responsive over-h">
                            <thead>
                            <tr>
                                <th>S/N</th>
                                <th>User</th>
                            </tr>
                            </thead>
                            <tbody>
                            {superAdmin.map((data, index) => (
                                <tr key={data.id}>
                                    <td><b>{index + 1}</b></td>
                                    <td>
                                        <b> {data.name}</b> <br/> {data.email} <br/>
                                        <span className="small d-flex align-items-center text-primary"><FaPhoneSquareAlt className="me-1"/>{data.phone_number ? data.phone_number : "No Number"}</span></td>


                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </Tab>

                </Tabs>

            </div>

        </div>
    )
}

export default AdminComponent
