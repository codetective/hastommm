import {Tabs, Tab} from 'react-bootstrap';
import FarmComponent from '../components/Farm/FarmComponent';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Input,
    ModalBody,
    ModalCloseButton,
    Select,
    Divider,
    useDisclosure,
} from "@chakra-ui/react"

const Farms = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div className="farm-wrapper">

            <div className="d-flex flex-column">
                <div className="farm-header">
                    <h2 className="text-muted ">Farms</h2>
                </div>
                <div className="farm-cards flex-wrap justify-content-between d-flex align-items-center mt-0">
                    <div className="farm-card bg-success2">
                        <div className="component">
                            <div className="component-header text-white"> Total Farms </div>
                            <div className="component-qty text-white">5</div>
                        </div>

                    </div>
                    <div onClick={onOpen}  className="btn btn-dark px-4 my-3">Create New Farm</div>

                </div>
            </div>

            <div className="farm-tab-section">
                <Tabs defaultActiveKey="farms" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="farms" title="Farms">
                        <FarmComponent />
                    </Tab>

                </Tabs>
            </div>




            <Modal  isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent className="mt-3">
                    <ModalHeader className="alert-secondary">Create Farm</ModalHeader>
                    <ModalCloseButton className="btn-cls" />
                    <ModalBody className=" py-4">
                        <form>
                            <div className="mb-4">
                                <h3 className="mb-1" >Title</h3>
                                <Input type="text" placeholder="Farm name" />
                            </div>
                            <div className="mb-3">
                                <h3 className="mb-1" >Description</h3>
                                <Input type="text" placeholder="Description" />
                            </div>
                            <Divider my="35px" h="0.5px !important" opacity="0.2" />
                            <div className="mb-3">
                                <h3 className="mb-1" >Farm Type</h3>
                                <Select placeholder="Select">
                                    <option value="option1">Cashew</option>
                                    <option value="option2">Cattle</option>

                                </Select>
                            </div>
                            <div className="mb-3">
                                <h3 className="mb-1" >Cycle</h3>
                                <Select placeholder="Select">
                                    <option value="option1">Rainy Season 2021</option>
                                    <option value="option2">Dry Season 2021</option>
                                </Select>
                            </div>
                            <Divider my="35px" h="0.5px !important" opacity="0.2" />
                            <div className="d-flex">
                                <div className="mb-3 pe-4 col-md-6">
                                    <h3 className="mb-1" >Total Units</h3>
                                    <Input type="number" placeholder="Max Units available" />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <h3 className="mb-1" >Unit Price</h3>
                                    <Input type="number" placeholder="Amount" />
                                </div>
                            </div>
                            <div className="btn-success px-3 w-100 mt-3 btn">Create Farm</div>



                        </form>


                    </ModalBody>

                    <ModalFooter>


                    </ModalFooter>
                </ModalContent>
            </Modal>


        </div>
    )
}

export default Farms
