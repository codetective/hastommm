import {Form, Row, Col} from 'react-bootstrap';
import {FaCheckCircle, FaStop, FaTrashAlt} from "react-icons/fa";
import React from "react";
import {acceptPack, rejectPack ,deletePack} from "../../apiServices/packServices";
import { useState } from '@hookstate/core';
import store from '../../store/store';

const DeclinedPackComponent  = ({pack,contentChanged, setContentChanged}) => {
    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    const onAccept = async(id) => {
        try{
            const res = await acceptPack(id)
            if(res.status === 200 || res.status === 201){
                alertMessage.set("Order Accepted")
                alertType.set("success")
                alertNotification.set(true)
                setContentChanged(contentChanged + 1)
                setTimeout(() => {
                  alertNotification.set(false)
                  alertMessage.set("")
                  alertType.set("")
                }, 1000);
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
    const onDelete = async(id) => {
        try{
            const res = await deletePack(id)
            if(res.status === 200 || res.status === 201){
                alertMessage.set("Order deleted")
                alertType.set("success")
                alertNotification.set(true)
                setContentChanged(contentChanged - 1)
                setTimeout(() => {
                    alertNotification.set(false)
                    alertMessage.set("")
                    alertType.set("")
                }, 1000);
            }
            else{
                alertMessage.set("Failed to Delete Order")
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

            {/*<div className="mini-card  mb-4 rounded-2 w-100">*/}
            {/*    <div className="card-name">*/}
            {/*        Filter*/}
            {/*    </div>*/}
            {/*    <div className="card-form w-100">*/}
            {/*        <Form className="w-100 ">*/}
            {/*            <Row className="w-100">*/}
            {/*                <Col className="my-2 col-md-6 col-lg-3 col-12">*/}
            {/*                    <input className="form-control form-control-sm" list="datalistOptions" id="exampleDataList"*/}
            {/*                           placeholder="Cycle..."/>*/}
            {/*                        <datalist id="datalistOptions">*/}
            {/*                            <option value="Rainy Season 2021"/>*/}
            {/*                                <option value="Rainy Season 2022"/>*/}

            {/*                        </datalist>*/}
            {/*                </Col>*/}

            {/*                <Col  className="my-2 col-md-6 col-lg-4 col-12">*/}
            {/*                    <Form.Control placeholder="Filter Date" id="date2" size="sm" type="text" onFocus={(e) => {*/}
            {/*                        document.getElementById("date2").type='date';*/}
            {/*                    }}/>*/}
            {/*                </Col>*/}
            {/*                <Col className="my-2">*/}
            {/*                    <button className="btn btn-add-outline">Apply</button>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*        </Form>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="table-section w-100">
                <table className="table tabx table-responsive over-h">
                    <thead>
                    <tr>

                        <th>Pack ID</th>
                        {/*<th>Date Ordered</th>*/}
                        <th>Ordered by</th>
                        <th>Order Details</th>
                        <th>Status</th>
                        <th>QTY / Price</th>
                        <th>Action</th>


                    </tr>
                    </thead>

                    {
                        pack.map((data, index) => (data.status == 'cancelled' ?
                            <tbody>
                        <tr>
                            <td>{index + 1}</td>
                            {/*<td><b>15/20/2021</b></td>*/}
                            <td>{data.buyer.name} <br/> <b>{data.buyer.email}</b></td>
                            <td>
                                <b>Farm: </b>{data.item.label} <br/>
                                <small><b>CYCLE- </b> {data.item.cycle.label}</small><br/>
                            </td>
                            <td>
                                <b className="text-danger">{data.status}</b>
                            </td>
                            <td className="">
                                <small className="text-white px-3 py-2 bg-dark"><b>QTY- </b>{data.quantity}</small>
                                <small className="text-white px-3 py-2 bg-success2"><b>#</b>{data.capital}</small>
                            </td>
                            <td>
                                <span className="d-flex align-items-center btn btn-success btn-sm pointer me-3" onClick={() => onAccept(data.id)}>
                                    <FaCheckCircle className="me-2" />Accept
                                </span>
                                <span className="d-flex mt-2 align-items-center btn btn-dark btn-sm pointer me-3" onClick={() => onDelete(data.id)}>
                                    <FaTrashAlt className="me-2" /> Delete
                                </span>
                            </td>
                        </tr> </tbody> : <tr className="d-none">none</tr>
                        ))
                    }

                </table>
            </div>

        </div>
    )
}

export default DeclinedPackComponent
