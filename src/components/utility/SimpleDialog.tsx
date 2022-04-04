import { FC } from "react";
import { Dialog, DialogTitle } from "@mui/material";

interface ISimpleDialogProps {
    title: string;
    open: boolean;
    onClose: (value: boolean) => void;
}

const SimpleDialog: FC<ISimpleDialogProps> = ({ title, open, onClose, children }) => {
    const handleClose = () => {
        onClose(false);
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            {children}
        </Dialog >
    )
}

export default SimpleDialog;