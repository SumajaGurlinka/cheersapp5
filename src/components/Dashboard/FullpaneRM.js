import React from "react";
import Headers from "./Header";
import { Box } from "@mui/material";
import Home from "./Home";
import HeaderRM from "./HeaderRM";
import Header1 from "./Header1";
import Received from "../Received/ReceivedCards";
 export const FullpaneRM=()=>{
return(
<Box sx={{width:"100vw",height:"100vh",display:"flex",flexDirection:"row"}}>
    <Header1/>
  <Received/>

</Box>
);
};
