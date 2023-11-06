import React from "react";
import Headers from "./Header";
import { Box } from "@mui/material";
import Home from "./Home";
import Header from "./Header";
import Received from "../Received/ReceivedCards";
 export const Fullpane=()=>{
return(
<Box sx={{width:"100vw",height:"100vh",display:"flex",flexDirection:"row"}}>
    <Header/>
  <Received/>

</Box>
);
};
