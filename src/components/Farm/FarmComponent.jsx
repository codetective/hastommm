import {Form, Row, Col} from 'react-bootstrap';
import {getCycle} from '../../apiServices/cycleServices';
import {getFarmType} from '../../apiServices/farmTypeServices';
import {deleteFarm} from '../../apiServices/farmServices';
import React, {useEffect} from 'react';
import store from '../../store/store';
import { useState } from '@hookstate/core';


// import {Select} from "@chakra-ui/react";

const FarmComponent = ({data, setContentChanged, contentChanged}) => {
    const [cycles, setCycles] = React.useState([]);
    const [farmTypes, setFarmTypes] = React.useState([])

    const {alertNotification} = useState(store)
    const {alertType} = useState(store)
    const {alertMessage} = useState(store)

    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getCycle()
                setCycles(res.data.data)
            }
            catch(err){
                console.log(err)
            }
        } 
        fetch()
    }
    ,[])

    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getFarmType()
                setFarmTypes(res.data.data)
            }
            catch(err){
                console.log(err)
            }
        } 
        fetch()
    }
    ,[])

    const onDelete = async(id) => {
        try{
            const res = await deleteFarm(id)
            if(res.status === 200){
              alertMessage.set("Farm Deleted")
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
              alertMessage.set("Failed to Delete Farm")
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
            console.log(err)
            alertMessage.set("An Error Occured")
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
                                <select className="form-select form-select-sm" placeholder="Select">
                                    <option selected>Select farm type</option>
                                    {farmTypes.map(data => (
                                    <option value={data.id} key={data.id}>{data.name}</option>
                                    ))}
                                </select>
                            </Col>
                            <Col  className="my-2 col-md-6 col-lg-3 col-12" >
                                <input className="form-control form-control-sm" list="datalistOptions" id="exampleDataList"
                                       placeholder="Cycle..."/>
                                <datalist id="datalistOptions">
                                    {cycles.map(data => (
                                    <option value={data.label} key={data.id} />
                                    ))}
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
                            <th>ID</th>
                            <th>Farm Name</th>
                            <th>Description of Farm</th>
                            <th>Max unit amount</th>
                            <th>Farm Unit Price</th>
                            <th>Farm Type</th>
                            <th>Cycle</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td><b>{index + 1}</b></td>
                                <td>{item.label}</td>
                                <td className="descr">{item.description}</td>
                                <td>{item.max}</td>
                                <td className="text-success fw-bold">{item.amount}</td>
                                <td className="alert alert-primary">{item.type.name}</td>
                                <td>{item.cycle.label}</td>
                                <td>
                                    <span className="btn btn-dark btn-sm mr-2">View</span>
                                    <span className="btn btn-dark btn-sm" onClick={() => onDelete(item.id)}>Delete</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FarmComponent
