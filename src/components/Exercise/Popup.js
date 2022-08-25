import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
   
    return (
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle>
                <div>Title goes here</div>
            </DialogTitle>
            <DialogContent>
                <div>Content goes here</div>
            </DialogContent>
        </Dialog>
    )
}