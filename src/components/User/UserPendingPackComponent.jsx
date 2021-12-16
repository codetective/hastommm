import {Form, Row, Col, Alert} from 'react-bootstrap';
import {FaCheckCircle, FaTrashAlt} from "react-icons/fa";
import React, {useEffect} from "react";
import {getPendingPacks, acceptPack, rejectPack} from "../../apiServices/packServices";
import { useState } from '@hookstate/core';
import store from '../../store/store';
import {useToast} from "@chakra-ui/react";



const UserPendingPackComponent  = ({id}) => {
    const [pendingPacks, setPendingPacks] = React.useState([])
    const toast = useToast();


    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getPendingPacks(id)
                setPendingPacks(res.data.data)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    },[id])

    const onAccept = async(id) => {
        try{
            const res = await acceptPack(id)
            if(res.status === 200 || res.status === 201){
                alertMessage.set("Order Accepted")
                alertType.set("success")
                alertNotification.set(true)
                setTimeout(() => {
                  alertNotification.set(false)
                  alertMessage.set("")
                  alertType.set("")
                }, 1000);
                return toast({
                    title: 'Successfull.',
                    description: 'Order Accepted Successfully',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    padding:"900"
                });
            }
            else{
                alertMessage.set("Failed to Accept Order")
                alertType.set("danger")
                alertNotification.set(true)
                setTimeout(() => {
                  alertNotification.set(false)
                  alertMessage.set("")
                  alertType.set("")
                }, 1000);
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

    const onDecline = async(id) => {
        try{
            const res = await rejectPack(id)
            if(res.status === 200 || res.status === 201){
                alertMessage.set("Order Rejected")
                alertType.set("success")
                alertNotification.set(true)
                setTimeout(() => {
                  alertNotification.set(false)
                  alertMessage.set("")
                  alertType.set("")
                }, 1000);
            }
            else{
                alertMessage.set("Failed to Reject Order")
                alertType.set("danger")
                alertNotification.set(true)
                setTimeout(() => {
                  alertNotification.set(false)
                  alertMessage.set("")
                  alertType.set("")
                }, 1000);
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
            <Alert show={alertNotification.get()} variant={alertType.get()}>
                <p className="alert-p"> {alertMessage.get()} </p>
            </Alert>

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
                        <th>Action</th>


                    </tr>
                    </thead>
                    <tbody>
                    {pendingPacks.length > 0 && pendingPacks.map(data => (
                        <tr>
                            <td>{data.id}</td>
                            <td><b>15/20/2021</b></td>

                            <td>{data.buyer.name} <br/> <b>{data.buyer.email}</b></td>
                            <td>
                                <b>Farm: </b>{data.item.label} <br/>
                                <small><b>CYCLE- </b> {data.item.cycle.label}</small><br/>
                            </td>
                            <td>
                                <small className="text-white px-3 py-2 bg-dark"><b>QTY- </b>{data.quantity}</small>
                                <small className="text-white px-3 py-2 bg-success2"><b>Price- </b>{data.capital}</small>
                            </td>
                            <td className="d-flex align-items-center">
                                <span className="d-flex align-items-center btn btn-success btn-sm pointer me-3" onClick={() => onAccept(data.id)}>
                                    <FaCheckCircle className="me-2" />Accept
                                </span>
                                <span className="d-flex align-items-center btn btn-danger btn-sm pointer me-3" onClick={() => onDecline(data.id)}>
                                    <FaTrashAlt className="me-2" />Decline
                                </span>
                            </td>
                        </tr>
                    ))}
                    
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default UserPendingPackComponent
