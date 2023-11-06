import React, { useState } from 'react';
import ImageViewer from './ImageViewer';

function YourMainComponent() {
  const [openViewer, setOpenViewer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleView = (item) => {
    setSelectedItem(item);
    setOpenViewer(true);
  };

  const handleCloseViewer = () => {
    setOpenViewer(false);
  };

  return (
    <div>
      {/* Your component content */}
      <button onClick={() => handleView(selectedItem)}>View</button>

      {selectedItem && (
        <ImageViewer open={openViewer} onClose={handleCloseViewer} byteArray={selectedItem.binaryData} />
      )}
    </div>
  );
}

export default YourMainComponent;
