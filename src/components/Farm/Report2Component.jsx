import {Form, Row, Col} from 'react-bootstrap';

const Report2Component = () => {
    return (
        <div classname="tab-component-wrapper">

            <div className="mini-card  mb-4 rounded-2 w-100">
                <div className="card-name">
                    Filter
                </div>
                <div className="card-form w-100">
                    <Form className="w-100 ">
                        <Row className="w-100">

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
                        <th>Pack Owner</th>
                        <th>Pack Issued</th>



                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>15/20/2021</b></td>
                        <td>Fertilizer pack</td>
                        <td>Monthly weed clearing and applying of yeast fertilizer using our sprays and mixing c4 packages.</td>
                        <td>Felicia Thomas</td>
                        <td>Pack1234</td>

                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Report2Component
