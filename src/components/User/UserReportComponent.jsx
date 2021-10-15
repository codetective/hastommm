import {Form, Row, Col, Tabs, Tab} from 'react-bootstrap';
import React from "react";
import {
    WrapItem,
    Avatar, Accordion, AccordionButton, AccordionItem, Box, AccordionIcon, AccordionPanel, Input, Select
} from "@chakra-ui/react";
import {FaPaperclip, FaTrashAlt} from "react-icons/fa";


const UserReportComponent  = () => {
    return (
        <div className="tab-component-wrapper">
            <div className="d-flex align-items-center flex-wrap  mb-3">
                <FaPaperclip className="fs-3 fw-bold text-warning me-2"/>
                <h1 className="fs-3 fw-bold">Reports [40]</h1>

                <Accordion className="ms-auto col-lg-8 col-12 my-3" allowMultiple>
                    <AccordionItem>
                        <h2>
                            <AccordionButton className=" alert-success pointer d-flex justify-content-between text-decoration-underline ">
                                Add New report to this Pack
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel  className="d-flex p-0 py-3 col-12" py={5}>
                            <form className="p-4 bg-white col-12">
                                <div className="mb-4">
                                    <h3 className="mb-1" >Report</h3>
                                    <Input type="text" placeholder="Report Title" required/>
                                </div>
                                <div className="mb-4">
                                    <h3 className="mb-1" >Cycle</h3>
                                    <Select placeholder="Select Cycle to send report" required>
                                        <option value="option1">Rainy Season 2021</option>
                                        <option value="option2">Dry Season 2021</option>
                                    </Select>
                                </div>
                                <div className="mb-4 col-lg-12">
                                    <h3 className="mb-1" >Report Activity</h3>
                                    <textarea className="form-control" rows="5" placeholder="Max 200 chars" required>
                                        </textarea>
                                </div>
                                <div className="mb-4">
                                    <h3 className="mb-1" >External Link</h3>
                                    <Input type="text" placeholder="Media link"/>
                                </div>
                                <button type="submit" className="btn-success px-3 btn">Send Report</button>


                            </form>

                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>

            <hr/>

            <div className="mini-card mt-4  mb-4 rounded-2 w-100">
                <div className="card-name">
                    Filter
                </div>
                <div className="card-form w-100">
                    <Form className="w-100 ">
                        <Row className="w-100">

                            <Col className="my-2 col-md-6 col-lg-4 col-12">
                                <Form.Control placeholder="Filter Date" id="date2" size="sm" type="text"
                                              onFocus={(e) => {
                                                  document.getElementById("date2").type = 'date';
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
                        <th>Media Link</th>
                        <th>Action</th>


                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>15/20/2021</b></td>
                        <td>Fertilizer pack</td>
                        <td>Monthly weed clearing and applying of yeast fertilizer using our sprays and mixing c4
                            packages.
                        </td>
                        <td>Links</td>
                        <td className="">
                            <FaTrashAlt/>
                        </td>


                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default UserReportComponent
