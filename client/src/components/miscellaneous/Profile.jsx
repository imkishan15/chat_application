import { ViewIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
    Text,
    Image,
} from "@chakra-ui/react";

const Profile = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} float='right' mr='1em' />
            )}
            <Modal size="lg" onClose={onClose} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent h="410px">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <ModalHeader
                            fontSize="40px"
                            fontFamily="Work sans"
                            d="flex"
                            justifyContent="center"
                        >
                            {user.name}
                        </ModalHeader>
                    </div>
                    <ModalCloseButton />
                    <ModalBody
                        d="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Image
                                borderRadius="full"
                                boxSize="150px"
                                src={user.pic}
                                alt={user.name}
                            />
                        </div> <br />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                            fontFamily="Work sans"
                        >
                            Email: {user.email}
                        </Text>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button bg="blue.500" color="white" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Profile;
