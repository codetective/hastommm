import {Form, Row, Col} from 'react-bootstrap';

const FarmComponent = () => {

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
                                <Form.Control size="sm" placeholder="Farm Type" />
                            </Col>
                            <Col  className="my-2 col-md-6 col-lg-3 col-12" >
                                <Form.Control size="sm" placeholder="Cycle" />
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
                    <tr>
                        <td><b>01</b></td>
                        <td>Cashew Revival Pack</td>
                        <td className="descr">This is a cashew investment plan opened for new customers only plan opened for new customers only</td>
                        <td>500</td>
                        <td className="text-success fw-bold">500,000</td>
                        <td className="alert alert-primary">Cashew</td>
                        <td>Rainy Cycle 2021</td>
                        <td><span className="btn btn-dark btn-sm">View</span> </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FarmComponent
