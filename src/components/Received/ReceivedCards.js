import React, { useEffect } from "react";
import { Avatar, Box, Button, Divider, Tooltip } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import { connect } from "react-redux";
import Typography from "@mui/joy/Typography";
import {
  TextField,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import InputAdornment from "@mui/material/InputAdornment";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Received } from "../../data/Received";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Logout } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import CustomizedIconButton from "../common/CustomizedIconButton";
import download1 from "../../assets/images/download1.png";
import teamsent from "../../assets/images/teamsent.png";
import downloadall from "../../assets/images/downloadall.png";
import download from "../../assets/images/download.png";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import unviewed from "../../assets/images/un.png";
import vector from "../../assets/images/Vector (2).png";
import { receivedcards } from "../../store/receivedcards";
const ReceivedCards = (props) => {
  const Received1 = Received;
  const username = "Sumaja Gurlinka";
  const [timeOfDay, setTimeOfDay] = useState("");

  const maxRowsToShowWithoutScrollbar = 5;
  const maxHeight = `${maxRowsToShowWithoutScrollbar * 90}px`;
  
  const [selectedButton, setSelectedButton] = useState("All");
  const [page, setPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const[search,setSearch]=useState("");
  const [dialog, setDialog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [received, setReceived] = useState(Received1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, getDownloadAllAsync, getReceivedCardsAsync,receivedcards,getReceivedCardIdAsync,getReceivedAppreciationAsync,getReceivedThankingAsync } = props;
  const [data, setData] = useState([]);
  const [orderBy, setOrderBy] = useState("cardSentTime");
  const [order, setOrder] = useState("ASC");
  const [sortOrder, setSortOrder] = useState("DESC");
  const base64Image = receivedcards.receivedcardIdData.cardImage;
  const Imagecontent = receivedcards.receivedcardIdData.cardMessage;
  const token=localStorage.getItem("token");
      const userDetails = jwtDecode(token);
  const navigate = useNavigate();
  const columns = [
    { accessor: "Card ID", label: "Card ID" },
    { accessor: "cardSentTime", label: "Received Time" },
    { accessor: "Sender", label: "Sender" },
    { accessor: "Category", label: "Category" },
    { accessor: "Actions", label: "Actions" },
  ];

  const [showTextbox, setShowTextbox] = useState(false);
  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      setTimeOfDay("Good Morning");
    } else if (currentTime >= 12 && currentTime < 18) {
      setTimeOfDay("Good Afternoon");
    } else {
      setTimeOfDay("Good Evening");
    }
  }, []);
  const handleClick = () => {
    setShowTextbox(!showTextbox);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDialog = () => {
    setDialog(false);
  };
  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleView = (card) => {
    setDialog(true);
    setSelectedCard(card);
    console.log(Received1);
  };
  const handleSendClick = () => {
    navigate("/sendcard");
  };
  const handlesearch=(e)=>{
    setSearch(e.target.value);
  };
  const createSortHandler = (property) => () => {
    // Determine the sorting order (ascending or descending)
    const isAsc = orderBy === property && order === "asc";

    // Create a sorted copy of the received data based on the property and order
    const sortedData = [...received].sort((a, b) => {
      if (isAsc) {
        return a[property] < b[property] ? -1 : 1;
      } else {
        return a[property] > b[property] ? -1 : 1;
      }
    });

    // Update the state with the sorted data and order details
    setReceived(sortedData);
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

 

    const handleViewCard = async (cardId) => {
      try {
        
        const data = {
          
          cardId:cardId
       
  
        };
       
        console.log("data",data);
         await getReceivedCardIdAsync(data);
        
         setDialog(true);
         
       
      } catch (error) {
        
      }
     
    };
    const handleDownload = async (cardId) => {
      try {
        // Get the current download index from local storage or set it to 1 if it doesn't exist
       
    
        // Prepare the request data
        const data = {
          cardId: cardId,
        };
        
        // Make an API call to get the Base64 image data
         await getReceivedCardIdAsync(data);
    
       
         
         const base64Image = localStorage.getItem("base64");
         const time1 = localStorage.getItem("time");
         
         // Check if the time1 variable is a valid date
         if (new Date(time1) instanceof Date && !isNaN(new Date(time1))) {
           const link = document.createElement('a');
           link.href = `data:image/jpeg;base64,${base64Image}`;
           
           // Format the date and time as a string for the filename
           const formattedTime = new Date(time1).toLocaleString();
           
           link.setAttribute('download', `${formattedTime}.jpg`);
           
           link.click();
         } else {
           console.error('Invalid date/time value in time1');
         }
         
        
      } catch (error) {
        console.error('API request error:', error);
      }
    };
   
    const handleButtonSelect = (button) => {
      setSelectedButton(button);
    };
    


  const handleDownloadAll = async () => {
    try {
      const zipFileByteCode = await getDownloadAllAsync(); 
  
      
      const zipBlob = new Blob([zipFileByteCode], { type: 'application/zip' });

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(zipBlob);
      downloadLink.download = 'downloaded.zip'; 
  
      
      downloadLink.click();
    } catch (error) {
      
    }
  };
  const handleSort = (column, sortOrder) => {
    // Map column accessor to the corresponding sortBy value
    const sortByMapping = {
      "Card ID": "cardId",
      "Received Time": "cardSentTime",
      "Sender": "senderName",
      "Category": "category",
      "Actions": "actions",
    };
  
    // Get the corresponding sortBy value for the selected column
    const sortBy = sortByMapping[column.label];
  
    // Update the state with the new sorting values
    
    setOrderBy(sortBy);
   
    const newSortOrder = sortOrder === 'DESC' ? 'ASC' : 'DESC';
    setSortOrder(newSortOrder);
    // Send the sortDirection and sortBy to the backend API
  
  
    // Make the API request with the sorting data
    // ...
  };
  
 const handleReceived = async () => {
    try {
     
      const data = {
        searchText: search || userDetails.full_name,
      
        pageNumber:page,
        pageSize:rowsPerPage,
        sortDirection:sortOrder,
        sortBy:orderBy

      };
     
      console.log("data",data);
       await  getReceivedCardsAsync(data);
     
     
    } catch (error) {
      
    }
 
  };
  useEffect(() => {
    // Define a function to fetch data based on the selected button
    const fetchDataBasedOnButton = async () => {
      try {
        if (selectedButton === "All") {
          // Fetch data for "All" button
          const token = localStorage.getItem("token");
          const userDetails = jwtDecode(token);
          const data = {
            receiverName:userDetails.full_name ,
            searchText: search ,
            pageNumber: page,
            pageSize: rowsPerPage,
            sortDirection: sortOrder,
            sortBy: orderBy,
          };
          await getReceivedCardsAsync(data);
        } else if (selectedButton === "Appreciation") {
          // Fetch data for "Appreciation" button
          const token = localStorage.getItem("token");
          const userDetails = jwtDecode(token);
          const data = {
            receiverName: userDetails.full_name,
            category: "Appreciation",
            searchText: search ,
            pageNumber: page,
            pageSize: rowsPerPage,
            sortDirection: sortOrder,
            sortBy: orderBy,
          };
          await getReceivedAppreciationAsync(data);
        } else if (selectedButton === "Thanking") {
          // Fetch data for "Thanking" button
          const token = localStorage.getItem("token");
          const userDetails = jwtDecode(token);
          const data = {
            receiverName: userDetails.full_name,
            category: "Thanking",
            searchText: search ,
            pageNumber: page,
            pageSize: rowsPerPage,
            sortDirection: sortOrder,
            sortBy: orderBy,
          };
          await getReceivedThankingAsync(data);
        }
      } catch (error) {
        // Handle error
      }
    };
  
    // Call the fetchDataBasedOnButton function when search changes
    fetchDataBasedOnButton();
  }, [search, selectedButton,rowsPerPage, page,sortOrder,orderBy]);
  
  // useEffect(()=>{
  // getReceivedCardsAsync();
  // },[]);
  const buttonStyles = {
    textTransform: "none",

    marginRight: "20px",
  };

  return (
    <Box
      className="signup1_container"
      style={{
        background: "#f5f5f5",
        width: "100vw",
        height: "100vh",
        marginTop: "60px",
        paddingTop: "14px",
      }}
    >
      {/* <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <Typography
          level="title-md"
          sx={{
            color: "black",
            fontSize: "20px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: "bold",
            marginLeft: "30px",
            marginBottom: "4px",
          }}
        >
          Received Cards
        </Typography>
        <Box sx={{ display: "flex", flexwrap: "wrap" }}>
        
          <div style={{position:"absolute",top:"11px",right:"370px"}}>
          <TextField
    sx={{
    
      padding: "0px",
      marginLeft: "20px",
      "& label.Mui-focused": {
        color: "#8B5CF6",
      },
      "& .MuiOutlinedInput-root": {
        height: "34px",
        width: "200px",
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
    
  /></div>
  <Box style={{position:"absolute",top:"12px",right:"320px",background:"#0071e3",padding:"0px",borderRadius:"4px"}}>
     
    <IconButton sx={{color:"#FCFCFC"}}>
       
          <SearchIcon />
      
     
          </IconButton>
 
          </Box>
          <Typography
            level="title-md"
            sx={{
              fontSize: "16px",
              fontFamily: "Manrope, sans-serif",
              color: "black",
            
              marginRight: "90px",
            }}
          >
            Welcome, {username}
          </Typography>
          <Tooltip title="Account Settings">
            <Avatar
              sx={{
                width: "32px",
                height: "30px",
                position: "absolute",
                top: "12px",
                right: "35px",
                fontSize: "15px",color:"black"
              }}
              onClick={handleAvatarClick}
            >
              SG
            </Avatar>
          </Tooltip>
        </Box>
      </Box> */}
      {/* <Box
        style={{
          fontSize: "16px",
          marginTop: "8px",
          marginLeft: "30px",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        {timeOfDay}
      </Box> */}
      <Typography
        level="title-md"
        sx={{
          color: "black",
          fontSize: "20px",
          fontFamily: "Manrope, sans-serif",
          fontWeight: "bold",
          marginLeft: "30px",
          marginBottom: "4px",
        }}
      >
        Received Cards
      </Typography>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "5px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14.5px",
            width: "520px",
            fontFamily: "Manrope, sans-serif",
            marginLeft: "30px",
            marginTop: "5px",
            "@media (max-width: 600px)": {
              fontsize: "2px",
            },
          }}
        >
          Appreciation can change a day, even change a life. Your willingness to
          put it into words is all that is necessary. — Margaret Cousins
        </Typography>
       
        <Box
          sx={{
            padding: "0px !important",
            display: "flex",
            height: "30px",

            flexWrap: "wrap",

            justifyContent: "flex-end",

            marginRight: "32px",
          }}
        >
          {" "}
          <Tooltip title="Send Card">
            <Button
              style={{
                background: "#0071e3",
                color: "white",
                padding: "0px",
                height: "35px",
                textTransform: "none",
                borderRadius: "6px",
                width: "120px",
              }}
              onClick={handleSendClick}
            >
              <MailIcon
                sx={{
                  marginLeft: "0px",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#FCFCFC",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {" "}
                Send Card
              </Typography>
            </Button>
          </Tooltip>{" "}
          <Tooltip title="Download All Cards">
            <img
              src={download}
              style={{
                fontsize: "30px",
                marginTop: "3px",
                marginLeft: "20px",
                width: "1.75em",
                height: "1.75em",
              }}
              onClick={handleDownloadAll}
            ></img>
          </Tooltip>
        </Box>  
       
      </Box>
     
       
      <Box
        sx={{
          marginLeft: "30px",
          marginRight: "30px",
          marginTop: "14px",
          marginBottom: "10px",
        }}
      >
        <TableContainer
          component={Paper}
          style={{
            maxHeight,

            // '@media (maxWidth: 768px)': {
            //   maxWidth: '300px',
            // },
          }}
        >
          <div
            style={{
              display: "flex",
              marginTop: "5px",
              marginBottom: "5px",
              alignItems: "center",
              marginRight: "20px",
              fontWeight: "bold",
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                flex: "0 0 auto",
                marginLeft: "22px",
                marginTop: "10px",
              }}
            >
              <Button
                onClick={() => handleButtonSelect("All")}
                style={{
                  ...buttonStyles,
                  backgroundColor:
                    selectedButton === "All" ? "#ECF5FF" : "transparent",
                  color: selectedButton === "All" ? "#0071E3" : "#3F3F3F",
                }}
              >
                All({receivedcards?.receivedcardsData?.dataValues?.Appreciation}
)
              </Button>
              <Button
                onClick={() => handleButtonSelect("Appreciation")}
                style={{
                  ...buttonStyles,
                  backgroundColor:
                    selectedButton === "Appreciation" ? "#ECF5FF" : "transparent",
                  color:
                    selectedButton === "Appreciation" ? "#0071E3" : "#3F3F3F",
                }}
              >
                Appreciation({receivedcards?.receivedcardsData?.dataValues?.Appreciation} 
)
              </Button>
              <Button
                onClick={() => handleButtonSelect("Thanking")}
                style={{
                  textTransform: "none",
                  backgroundColor:
                    selectedButton === "Thanking" ? "#ECF5FF" : "transparent",
                  color: selectedButton === "Thanking" ? "#0071E3" : "#3F3F3F",
                }}
              >
                Thanking({receivedcards?.receivedcardsData?.dataValues?.Thanking} 
)
              </Button>
            </Box>
            <TextField
              sx={{
                marginTop: "10px",
                padding: "0px",
                marginLeft: "20px",
                "& label.Mui-focused": {
                  color: "#8B5CF6",
                },
                "& .MuiOutlinedInput-root": {
                  height: "45px",
                  width: "350px",
                  borderColor: "transparent",
                  "&:hover fieldset": {
                    borderColor: "#0071e3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0071e3",
                  },
                },
              }}
              placeholder="Search by sender..."
              variant="outlined"
              value={search}
              onChange={handlesearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {selectedButton === "All" && (
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      sx={{
                        padding: "12px 32px !important",
                        fontWeight: "600",
                        position: "sticky",
                        background: "#FCFCFC",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      <TableSortLabel
                         active={orderBy === column.accessor}
                        
                        direction={sortOrder === 'DESC' ? 'desc' : 'asc'}
                        onClick={() => handleSort(column,sortOrder)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {receivedcards?.receivedcardsData?.cards?.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      You have not received any card yet.
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody className="custom-table-body">
                  {receivedcards?.receivedcardsData?.cards && receivedcards?.receivedcardsData?.cards
                    .map((row, rowIndex) => {
                    
                      const actualIndex = page * rowsPerPage + rowIndex;

                      return (
                       
                        <TableRow
                          key={actualIndex}
                          sx={{
                            "&:hover": {
                              backgroundColor: row.state==="VIEWED"
                                ? "#f5f5f5!important"
                                : "#e0e0e087",
                            },
                            backgroundColor: row.state==="VIEWED"? "#FCFCFC" : "#F4F9FF",
                          }}
                        >
                          <TableCell
                            sx={{
                              fontWeight: row.state==="VIEWED" ? "" : "bold",
                              color:row.state==="VIEWED" ? "" : "#0071E3",
                            }}
                          >
                            {row.state==="VIEWED"? (
                              <Tooltip title="Viewed">
                                {" "}
                                <IconButton sx={{ padding: "0px" }}>
                                  <DraftsOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : 
                            (
                              <Tooltip title="Unviewed">
                                <IconButton
                                  sx={{
                                    padding: "0px",
                                    marginLeft: "5px",
                                    marginRight: "7px",
                                  }}
                                >
                                  <img
                                    src={unviewed}
                                    style={{ width: "20px", height: "1em" }}
                                  />
                                </IconButton>
                              </Tooltip>
                            )}
                           {row.cardId}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                          {new Date(row.cardSentTime).toLocaleString()}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight:row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                       {row.senderName}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight:row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                           {row.category}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "8px 20px !important",
                              fontWeight:row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                              {row.state==="VIEWED" ? (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(row.cardId)}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                              ) :
                               (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(row.cardId)}
                                    sx={{
                                      marginLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    <img src={vector}></img>
                                  </IconButton>
                                </Tooltip>
                              )}
                            
                                <Tooltip title="Download Card">
                                  {/* <a
                                    href={`data:image/jpeg;base64,${base64Image}`}
                                    download={`${row.name}_${row.card}.jpg`}
                                  > */}
                                    <IconButton>
                                      <DownloadIcon  onClick={() => handleDownload(row.cardId)}/>
                                    </IconButton>
                              
                                </Tooltip>
                             
                             
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          )}
          {selectedButton === "Appreciation" && (
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      sx={{
                        padding: "12px 32px !important",
                        fontWeight: "600",
                        position: "sticky",
                        background: "#FCFCFC",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      <TableSortLabel
                         active={orderBy === column.accessor}
                        
                        direction={sortOrder === 'DESC' ? 'desc' : 'asc'}
                        onClick={() => handleSort(column,sortOrder)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {receivedcards?.receivedAppreciationData?.cards?.length=== 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      You have not received any card yet.
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody className="custom-table-body">
                  {receivedcards?.receivedAppreciationData?.cards && receivedcards?.receivedAppreciationData?.cards
                  
                    .map((row, rowIndex) => {
                      // Calculate the actual index
                      const actualIndex = page * rowsPerPage + rowIndex;

                      return (
                       
                        <TableRow
                          key={actualIndex}
                          sx={{
                            "&:hover": {
                              backgroundColor: row.state==="VIEWED"
                                ? "#f5f5f5!important"
                                : "#e0e0e087",
                            },
                            backgroundColor: row.state==="VIEWED"? "#FCFCFC" : "#F4F9FF",
                          }}
                        >
                          <TableCell
                            sx={{
                              fontWeight: row.state==="VIEWED" ? "" : "bold",
                              color:row.state==="VIEWED" ? "" : "#0071E3",
                            }}
                          >
                            {row.state==="VIEWED"? (
                              <Tooltip title="Viewed">
                                {" "}
                                <IconButton sx={{ padding: "0px" }}>
                                  <DraftsOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : 
                            (
                              <Tooltip title="Unviewed">
                                <IconButton
                                  sx={{
                                    padding: "0px",
                                    marginLeft: "5px",
                                    marginRight: "7px",
                                  }}
                                >
                                  <img
                                    src={unviewed}
                                    style={{ width: "20px", height: "1em" }}
                                  />
                                </IconButton>
                              </Tooltip>
                            )}
                           {row.cardId}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                          {new Date(row.cardSentTime).toLocaleString()}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight:row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                       {row.senderName}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight:row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                           {row.category}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "8px 20px !important",
                              fontWeight:row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                              {row.state==="VIEWED" ? (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(row.cardId)}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                              ) :
                               (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(row.cardId)}
                                    sx={{
                                      marginLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    <img src={vector}></img>
                                  </IconButton>
                                </Tooltip>
                              )}
                            
                                <Tooltip title="Download Card">
                                  {/* <a
                                    href={`data:image/jpeg;base64,${base64Image}`}
                                    download={`${row.name}_${row.card}.jpg`}
                                  > */}
                                    <IconButton>
                                      <DownloadIcon  onClick={() => handleDownload(row.cardId)}/>
                                    </IconButton>
                              
                                </Tooltip>
                             
                             
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          )}
          {selectedButton === "Thanking" && (
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      sx={{
                        padding: "12px 32px !important",
                        fontWeight: "600",
                        position: "sticky",
                        background: "#FCFCFC",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                       <TableSortLabel
                         active={orderBy === column.accessor}
                        
                        direction={sortOrder === 'DESC' ? 'desc' : 'asc'}
                        onClick={() => handleSort(column,sortOrder)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {receivedcards?.receivedThankingData?.cards?.length=== 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      You have not received any card yet.
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody className="custom-table-body">
                  {receivedcards?.receivedThankingData?.cards && receivedcards?.receivedThankingData?.cards
                    
                    .map((row, rowIndex) => {
                      // Calculate the actual index
                      const actualIndex = page * rowsPerPage + rowIndex;

                      return (
                       
                        <TableRow
                          key={actualIndex}
                          sx={{
                            "&:hover": {
                              backgroundColor: row.state==="VIEWED"
                                ? "#f5f5f5!important"
                                : "#e0e0e087",
                            },
                            backgroundColor: row.state==="VIEWED"? "#FCFCFC" : "#F4F9FF",
                          }}
                        >
                          <TableCell
                            sx={{
                              fontWeight: row.state==="VIEWED" ? "" : "bold",
                              color:row.state==="VIEWED" ? "" : "#0071E3",
                            }}
                          >
                            {row.state==="VIEWED"? (
                              <Tooltip title="Viewed">
                                {" "}
                                <IconButton sx={{ padding: "0px" }}>
                                  <DraftsOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : 
                            (
                              <Tooltip title="Unviewed">
                                <IconButton
                                  sx={{
                                    padding: "0px",
                                    marginLeft: "5px",
                                    marginRight: "7px",
                                  }}
                                >
                                  <img
                                    src={unviewed}
                                    style={{ width: "20px", height: "1em" }}
                                  />
                                </IconButton>
                              </Tooltip>
                            )}
                           {row.cardId}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                          {new Date(row.cardSentTime).toLocaleString()}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight:row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                       {row.senderName}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight:row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                           {row.category}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "8px 20px !important",
                              fontWeight:row.state==="VIEWED" ? "" : "bold",
                            }}
                          >
                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                              {row.state==="VIEWED" ? (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(row.cardId)}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                              ) :
                               (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(row.cardId)}
                                    sx={{
                                      marginLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    <img src={vector}></img>
                                  </IconButton>
                                </Tooltip>
                              )}
                            
                                <Tooltip title="Download Card">
                                  {/* <a
                                    href={`data:image/jpeg;base64,${base64Image}`}
                                    download={`${row.name}_${row.card}.jpg`}
                                  > */}
                                    <IconButton>
                                      <DownloadIcon  onClick={() => handleDownload(row.cardId)}/>
                                    </IconButton>
                              
                                </Tooltip>
                             
                             
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={
            selectedButton === "All"
              ? receivedcards?.receivedcardsData?.cards?.length
              : selectedButton === "Appreciation"
              ?  receivedcards?.receivedAppreciationData?.cards?.length
              : selectedButton === "Thanking"
              ?  receivedcards?.receivedThankingData?.cards?.length
              : 0 // Default count value
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    
      <Menu
        placement="bottom-end"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{ marginTop: "1.43em" }}
      >
        <MenuItem>
          <div>
            <Typography sx={{ color: "black" }}>Sumaja Gurlinka</Typography>
            <Typography sx={{ fontSize: "14px", marginTop: "5px" }}>
              Associate
            </Typography>
            <Typography sx={{ color: "black" }}>
              sumajagurlinka22@gmail.com
            </Typography>
          </div>
        </MenuItem>

        <Divider></Divider>
        <MenuItem>
          {" "}
          <ListItemIcon sx={{ marginRight: "5px", fontSize: "20px" }}>
            <Logout size="sm" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Dialog open={dialog}>
        <DialogContent
          style={{
            width: "300px",
            height: "300px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: base64Image
              ? `url(data:image/jpeg;base64,${base64Image})`
              : "none",
          }}
        >
          <p style={{ color: "#FCFCFC" }}>
           {Imagecontent}
          </p>
          <Tooltip title="Close">
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
              sx={{
                position: "absolute",
                top: "10px",
                right: "15px",
                color: "#FCFCFC",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  receivedcards:state.receivedcards
});
const mapDispatchToProps = (dispatch) => ({
  getDownloadAllAsync: dispatch.login.getDownloadAllAsync,
  getReceivedCardsAsync:dispatch.receivedcards.getReceivedCardsAsync,
  getReceivedCardIdAsync:dispatch.receivedcards.getReceivedCardIdAsync,
  getReceivedAppreciationAsync:dispatch.receivedcards.getReceivedAppreciationAsync,
  getReceivedThankingAsync:dispatch.receivedcards.getReceivedThankingAsync,
});
export default connect(mapStateToProps, mapDispatchToProps)(ReceivedCards);
