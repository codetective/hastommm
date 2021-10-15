import {Tabs, Tab} from 'react-bootstrap';
import PendingPackComponent from '../components/Farm/PendingPackComponent';
import ActivePackComponent from '../components/Farm/ActivePackComponent';
import {FaUserAlt} from "react-icons/fa";
import React from "react";
import {GiGroundSprout} from "react-icons/gi";



const Farms = () => {


    return (

        <div className="farm-wrapper">

            <div className="d-flex flex-column">
                <div className="farm-header">
                    <h2 className="text-muted d-flex align-items-center"><GiGroundSprout className="me-2 fs-1 text-dark"/>Packs</h2>
                    <p>This are orders made by investors for your farm</p>
                </div>
                <div className="farm-cards flex-wrap d-flex align-items-center mt-0">

                    <div className="farm-card  bg-dark">
                        <div className="component">

                            <div className="component-header text-white"> Total Packs </div>
                            <div className="component-qty text-white">95</div>
                        </div>

                    </div>

                    <div className="farm-card bg-success">
                        <div className="component">
                            <div className="component-header text-white"> Active Packs</div>
                            <div className="component-qty text-white">90</div>
                        </div>

                    </div>

                    <div className="farm-card bg-danger">
                        <div className="component">
                            <div className="component-header text-white"> Pending Packs</div>
                            <div className="component-qty text-white">5</div>
                        </div>

                    </div>

                </div>
            </div>

            <div className="farm-tab-section">
                <Tabs defaultActiveKey="pack" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="pack" title="Active Packs">
                        <ActivePackComponent/>

                    </Tab>

                    <Tab eventKey="pending_pack" title="Pending Pack">
                        <PendingPackComponent/>
                    </Tab>
                </Tabs>


            </div>


        </div>
    )
}

export default Farms
