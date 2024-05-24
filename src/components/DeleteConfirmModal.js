import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { habitAction, habitSelector } from '../redux/habitReducer';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    HStack
} from "@chakra-ui/react";
import { createPortal } from 'react-dom';
import { useToast } from '@chakra-ui/react';

/**
 * DeleteConfirmModal component renders a confirmation modal for deleting a habit.
 * @returns {JSX.Element} Confirmation modal for deleting a habit.
 */
function DeleteConfirmModal() {
    const { showDeleteConfirmation, habitInfo } = useSelector(habitSelector);
    const toast = useToast();
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(habitAction.setDeleteConfirmation(null));
    };

    const handleDelete = () => {
        dispatch(habitAction.deleteHabit(habitInfo.id));
        dispatch(habitAction.setDeleteConfirmation(null));

        toast({
            title: "Habit Deleted",
            description: "Gear Up Champ!",
            status: "error",
            duration: 5000,
            position: "top-right",
            isClosable: true,
        });
    };

    return createPortal(
        <>
            {showDeleteConfirmation && (
                <Modal isOpen={showDeleteConfirmation}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Are you sure you want to delete this habit?</ModalHeader>
                        <ModalBody>
                            <HStack>
                                <Button bgColor='brand.60' size='sm' onClick={handleDelete}>
                                    Confirm
                                </Button>
                                <Button bgColor='red.600' size='sm' onClick={handleClose}>
                                    Cancel
                                </Button>
                            </HStack>
                        </ModalBody>
                        <ModalFooter />
                    </ModalContent>
                </Modal>
            )}
        </>,
        document.getElementById("modal-root")
    );
}

export default DeleteConfirmModal;
