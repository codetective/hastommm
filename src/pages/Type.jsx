import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Input,
    ModalBody,
    ModalCloseButton,
    Divider,
    useDisclosure,
} from "@chakra-ui/react"
import PageTitle from '../components/Global/PageTitle';
import TypeComponent from "../components/Farm/TypeComponent";
import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import {FaTractor,} from "react-icons/fa";



export default function Cycle() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box pb="50px">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="farm-header d-flex align-items-center">
                    <FaTractor className="fs-1 me-3 my-2 text-success"/>
                    <h2 className="text-muted ">Farm Type</h2>
                </div>

                <div onClick={onOpen}  className="btn btn-success my-2 px-3">Create New Type</div>
            </div>
            <Divider mb="15px" h="0.5px !important" opacity="0.1" />
            <div className="farm-wrapper">

                <div className="farm-tab-section mt-0">
                    <TypeComponent />

                </div>
            </div>


            <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
                <ModalOverlay />
                <ModalContent className="mt-0 rounded-0 p-md-5">
                    <ModalCloseButton className="btn-cls" />
                    <ModalBody className="py-4">
                        <form>
                            <div>
                                <ModalHeader className="px-0 mt-3 d-flex flex-wrap justify-content-between">
                                    Create Farm Type
                                    <button type="submit" className="btn-success px-3 btn">Done</button>
                                </ModalHeader>
                            </div>
                            <p className="mb-4">Note: This farm type should be well described with your proper Documents Uploaded in PDF format </p>
                            <section className="d-flex flex-wrap">
                                <div className="col-lg-6  col-12 pe-lg-5">
                                    <div className="mb-4 col-lg-12">
                                        <h3 className="mb-1" >Farm Type</h3>
                                        <Input type="text" placeholder="Title E.g Cashew Farm" required/>
                                    </div>
                                    <div className="mb-3 col-lg-12">
                                        <h3 className="mb-1" >Summary</h3>
                                        <Input type="text" placeholder="Keep it simple" required />
                                    </div>
                                    <div className="mb-3 pt-4 col-lg-12">
                                        <h3 className="mb-1" >Detailed Description</h3>
                                        <textarea className="form-control" rows="3" placeholder="Max 200 chars" required>
                                </textarea>
                                    </div>
                                </div>

                                <div className="col-lg-6  col-12 ps-lg-4">
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Default Image</h3>
                                        <input className="form-control" type="file" id="formFile" required/>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-1" >Upload a Documents in PDF Files Max 3</h3>
                                        <input className="form-control" type="file" id="formFileMultiple" required  multiple/>
                                    </div>
                                </div>
                            </section>





                        </form>


                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>


        </Box>




    );
}
