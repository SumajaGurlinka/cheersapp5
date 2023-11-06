import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
const ImageToByteArrayConverter = (props)=> {
    const {
       
        setImage,
        
      } = props;
    
  const [byteArray, setByteArray] = useState(null);
const image="ddd";
setImage(image);
  useEffect(() => {
    const imageUrl = 'https://images.unsplash.com/photo-1695914990931-c5ec0d2f39a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60';

    // Fetch the image as a blob
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const arrayBuffer = event.target.result;
          const uint8Array = new Uint8Array(arrayBuffer);

          setByteArray(uint8Array);
         
         
        };

        reader.readAsArrayBuffer(blob);
      });
  }, []);
 

  return (
    <div>
      {byteArray && (
        <div>
            <p>{byteArray}</p>
         
         
        </div>
      )}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  
    setImage: dispatch.user.setImage,
  });
export default connect( mapDispatchToProps)(ImageToByteArrayConverter);