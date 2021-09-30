import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Input,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react"
import PageTitle from '../components/Global/PageTitle';
import CycleComponent from '../components/Farm/CycleComponent';
import {Tab, Tabs} from "react-bootstrap";

export default function Cycle() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (

        <Box pb="50px">


            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <PageTitle title="Manage Cycles" category={"Cycles"} />
                <div onClick={onOpen} className="btn btn-dark px-3">New Cycle</div>

            </div>
            <p className="alert alert-primary my-2">Cycles are investment windows for clients to invest, it should have a start date and end date, you can give them name tags like rainy season 2021</p>
            <div className="farm-tab-section mt-4">
                <Tabs defaultActiveKey="cycle" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="cycle" title="List of Cycles">
                        <CycleComponent />
                    </Tab>
                </Tabs>
            </div>

            <Modal  isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent className="mt-3">
                    <ModalHeader className="alert-secondary">Add Cycle</ModalHeader>
                    <ModalCloseButton className="btn-cls" />
                    <ModalBody className=" py-4">
                        <form>
                            <div className="mb-4">
                                <h3 className="mb-1" >Cycle Name</h3>
                                <Input type="text" placeholder="Tag name e.g Rainy season" />
                            </div>
                            <div className="d-flex flex-wrap">
                                <div className="mb-3 col-lg-6 pe-2">
                                    <h3 className="mb-1" >Start Date</h3>
                                    <Input type="date" />
                                </div>

                                <div className="mb-3 col-lg-6 pe-2">
                                    <h3 className="mb-1" >End Date</h3>
                                    <Input type="date" />
                                </div>

                            </div>
                            <div className="btn-success px-3 btn">Done</div>


                        </form>


                    </ModalBody>

                    <ModalFooter>


                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    );
}
