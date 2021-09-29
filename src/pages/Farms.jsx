import {Tabs, Tab} from 'react-bootstrap';
import CycleComponent from '../components/Farm/CycleComponent';
import FarmComponent from '../components/Farm/FarmComponent';

const Farms = () => {
    return (
        <div className="farm-wrapper">
            <div className="farm-header">
                <h2>Farms</h2>
            </div>
            <div className="farm-cards">
                <div className="farm-card">
                    <div className="component">
                        <div className="component-header"> Total Cycles </div>
                        <div className="component-qty">25</div>
                    </div>
                    <div className="divider-card"></div>
                    <div className="component">
                        <div className="component-header"> Total Pack </div>
                        <div className="component-qty">25 <span>(168 Unit)</span></div>
                    </div>
                </div>
                <div className="farm-image-card">
                    <div className="img-container">
                        <img src="/assets/images/farm.png" alt="farm"/>
                    </div>
                    <div className="farm-setup">
                        <div className="setup-header">
                            <p>Cashew Farm</p>
                        </div>
                        <button className="btn btn-setup">Farm Setup</button>
                    </div>
                </div>
            </div>
            <div className="farm-tab-section">
                <Tabs defaultActiveKey="farms" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="farms" title="Farms">
                        <FarmComponent />
                    </Tab>
                    <Tab eventKey="cycle-setup" title="Cycle Setup">
                        <CycleComponent />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default Farms
