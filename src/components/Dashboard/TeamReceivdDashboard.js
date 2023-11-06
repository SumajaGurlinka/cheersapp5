import React from "react";
import Headers from "./Header";
import { Box } from "@mui/material";
import Home from "./Home";
import Received from "../Received/ReceivedCards";
import SentCards from "../Sent/SentCards";
import SendCards from "../Send/SendCards";
import TeamSentCards from "../TeamSentCards/TeamSentCards";
import HeaderRM from "./HeaderRM";
import TeamReceivedCards from "../TeamReceivedCards/TeamReceivedCards";
import Header1 from "./Header1";
 export const TeamReceivedDashboard=()=>{
return(
<Box sx={{width:"100vw",height:"100vh",display:"flex",flexDirection:"row"}}>
    <Header1/>
 <TeamReceivedCards/>

</Box>
);
};
