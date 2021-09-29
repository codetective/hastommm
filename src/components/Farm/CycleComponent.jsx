import {Form, Row, Col} from 'react-bootstrap';

const CycleComponent = () => {
    return (
        <div classname="tab-component-wrapper">
            <div className="mini-card  mb-4">
                <div className="card-name">
                    Add
                </div>
                <div className="card-form">
                    <Form>
                        <Row>
                            <Col >
                                <Form.Control size="sm" placeholder="Cycle Name" />
                            </Col>
                            <Col>
                                <Form.Control size="sm" type="date"/>
                            </Col>
                            <Col>
                                <Form.Control size="sm" type="date" />
                            </Col>
                            <Col>
                                <button className="btn btn-add-outline">Add</button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <div className="mini-card">
                <div className="card-name">
                    Filter
                </div>
                <div className="card-form">
                    <Form>
                        <Row>
                            <Col >
                                <Form.Control size="sm" placeholder="Cycle ID" />
                            </Col>
                            <Col>
                                <Form.Control size="sm" type="date"/>
                            </Col>
                            <Col>
                                <button className="btn btn-add-outline">Apply</button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <div className="table-section mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>Pack ID</th>
                            <th>Pack Unit</th>
                            <th>Date</th>
                            <th>Approved</th>
                            <th>Capital</th>
                            <th>Cycle</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Pack ID</td>
                        <td>Pack Unit</td>
                        <td>Date</td>
                        <td>Approved</td>
                        <td>Capital</td>
                        <td>Cycle</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CycleComponent
