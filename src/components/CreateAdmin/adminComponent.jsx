import {Form, Row, Col} from 'react-bootstrap';
import {FaTrashAlt} from "react-icons/fa";
const adminComponent = () => {
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
                                       placeholder="Search by Email.."/>
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
                        <th>Admin</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Location</th>
                        <th>Password</th>
                        <th>Action</th>


                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>1</b></td>
                        <td><b> James Demiji</b></td>
                        <td><b> jamedi74@gmail.com</b></td>
                        <td><b>0839374792</b></td>
                        <td className="text-success"><b>14</b></td>
                        <td className="text-danger"><b>2</b></td>
                        <td className='d-flex align-items-center'>
                            <span className="text-decoration-underline me-3 pointer">Deactivate Admin</span> </td>

                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default adminComponent
