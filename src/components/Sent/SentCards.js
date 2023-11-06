import React, { useEffect } from "react";
import { Avatar, Box, Button, Divider, Tooltip } from "@mui/material";
import { useState } from "react";
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
import InputAdornment from "@mui/material/InputAdornment";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Received } from "../../data/Received";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Menu from "@mui/material/Menu";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
import MenuItem from "@mui/material/MenuItem";
import { Logout } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { IconButton } from "@mui/material";
import CustomizedIconButton from "../common/CustomizedIconButton";
import unviewed from "../../assets/images/unviewed1.png";
import vector from "../../assets/images/Vector (2).png";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
const SentCards=(props)=> {
  const Received1 = Received;
  const username = "Sumaja Gurlinka";
  const [timeOfDay, setTimeOfDay] = useState("");
  const maxRowsToShowWithoutScrollbar = 5;
  const maxHeight = `${maxRowsToShowWithoutScrollbar * 90}px`;
  const [sortOrder, setSortOrder] = useState("DESC");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedButton, setSelectedButton] = useState("All");
  const [received, setReceived] = useState(Received1);
  const[search,setSearch]=useState("");
  const [dialog, setDialog] = useState(false);
  const { user,getSentCardsAsync ,sentcards,getSentThankingAsync,getSentAppreciationAsync,getSentCardIdAsync} = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [orderBy, setOrderBy] = useState("cardSentTime");
  const [order, setOrder] = useState("asc");
  const base64Image = sentcards.sentcardIdData.cardImage;
  const Imagecontent = sentcards.sentcardIdData.cardMessage;
  const open = Boolean(anchorEl);
  const token=localStorage.getItem("token");
  const userDetails = jwtDecode(token);
  const columns = [
    { accessor: "Card ID", label: "Card ID" },

    { accessor: "cardSentTime", label: "Sent Time" },

    { accessor: "Receiver", label: "Receiver" },

    { accessor: "Category", label: "Category" },

    { accessor: "Actions", label: "Actions" },
  ];

  const [showTextbox, setShowTextbox] = useState(false);
 
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
  const handlesearch=(e)=>{
    setSearch(e.target.value);
  };
  const handleViewCard = async (cardId) => {
    try {
      
      const data = {
        
        cardId:cardId
     

      };
     
      console.log("data",data);
       await getSentCardIdAsync(data);
      
       setDialog(true);
       
     
    } catch (error) {
      
    }
  };
  // const handleViewCard = (index) => {
  //   // Create a copy of the Received1 array
  //   const updatedReceived1 = [...Received];

  //   // Toggle the 'viewed' property for the clicked row
  //   updatedReceived1[index].viewed = !updatedReceived1[index].viewed;

  //   console.log("Clicked index:", index);
  //   console.log("Updated Received1:", updatedReceived1);

  //   // Update the state of Received1 with the modified data
  //   setReceived(updatedReceived1);
  // };
  const handleButtonSelect = (button) => {
    setSelectedButton(button);
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
            senderName:userDetails.full_name ,
            searchText: search ,
            pageNumber: page,
            pageSize: rowsPerPage,
            sortDirection: sortOrder,
            sortBy: orderBy,
          };
          await getSentCardsAsync(data);
        } else if (selectedButton === "Appreciation") {
          // Fetch data for "Appreciation" button
          const token = localStorage.getItem("token");
          const userDetails = jwtDecode(token);
          const data = {
            senderName: userDetails.full_name,
            category: "Appreciation",
            searchText: search ,
            pageNumber: page,
            pageSize: rowsPerPage,
            sortDirection: sortOrder,
            sortBy: orderBy,
          };
          await getSentAppreciationAsync(data);
        } else if (selectedButton === "Thanking") {
          // Fetch data for "Thanking" button
          const token = localStorage.getItem("token");
          const userDetails = jwtDecode(token);
          const data = {
            senderName: userDetails.full_name,
            category: "Thanking",
            searchText: search ,
            pageNumber: page,
            pageSize: rowsPerPage,
            sortDirection: sortOrder,
            sortBy: orderBy,
          };
          console.log(data);
          await getSentThankingAsync(data);
        }
      } catch (error) {
        // Handle error
      }
    };
  
    // Call the fetchDataBasedOnButton function when search changes
    fetchDataBasedOnButton();
  }, [search, selectedButton,rowsPerPage, page,sortOrder,orderBy]);
 


  const buttonStyles = {
    textTransform: "none",
   
    marginRight: "20px",
    
  };
  const handleSort = (column, sortOrder) => {
    // Map column accessor to the corresponding sortBy value
    const sortByMapping = {
      "Card ID": "cardId",
      "Sent Time": "cardSentTime",
      "Receiver": "receiverName",
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
  const handleSent = async () => {
    try {
      const data = {
        
       
        searchText:userDetails.full_name,
        pageNumber:page,
        pageSize:rowsPerPage,
        sortDirection:sortOrder,
        sortBy:orderBy

      };
     
      console.log("data",data);
       await  getSentCardsAsync(data);
     
     
    } catch (error) {
      
    }
 
  };

  return (
    <Box
      className="signup2_container"
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
        Sent Cards
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
        {/* <Box
          sx={{
            height: "45px",
            display: "flex",

            flexWrap: "wrap",

            justifyContent: "flex-end",

            marginRight: "32px",
          }}
        >
          <Button
            style={{
              textTransform: "none",

              background: "#0071e3",

              color: "#FCFCFC",

              gap: "10px",

              borderRadius: "6px",
            }}
          >
            <CloudDownloadIcon />

            <Typography sx={{ color: "#FCFCFC" }}>Download All</Typography>
          </Button>
        </Box> */}
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
    marginRight:"20px",
    fontWeight: "bold",
    justifyContent: "space-between", 
  }}
>
<Box style={{ flex: "0 0 auto", marginLeft: "22px", marginTop: "10px" }}>
      <Button
        onClick={() => handleButtonSelect("All")}
        style={{
          ...buttonStyles,
          backgroundColor: selectedButton === "All" ? "#ECF5FF" : "transparent",
          color: selectedButton === "All" ? "#0071E3" : "#3F3F3F",
        }}
      >
        All({sentcards?.sentcardsData?.dataValues?.Appreciation})
      </Button>
      <Button
        onClick={() => handleButtonSelect("Appreciation")}
        style={{
          ...buttonStyles,
          backgroundColor: selectedButton === "Appreciation" ? "#ECF5FF" : "transparent",
          color: selectedButton === "Appreciation" ? "#0071E3" : "#3F3F3F",
        }}
      >
        Appreciation({sentcards?.sentcardsData?.dataValues?.Appreciation})
      </Button>
      <Button
        onClick={() => handleButtonSelect("Thanking")}
        style={{
      textTransform:"none",
          backgroundColor: selectedButton === "Thanking" ? "#ECF5FF" : "transparent",
          color: selectedButton === "Thanking" ? "#0071E3" : "#3F3F3F",
        }}
      >
        Thanking({sentcards?.sentcardsData?.dataValues?.Thanking})
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
    placeholder="Search by receiver..."
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

{selectedButton==="All"&&(
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
          {sentcards?.sentcardsData?.cards?.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  You have not sent any card yet.
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody className="custom-table-body">
 {sentcards?.sentcardsData?.cards && sentcards?.sentcardsData?.cards
                
              .map((row, rowIndex) => {
                  // Calculate the actual index
                  const actualIndex = page * rowsPerPage + rowIndex;

                  return (
                    <TableRow
                      key={actualIndex}
                      sx={{
                        "&:hover": {
                          backgroundColor:
                            "#f5f5f5!important"
                         
                        },
                        backgroundColor: "#FCFCFC" ,
                      }}
                    >
                      <TableCell
                        sx={{
                          padding: "12px 32px !important",
                         
                         
                        }}
                      >
                        
                        {row.cardId}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "12px 32px !important",
                         
                         
                        }}
                      >
                        {new Date(row.cardSentTime).toLocaleString()}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "12px 32px !important",
                         
                        }}
                      >
                        {row.receiverName}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "12px 32px !important",
                        
                        }}
                      >
                        {row.category}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "8px 36px !important",
                        
                        }}
                      >
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                         <Tooltip title="View Card">
                            <IconButton
                               onClick={() => handleViewCard(row.cardId)}
                            >
                          <VisibilityIcon/>
                            </IconButton>
                          </Tooltip>
                        
                          
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>)}
          {selectedButton==="Appreciation"&&(
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
           {sentcards?.sentAppreciationData?.cards?.length === 0 ? (
             <TableBody>
               <TableRow>
                 <TableCell colSpan={columns.length} align="center">
                   You have not sent any card yet.
                 </TableCell>
               </TableRow>
             </TableBody>
           ) : (
             <TableBody className="custom-table-body">
  {sentcards?.sentAppreciationData?.cards && sentcards?.sentAppreciationData?.cards
                 
               .map((row, rowIndex) => {
                   // Calculate the actual index
                   const actualIndex = page * rowsPerPage + rowIndex;
 
                   return (
                     <TableRow
                       key={actualIndex}
                       sx={{
                         "&:hover": {
                           backgroundColor:
                             "#f5f5f5!important"
                          
                         },
                         backgroundColor: "#FCFCFC" ,
                       }}
                     >
                       <TableCell
                         sx={{
                           padding: "12px 32px !important",
                          
                          
                         }}
                       >
                         
                         {row.cardId}
                       </TableCell>
                       <TableCell
                         sx={{
                           padding: "12px 32px !important",
                          
                          
                         }}
                       >
                         {new Date(row.cardSentTime).toLocaleString()}
                       </TableCell>
                       <TableCell
                         sx={{
                           padding: "12px 32px !important",
                          
                         }}
                       >
                         {row.receiverName}
                       </TableCell>
                       <TableCell
                         sx={{
                           padding: "12px 32px !important",
                         
                         }}
                       >
                         {row.category}
                       </TableCell>
                       <TableCell
                         sx={{
                           padding: "8px 36px !important",
                         
                         }}
                       >
                         <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                          <Tooltip title="View Card">
                             <IconButton
                                 onClick={() => handleViewCard(row.cardId)}
                             >
                           <VisibilityIcon/>
                             </IconButton>
                           </Tooltip>
                         
                           
                         </Box>
                       </TableCell>
                     </TableRow>
                   );
                 })}
             </TableBody>
           )}
         </Table>)}
          {selectedButton==="Thanking"&&(
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
            {sentcards?.sentThankingData?.cards?.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    You have not sent any card yet.
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody className="custom-table-body">
   {sentcards?.sentThankingData?.cards && sentcards?.sentThankingData?.cards
                  
                .map((row, rowIndex) => {
                    // Calculate the actual index
                    const actualIndex = page * rowsPerPage + rowIndex;
  
                    return (
                      <TableRow
                        key={actualIndex}
                        sx={{
                          "&:hover": {
                            backgroundColor:
                              "#f5f5f5!important"
                           
                          },
                          backgroundColor: "#FCFCFC" ,
                        }}
                      >
                        <TableCell
                          sx={{
                            padding: "12px 32px !important",
                           
                           
                          }}
                        >
                          
                          {row.cardId}
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "12px 32px !important",
                           
                           
                          }}
                        >
                          {new Date(row.cardSentTime).toLocaleString()}
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "12px 32px !important",
                           
                          }}
                        >
                          {row.receiverName}
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "12px 32px !important",
                          
                          }}
                        >
                          {row.category}
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "8px 36px !important",
                          
                          }}
                        >
                          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                           <Tooltip title="View Card">
                              <IconButton
                                  onClick={() => handleViewCard(row.cardId)}
                              >
                            <VisibilityIcon/>
                              </IconButton>
                            </Tooltip>
                          
                            
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            )}
          </Table>)}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={
            selectedButton === "All"
              ?sentcards?.sentcardsData?.cards?.length
              : selectedButton === "Appreciation"
              ? sentcards?.sentAppreciationData?.cards?.length
              : selectedButton === "Thanking"
              ?  sentcards?.sentThankingData?.cards?.length
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
}

const mapStateToProps = (state) => ({
  user: state.user,
  sentcards:state.sentcards
});
const mapDispatchToProps = (dispatch) => ({
 
  getSentCardsAsync:dispatch.sentcards.getSentCardsAsync,
  getSentAppreciationAsync:dispatch.sentcards.getSentAppreciationAsync,
  getSentThankingAsync:dispatch.sentcards.getSentThankingAsync,
  getSentCardIdAsync:dispatch.sentcards.getSentCardIdAsync
});


export default connect(mapStateToProps,mapDispatchToProps)(SentCards);
