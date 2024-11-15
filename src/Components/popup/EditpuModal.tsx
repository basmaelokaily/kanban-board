import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React from 'react';
import Editpu from './Editpu';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '70%', md: '40%' }, // Adjust width for different screen sizes
    height: { xs: '70%', sm: '80%', md: '70%' }, // Adjust height for different screen sizes
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        width: '12px',
    }
};

const EditpuModal = (props: any) => {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Editpu onClose={props.handleClose} selectedItem={props.selectedItem}/>
            </Box>
        </Modal>
    );
}

export default EditpuModal






