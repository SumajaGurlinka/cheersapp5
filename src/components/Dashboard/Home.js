
import { Box, Avatar, Menu, MenuItem, Divider, IconButton, Tooltip, Typography, TextField, } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import jwtDecode from "jwt-decode";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const Home = props => {
    const username = "Sumaja Gurlinka";
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
   const userDetails = jwtDecode(token);

    // const handleLogoutClick =() => {
    //     const redirectUrl = 'https://dev-auth.senecaglobal.in/logout?redirect_url=http://localhost:3000/';
    //     window.location.href = redirectUrl;
   
    // };

    const handleAvatarClick = (e) => {
        setAnchorEl(e.currentTarget);
      };

    const open = Boolean(anchorEl);
   
    const handleClose = () => {
        setAnchorEl(null);
    };
   const handleLogout=()=>{
    const redirectUrl = 'https://dev-auth.senecaglobal.in/logout?redirect_url=http://localhost:3000/';
    window.location.href = redirectUrl;
    sessionStorage.removeItem("selectedIndex");
   }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>
            <Box sx={{ display: "flex", flexwrap: "wrap" }}>
       {/* <Box> <Typography
            sx={{
                fontWeight: '700 !important',
              fontSize: "23px",
              fontFamily: "Manrope, sans-serif",
            position:"absolute",
            margin: '10px !important',
        
              color: '#413E47',
             
            }}
          >
            CheersApp
          </Typography></Box>      */}
        {/* <div style={{position:"absolute",right:"350px",top:"14px"}}>
       
        <TextField
  sx={{
  
    padding: "0px",
    marginLeft: "20px",
    "& label.Mui-focused": {
      color: "#8B5CF6",
    },
    "& .MuiOutlinedInput-root": {
      height: "34px",
      width: "150px",
      borderColor: "transparent",
      "&:hover fieldset": {
        borderColor: "#8B5CF6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#8B5CF6",
      },
    },
  }}
  placeholder="Enter CardID..."
  variant="outlined"
  
/></div> */}
{/* <Box style={{position:"absolute",right:"300px",top:"14.5px",background:"#0071e3",padding:"0px",borderRadius:"4px"}}>
   
  <IconButton sx={{color:"#FCFCFC"}}>
     
       <SearchIcon/>
    
   
        </IconButton>

        </Box> */}
        <Typography
          level="title-md"
          sx={{
            fontSize: "14px",
            fontFamily: "Manrope, sans-serif",
            color: "black",
          position:"absolute",
          right:"9px",
          top:"20px",
            marginRight: "50px",
          }}
        >
          Welcome, {userDetails.full_name}
        </Typography>
        <Tooltip title="Account Settings">
            <IconButton sx={{ position: "absolute",

top: "10px",

right: "1px",

fontSize: "15px",}}  onClick={handleAvatarClick}>
           <MoreHorizIcon/></IconButton>
          </Tooltip>
      </Box>
      
                
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        borderRadius: '4px',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        // mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 42,
                            height: 52,
                            ml: -0.5,
                            mr: 1
                        },
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                disableScrollLock={true}
            >
                <MenuItem sx={{
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}>
                    <div>
                        <Typography sx={{ fontSize:"14px"}}>{userDetails.full_name}</Typography>
                        <Typography sx={{fontSize:'14px'}}>{userDetails.roles[0]}</Typography>
                        <Typography
                            sx={{fontSize:"14px"}}
                        >
                         {userDetails.email}
                        </Typography>
                    </div>
                </MenuItem>
                <Divider variant='middle' />
                <MenuItem  sx={{
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}onClick={handleLogout}>
                    <IconButton size="large">
                        <ExitToApp
                            sx={{
                                color: '#2E2C32',
                                '&:hover': {
                                    color: "#0071e3"
                                }
                            }}
                        />
                    </IconButton>
                    <Typography
                        sx={{
                            '&:hover': {
                                color: "#0071e3"
                            }
                            ,fontSize:"14px"
                        }}
                    >
                        Logout
                </Typography>
                </MenuItem>
            </Menu>
        </>)
};



export default Home;