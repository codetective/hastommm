import {Form, Row, Col} from 'react-bootstrap';

const ReportComponent = () => {
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
                    <tr>
                        <td><b>1</b></td>
                        <td><b> James Demiji</b> <br/> jamedi74@gmail.com</td>
                        <td><b>0825412398</b></td>
                        <td className="text-success"><b>14</b></td>
                        <td className="text-danger"><b>2</b></td>
                        <td><span className="btn btn-dark btn-sm">View</span></td>

                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ReportComponent
