import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function ImageViewer({ open, onClose, byteArray }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        {byteArray && (
          <img
            src={`data:image/jpeg;base64,${byteArray}`} // Replace 'image/jpeg' with the appropriate image MIME type
            alt="Image"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ImageViewer;
