import React, { useEffect } from "react";
import { Avatar, Box, Button, Divider, Tooltip } from "@mui/material";
import { useState } from "react";
import jwtDecode from "jwt-decode";
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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Received } from "../../data/Received";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Menu from "@mui/material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import CustomizedIconButton from "../common/CustomizedIconButton";
import unviewed from "../../assets/images/unviewed1.png";
import vector from "../../assets/images/Vector (2).png";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { cardSortFieldEnum } from "../../data/cardSortFieldEnum";
const Drafts = (props) => {
  const Received1 = Received;
  const username = "Sumaja Gurlinka";
  const [timeOfDay, setTimeOfDay] = useState("");
  const maxRowsToShowWithoutScrollbar = 5;
  const maxHeight = `${maxRowsToShowWithoutScrollbar * 90}px`;
 
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [delete1, setDelete1] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [received, setReceived] = useState(Received1);
  const { user,getDraftsAsync,login, getEditAsync, getDeleteAsync} = props;
const[search,setSearch]=useState("");
const [sortKey, setSortKey] = useState(0);
  const { setEdit1 } = props;
  const [cardIdToDelete, setCardIdToDelete] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [orderBy, setOrderBy] = useState("cardSentTime");
  const [order, setOrder] = useState("ASC");
  const [sortOrder, setSortOrder] = useState("DESC");
  const base64Image = user.image;
  const open = Boolean(anchorEl);
  const columns = [
    { accessor: "Card ID", label: "Card ID" },

    { accessor: "cardSentTime", label: "Sent Time" },

    { accessor: "Receiver", label: "Receiver" },

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
  const handleCancel = () => {
    setDelete1(false);
  };

  
    const handleConfirm = async () => {
      try {
        const data = {
          cardId:cardIdToDelete  
         
       
  
        };
       
        console.log("data",data);
         await getDeleteAsync(data);
         handleDraft();
         setDelete1(false);
       
      } catch (error) {
        
      }
     
    };
  
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
 
    const handleEdit = async (cardId) => {
      try {
        const data = {
          
          cardId:cardId
       
  
        };
       
        console.log("data",data);
         await getEditAsync(data);
         navigate("/sendCard");
         setEdit1(true);
       
      } catch (error) {
        
      }
     
    };
    
   
  
  const handleDelete = (cardId) => {
    setCardIdToDelete(cardId);
    
    setDelete1(true);
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
  const handleViewCard = (index) => {
    // Create a copy of the Received1 array
    const updatedReceived1 = [...Received];

    // Toggle the 'viewed' property for the clicked row
    updatedReceived1[index].viewed = !updatedReceived1[index].viewed;

    console.log("Clicked index:", index);
    console.log("Updated Received1:", updatedReceived1);

    // Update the state of Received1 with the modified data
    setReceived(updatedReceived1);
  };
  const fetchData = async (button) => {
    try {
      if (button === "All") {
      } else if (button === "Appreciate") {
      } else if (button === "Thanking") {
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
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
  
  

 

  const buttonStyles = {
    textTransform: "none",

    marginRight: "20px",
  };
  const handleDraft = async () => {
    try {
      const token = localStorage.getItem("token");
          const userDetails = jwtDecode(token);
      const data = {
         senderName:userDetails.full_name,       
        searchText:search,
        pageNumber:page,
        pageSize:rowsPerPage,
        sortDirection:sortOrder,
        sortBy:orderBy

      };
     
      console.log("data",data);
       await getDraftsAsync(data);
     
     
    } catch (error) {
      
    }
 
  };
  useEffect(() => {
    handleDraft();
  }, [getDraftsAsync,search,rowsPerPage, page,sortOrder,orderBy ]);
 
  const handlesearch=(e)=>{
setSearch(e.target.value);
  }
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
        Drafts
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
              {login.draftsData.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      You have not saved any card yet.
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody className="custom-table-body">
                  {login?.draftsData?.cards && login?.draftsData?.cards
                   
                    .map((row, rowIndex) => {
                      // Calculate the actual index
                      const actualIndex = page * rowsPerPage + rowIndex;

                      return (
                        <TableRow
                          key={actualIndex}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#f5f5f5!important",
                            },
                            backgroundColor: "#FCFCFC",
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
                          <TableCell sx={{ padding: "8px 20px !important" }}>
                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                              <Tooltip title="Edit Card">
                                <IconButton>
                                  <EditIcon onClick={() => handleEdit(row.cardId)} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Card">
                                <IconButton>
                                  <DeleteOutlineIcon onClick={() => handleDelete(row.cardId)} />
                                 
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
          
         
          

        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={login?.draftsData?.cards?.length}
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
      <Dialog open={delete1}>
        <DialogTitle>Discard message </DialogTitle>

        <DialogContent>
          Are you sure you want to discard this draft?
        </DialogContent>

        <DialogActions>
          <Button
            style={{
              background: "#0071e3",
              color: "#FCFCFC",
              borderRadius: "8px",
              textTransform: "none",
              width: "80px",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>

          <Button
            style={{
              background: "#0071e3",
              color: "#FCFCFC",
              borderRadius: "8px",
              textTransform: "none",
              width: "80px",
            }}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  login:state.login,
});
const mapDispatchToProps = (dispatch) => ({
  setEdit1: dispatch.user.setEdit1,
  getDraftsAsync: dispatch.login.getDraftsAsync,
  getEditAsync:dispatch.edit. getEditAsync,
  getDeleteAsync:dispatch.delete1. getDeleteAsync,
});
export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
