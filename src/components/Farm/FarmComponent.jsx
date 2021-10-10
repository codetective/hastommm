import {Form, Row, Col} from 'react-bootstrap';
// import {Select} from "@chakra-ui/react";

const FarmComponent = ({data}) => {

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
                                    <option value="option1">Rainy Season 2021</option>
                                    <option value="option2">Dry Season 2021</option>
                                </select>
                            </Col>
                            <Col  className="my-2 col-md-6 col-lg-3 col-12" >
                                <input className="form-control form-control-sm" list="datalistOptions" id="exampleDataList"
                                       placeholder="Cycle..."/>
                                <datalist id="datalistOptions">
                                    <option value="Rainy Season 2021"/>
                                    <option value="Rainy Season 2022"/>

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
                                <td className="text-success fw-bold">500,000</td>
                                <td className="alert alert-primary">{item.type.name}</td>
                                <td>{item.cycle.label}</td>
                                <td><span className="btn btn-dark btn-sm">View</span> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FarmComponent
