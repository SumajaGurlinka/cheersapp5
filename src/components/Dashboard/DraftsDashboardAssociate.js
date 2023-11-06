import React from "react";
import Headers from "./Header";
import { Box } from "@mui/material";
import Home from "./Home";
import Received from "../Received/ReceivedCards";
import SentCards from "../Sent/SentCards";
import SendCards from "../Send/SendCards";
import Drafts from "../Drafts/Drafts";
import Header from "./Header";
import Header1 from "./Header1";
 export const DraftsDashboardAssociate=()=>{
return(
<Box sx={{width:"100vw",height:"100vh",display:"flex",flexDirection:"row"}}>
    <Header/>
 <Drafts/>

</Box>
);
};
