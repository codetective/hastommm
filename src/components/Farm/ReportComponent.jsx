import {Form, Row, Col} from 'react-bootstrap';
import {FaTrashAlt} from "react-icons/fa";
import React from "react";

const ReportComponent = ({report}) => {
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
                        <th>Date</th>
                        <th>Report</th>
                        <th>Activity</th>
                        <th>Cycle Issued</th>
                        <th>Action</th>


                    </tr>
                    </thead>
                    <tbody>
                    {report.map(data => (
                        <tr key={data.id}>
                            <td><b>15/20/2021</b></td>
                            <td>{data.title}</td>
                            <td>{data.description}</td>
                            <td>Rainy Season 2021</td>
                            <td className="d-flex align-items-center">
                                <span className="text-decoration-underline pointer me-3">View</span>
                                <FaTrashAlt />
                            </td>
                        </tr>
                    ))}
                    {console.log(report)}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ReportComponent
