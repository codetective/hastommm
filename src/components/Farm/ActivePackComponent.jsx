import {Form, Row, Col} from 'react-bootstrap';
import React from "react";
import {FaTrashAlt} from "react-icons/fa";
import {deletePack} from "../../apiServices/packServices";
import {useState} from "@hookstate/core";
import store from "../../store/store";



const ActivePackComponent  = ({pack,contentChanged, setContentChanged}) => {
    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)
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
                        <th>Order Details</th>
                        <th>Ordered by</th>

                        <th>QTY / Price</th>
                        <th>Profit</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {pack.map((data, index)=> (
                    <tr>
                        <td>{index + 1}</td>
                        <td><b>
                            { new Date(data.date_created).toLocaleDateString([],
                                {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                })}
                        </b></td>


                        <td>
                            <b>Farm: </b>{data.item.label} <br/>
                            <small><b>CYCLE- </b> {data.item.cycle.label}</small><br/>
                            <small><b>Type- </b> {data.item.type.name}</small><br/>
                        </td>
                        <td>{data.buyer.name} <br/> <b>{data.buyer.email}</b><br/> {data.buyer.phone_number}</td>
                        <td>
                            <small className="text-white px-3 py-2 bg-dark"><b>QTY- </b>{data.quantity}</small>
                            <small className="text-white px-3 py-2 bg-success2"><b>Price- </b>{data.capital}</small>
                        </td>

                        <td>
                            <span className="text-success"><b> # {data.profit} : yeilding</b></span>
                        </td>
                        <td>
                            <span className="d-flex align-items-center btn btn-dark btn-sm pointer me-3" onClick={() => onDelete(data.id)}>
                                <FaTrashAlt/>
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

export default ActivePackComponent
