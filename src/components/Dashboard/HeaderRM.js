import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Tooltip,
  ListItemButton,
  Divider,
  ListItemText,
} from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useNavigate } from "react-router-dom";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import logoImage from "../../assets/images/profile.png";
import teamsent from "../../assets/images/tea.png";
import selected from "../../assets/images/selected.png";
import received from "../../assets/images/recieved.png";
import sent from "../../assets/images/sent.png";
const HeaderRM = () => {
  const [receivedCardsCount, setReceivedCardsCount] = useState("3");
  const [selectedIndex, setSelectedIndex] = useState(
    parseInt(sessionStorage.getItem("selectedIndex")) || 1
  );

  const navigate = useNavigate();
  const handleReceivedClick = () => {
    navigate("/");
    sessionStorage.setItem("selectedIndex", 1);
    setSelectedIndex(1);
  };
  const handleSendClick = () => {
    navigate("/sendcard");
    sessionStorage.setItem("selectedIndex", 4);
    setSelectedIndex(4);
  };
  const handleSentClick = () => {
    navigate("/sentcards");
    sessionStorage.setItem("selectedIndex", 2);
    setSelectedIndex(2);
  };
  const handleDraftClick = () => {
    navigate("/drafts");
    sessionStorage.setItem("selectedIndex", 3);
    setSelectedIndex(3);
  };
  const handleTeamReceivedClick = () => {
    navigate("/teamReceived");
    sessionStorage.setItem("selectedIndex", 5);
    setSelectedIndex(5);
  };
  const handleTeamSentClick = () => {
    navigate("/teamSent");
    sessionStorage.setItem("selectedIndex", 6);
    setSelectedIndex(6);
  };

  const [draftsCount, setDraftsCount] = useState(0);
  return (
    <>
      <Box
        sx={{
          background: "#FCFCFC",
          height: "100vh",
          width: "25%",
          marginLeft: "5px",
        }}
      >
        <Box sx={{ marginTop: "12px" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "23px",
              fontFamily: "Manrope, sans-serif",
              marginLeft: "15px",
              marginBottom: "10px",
            }}
          >
            CheersApp
          </Typography>

        
          <Box style={{ marginLeft: "15px" }}>
            <Tooltip title="Send Card">
              <Button
                style={{
                  background: "#0071e3",
                  color: "white",
                  marginTop: "20px",
                  marginBottom: "15px",
                  textTransform: "none",
                  borderRadius: "6px",
                  width: "130px",
                }}
                onClick={handleSendClick}
              >
                <MailIcon sx={{ marginRight: "8px" }} />
                Send Card
              </Button>
            </Tooltip>{" "}
          </Box>
          <List>
            <>
              <ListItem
                disablePadding
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "initial",
                  padding: "0px",
                }}
              >
                <ListItemButton
                  onClick={handleReceivedClick}
                  sx={{ color: selectedIndex === 1 ? "#7C3AED" : null }}
                >
                  <Tooltip title="Received Cards">
                    <ListItemIcon
                      sx={{
                        minWidth: "48px",
                        color: selectedIndex === 1 ? "#7C3AED" : null,
                      }}
                    >
                      <InboxIcon />
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText
                    sx={{ display: "flex", flexWrap: "wrap" }}
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ display: "inline", marginRight: "8px" }}
                      >
                        Received Cards
                      </Typography>
                    }
                    secondary={
                        <Tooltip title="Unviewed Cards">
                      <Box
                        component="span"
                        sx={{
                          display: "inline",
                          background: "green",
                          marginTop: "40px",
                          marginBottom: "30px",
                          marginLeft: "20px",
                          color: "white",
                          padding: "2px 9px",
                          borderRadius: "4px",
                        }}
                      >
                        {receivedCardsCount}
                       
                      </Box>
                      </Tooltip>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </>
          </List>
          <List>
            <>
              <ListItem
                disablePadding
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "initial",
                  padding: "0px",
                }}
              >
                <ListItemButton
                  onClick={handleSentClick}
                  sx={{ color: selectedIndex === 2 ? "#7C3AED" : null }}
                >
                  <Tooltip title="Sent Cards">
                    <ListItemIcon
                      sx={{
                        minWidth: "48px",
                        color: selectedIndex === 2 ? "#7C3AED" : null,
                      }}
                    >
                      <SendIcon />
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText
                    sx={{ display: "flex", flexWrap: "wrap" }}
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ display: "inline", marginRight: "25px" }}
                      >
                        Sent Cards
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </>
          </List>
          <List>
            <>
              <ListItem
                disablePadding
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "initial",
                  padding: "0px",
                }}
              >
                <ListItemButton
                  onClick={handleTeamReceivedClick}
                  sx={{ color: selectedIndex === 5 ? "#7C3AED" : null }}
                >
                  <Tooltip title="Team Received Cards">
                    <ListItemIcon
                      sx={{
                        minWidth: "48px",
                        color: selectedIndex === 5 ? "#7C3AED" : null,
                      }}
                    >
                    <img
src={selectedIndex === 5 ? sent: received }
                  style={{
                    width: "25px",
                    height: "28px",
                    filter: selectedIndex !== 5 ? "brightness(54%)" : "none",
                  
                  }}
                  alt="Team Received Cards"
                />
              </ListItemIcon>
                  </Tooltip>
                  <ListItemText
                    sx={{ display: "flex", flexWrap: "wrap" }}
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ display: "inline", marginRight: "8px" }}
                      >
                       Team Received Cards
                      </Typography>
                    }
                    
                  />
                </ListItemButton>
              </ListItem>
            </>
          </List>
          <List>
            <>
              <ListItem
                disablePadding
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "initial",
                  padding: "0px",
                }}
              >
                <ListItemButton
                  onClick={handleTeamSentClick}
                  sx={{ color: selectedIndex === 6 ? "#7C3AED" : null }}
                >
                  <Tooltip title="Team Sent Cards">
                    <ListItemIcon
                      sx={{
                        minWidth: "48px",
                        color: selectedIndex === 6 ? "#7C3AED" : null,
                      }}
                    >  <img
                    src={selectedIndex === 6 ?selected  :  teamsent}
                                      style={{
                                        width: "25px",
                                        height: "25px",
                                        filter: selectedIndex !== 6 ? "brightness(54%)" : "none",
                                      
                                      }}
                                      alt="Team Sent Cards"
                                    />
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText
                    sx={{ display: "flex", flexWrap: "wrap" }}
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ display: "inline", marginRight: "8px" }}
                      >
                       Team Sent Cards
                      </Typography>
                    }
                  
                  />
                </ListItemButton>
              </ListItem>
            </>
          </List>
          <List>
            <>
              <ListItem
                disablePadding
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "initial",
                  padding: "0px",
                }}
              >
                <ListItemButton  onClick={handleDraftClick}  sx={{ color: selectedIndex === 3 ? "#7C3AED" : null }}>
                  <Tooltip title="Drafts">
                    <ListItemIcon sx={{ minWidth: "48px", color: selectedIndex === 3 ? "#7C3AED" : null , }}>
                      <EditNoteIcon sx={{fontSize:"30px"}} />
                    </ListItemIcon>
                  </Tooltip>

                  <ListItemText
                    sx={{ display: "flex", flexWrap: "wrap" }}
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ display: "inline", }}
                      >
                        Drafts
                      </Typography>
                    }
                   
                  />
                </ListItemButton>
              </ListItem>
            </>
          </List>
        </Box>
      </Box>
    </>
  );
};
export default HeaderRM;
