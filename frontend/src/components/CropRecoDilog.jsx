import React from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const CropRecoDilog = ({ open, message, onClose }) => {
    
    return (
        <>
            <Dialog open={open} handler={onClose}>
                <DialogHeader>Prediction Result</DialogHeader>
                <DialogBody>
                    <div className='text-black'>
                        
                        <span>Congratulations! Prediction is successful. Our recommendation is:</span>
                         <span className='text-red-600'> {message.toUpperCase()}</span>  

                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={onClose} className="mr-1">
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default CropRecoDilog;