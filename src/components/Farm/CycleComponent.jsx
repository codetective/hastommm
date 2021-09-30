import {Form, Row, Col} from 'react-bootstrap';

const CycleComponent = () => {
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
                                <Form.Control size="sm" placeholder="Cycle Name" />
                            </Col>

                            <Col  className="my-2 col-md-6 col-lg-4 col-12">
                                <Form.Control placeholder="Select Start Date" id="date2" size="sm" type="text" onFocus={(e) => {
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
                        <th>ID</th>
                        <th>Cycle Name</th>
                        <th>Start Date</th>
                        <th>End date</th>


                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>01</b></td>
                        <td>Cashew Revival Pack</td>
                        <td>3 October 2021</td>
                        <td>3 December 2021</td>

                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default CycleComponent
