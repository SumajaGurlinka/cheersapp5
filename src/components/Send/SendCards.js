import { useEffect } from "react";
import React, { useState, useRef } from "react";
import { Radio } from "@mui/joy";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReactQuill from "react-quill";
import html2canvas from 'html2canvas';

import jwtDecode from "jwt-decode";
import Autocomplete from '@material-ui/lab/Autocomplete';
import "react-quill/dist/quill.snow.css";
import { Box, Divider } from "@mui/material";
import { toast } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/joy/Typography";
import { TextField, Paper, Avatar, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Associates } from "../../data/Associates";
import { Category } from "../../data/Category";
import { Select, FormControl, InputLabel } from "@mui/material";
import { IconButton } from "@mui/material";
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom';
const Category1 = Category;
const styles = {
  scrollbar: {
    width: "8px",
  },
  thumb: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
  },
};

// function CustomPlaceholder() {
//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//       }}
//     ></div>
//   );
// }
const SendCards=(props)=> {
  const username = "Sumaja Gurlinka";
  const navigate = useNavigate();
  const appreciate="appreciate";
  const location = useLocation();
  const { user,setEdit1,getSubmitAsync,getSaveAsync,edit,login,getAssociateAsync,associate} = props;
  const [searchText, setSearchText] = useState();
  const [timeOfDay, setTimeOfDay] = useState("");
  const [sortOrder, setSortOrder] = useState(true);
  const [page, setPage] = useState(0);
  const [associates, setAssociates] = useState();
  const [category, setCategory] = useState(Category1[0]);
  const [showPreview, setShowPreview] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");
  const quillRef = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showClearButton, setShowClearButton] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [showTextbox, setShowTextbox] = useState(false);
const[confirm,setConfirm]=useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const maxCharacterLimit = 1000;
  const [readOnly, setReadOnly] = useState(false);
  const [remainingCharacters, setRemainingCharacters] =
    useState(maxCharacterLimit);
    const ass=associate.associateName;
  const [selectedThemeBackground, setSelectedThemeBackground] = useState("");
  
  const [formValues, setFormValues] = useState({
    subject: {
      value: "",
      error: false,
    },
  });

  const themes = [
    {
      name: "Theme 1",
      background:
        "https://th.bing.com/th/id/OIP.bl5aVQ1KQRCZks1DB2iuRwHaEo?w=270&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
      name: "Theme 2",
      background:
        "https://th.bing.com/th/id/OIP.HuEUrfP29dNvoD2Y3QJ1lQHaEo?w=260&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
      name: "Theme 3",
      background: "https://wallpapercave.com/wp/wp2308442.jpg",
    },
  ];
  // const handleThemeChange = (themeName) => {
  //   const theme = themes.find((theme) => theme.name === themeName);

  //   setSelectedTheme(themeName);

  //   if (quillRef.current && theme) {
  //     setSelectedThemeBackground(theme.background);
  //     console.log("Selected Theme:", theme);
  //     console.log("Theme Background URL:", theme.background);

  //     const editor = quillRef.current.getEditor();

  //     // Apply background image styling for the editor's root element
  //     editor.root.style.backgroundColor = "rgba(255, 255, 255, 0.5)"; // Set a semi-transparent white background
  //     editor.root.style.backgroundImage = `url("${theme.background}")`;
  //     editor.root.style.backgroundRepeat = "no-repeat";
  //     editor.root.style.backgroundSize = "100% auto"; // Resize background image as needed
  //   } else {
  //     // Remove the background image and reset background color if no theme is selected
  //     const editor = quillRef.current.getEditor();
  //     editor.root.style.backgroundImage = "";
  //     editor.root.style.backgroundColor = "white"; // Set a default background color if needed
  //   }
  // };
 
  // useEffect(() => {
  //   handleThemeChange("Theme 1");
  // // Set the default theme name here
  // }, []);
  const canvasRef = useRef(null);
  useEffect(() => {
    function drawHTMLContentOnCanvas(canvas, htmlContent) {
      const context = canvas.getContext('2d');

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Create a new div element and set its inner HTML
      const div = document.createElement('div');
      div.innerHTML = htmlContent;

      // Position the div off-screen
      div.style.position = 'absolute';
      div.style.left = '-9999px';
      div.style.top = '-9999px';

      // Append the div to the document
      document.body.appendChild(div);

      // Use getComputedStyle to get the computed styles of the div
      const computedStyle = getComputedStyle(div);

      // Set the canvas styles
      canvas.style.font = computedStyle.font;
      canvas.style.color = computedStyle.color;

      // Draw the HTML content onto the canvas
      context.drawImage(div, 0, 0);

      // Remove the temporary div
      document.body.removeChild(div);
    }

    if (canvasRef.current) {
      drawHTMLContentOnCanvas(canvasRef.current, editorHtml);
    }
  }, [editorHtml]);

  useEffect(() => {
   
    console.log("searchtext",searchText); // Set the default theme name here
  }, [searchText]);
  const handleEdit=()=>{
    if (user.edit1) {
      setSearchText(edit.editData.receiverName);
      setCategory(edit.editData.category);
      setEditorHtml(edit.editData.cardMessage);
    }
  };
  useEffect(() => {
    // This effect will run when user.Edit1 changes to true
  handleEdit()
  }, [user.edit1]);
  const captureAndSendScreenshot = () => {
    const dialog = document.getElementById('preview-dialog'); // Replace 'preview-dialog' with the actual ID of your dialog content
  
    // Check if the dialog element exists
    if (dialog) {
      html2canvas(dialog).then((canvas) => {
        const screenshotData = canvas.toDataURL('image/png');
  
        // Send the screenshot to your API using a POST request
        // Replace 'your-api-endpoint' with the actual endpoint
        fetch('your-api-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ screenshot: screenshotData }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Screenshot sent to the API:', data);
            // Handle the API response as needed
          })
          .catch((error) => {
            console.error('Error sending screenshot:', error);
            // Handle the error
          });
      });
    }
  };
  
  
  useEffect(() => {
    const handleAssociate = async () => {
      try {
        // Ensure there is a value in searchText before making the API call
        if (searchText) {
          const data = {
            associateName: searchText
          };
          console.log("data", data);
          await getAssociateAsync(data);
        }
      } catch (error) {
        // Handle errors as needed
      }
    };

    // Call the handleAssociate function whenever searchText changes
    handleAssociate();
  }, [searchText]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input field is 'subject' and its length is greater than 50
    if (name === "subject" && value.length > 50) {
      // Truncate the value to 50 characters
      const truncatedValue = value.slice(0, 50);

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: {
          ...prevFormValues[name],
          value: truncatedValue, // Set the truncated value
          error: false,
        },
      }));
    } else {
      // Set the value as usual for other cases
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: {
          ...prevFormValues[name],
          value,
          error: false,
        },
      }));
    }

    // Set setShowClearButton to true when the user starts entering text
    setShowClearButton(false);
  };

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
   console.log("ass",searchText);
  }, [searchText]);

  // const handleClick = () => {
  //   setShowTextbox(!showTextbox);
  // };
  const handleChange1 = (html) => {
    // Create a temporary DOM element (e.g., a <div>) to parse the HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    // Extract the text content from the temporary element
    const textContent = tempElement.textContent;

    console.log(textContent); // Output: Extracted plain text content

    if (textContent.length <= maxCharacterLimit) {
      setEditorHtml(html);
      setRemainingCharacters(maxCharacterLimit - textContent.length);
    } else {
      // If the character limit is reached, prevent further editing
      // You can add a condition to check if the editor is not already read-only
      if (!readOnly) {
        setReadOnly(true);
      }
    }
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleCancel=()=>{
setConfirm(true);
  };
  const handleClearClick = () => {
    setEditorHtml("");
    if (quillRef.current) {
      quillRef.current.getEditor().setText("");
    }
  };
const handleAssociateChange=(e)=>{
  setAssociates(e.target.value);
};

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
          const userDetails = jwtDecode(token);
      const data = {
        senderName:userDetails.full_name,
        receiverName:searchText,
        category:category,
        cardMessage:editorHtml
      };
      
      console.log("data",data);
      
      await getSaveAsync(data);
      toast.success("Card saved successfully");
     
    } catch (error) {
      
    }
 
  };

  
  const handleCloseDialog = () => {
    setShowPreview(false);
  };
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(event.target.value);
  //   setPage(0);
  // };
  // const handleTextColor = () => {
  //   const color = window.prompt("Enter text color:");
  //   if (color) {
  //     quillRef.current.getEditor().format("color", color);
  //   }
  // };

  // const handleBackgroundColor = () => {
  //   const bgColor = window.prompt("Enter background color:");
  //   if (bgColor) {
  //     quillRef.current.getEditor().format("background", bgColor);
  //   }
  // };
  const hanglePreviewClick = () => {
    setShowPreview(true);
  };
  const handleClose = () => {
   
  };
  const handleDiscard=()=>{
    setConfirm(false);
  };
  const handleConfirm=()=>{
    setConfirm(false);
    navigate("/home1");
    sessionStorage.removeItem("selectedIndex");
  
  }

  
    const handleSubmit = async () => {
      try {
        const token = localStorage.getItem("token");
        const userDetails = jwtDecode(token);
        const data = {
          senderName:userDetails.full_name,
          receiverName:searchText,
          category:category,
          cardMessage:editorHtml
        };
        console.log("data",data);
        await getSubmitAsync(data);
        captureAndSendScreenshot();
        toast.success("Card send successfully");
       
      } catch (error) {
        
      }
   
    };
    const handleSearchChange = (event) => {
      // Update the search text state as the user types
      setSearchText(event.target.value);
    };
    
  
  // const formats = [
  //   "font",
  //   "size",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "list",
  //   "align",
  //   "link",
  //   "image",
  //   "video",
  //   "color",
  //   "background",
  // ];

  return (
    <Box
      style={{
        background: "#f5f5f5",
        width:user.toogle?"95%":"100%",
        marginTop: "60px",
        height: "100vh",
        paddingTop: "14px",
      }}
    >
      <Box
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
            marginLeft: "22px",
            marginBottom: "10px",
          }}
        >
          Send Card
        </Typography>
        {/* <Box sx={{ display: "flex", flexwrap: "wrap" }}>
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
  
/>
</div>
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
              marginRight: "80px",
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
                right: "22px",
                fontSize: "15px",color:"black"
              }}
              onClick={handleAvatarClick}
            >
              SG
            </Avatar>
          </Tooltip>
        </Box> */}
      </Box>
      <Box
        component={Paper}
        sx={{
          height: "92%",
          width:"96%",
          background: "#FCFCFC",
          marginLeft: "20px",
          marginRight: "28px",
          //     '&::-webkit-scrollbar': {
          //     display: 'none',
          //   },
          //   scrollbarWidth: 'none',
          // }}
          overflowY: "auto", // Enable vertical scrollbar
          "&::-webkit-scrollbar": styles.scrollbar,
          "&::-webkit-scrollbar-thumb": styles.thumb,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "20px",
            marginLeft: "20px",
            paddingTop: "20px",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", marginLeft: "25px", marginRight: "25px" }}
          >
            Associate
          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: "8px",
              marginLeft: "25px",
              marginRight: "18px",
            }}
          >
            <Autocomplete
      fullWidth
      options={associate.associateData} 
      value={searchText}
      getOptionLabel={(option) => (option && option.associateName) }

      onInputChange={(event, newInputValue) => {
        setSearchText(newInputValue); 
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select Associate" variant="outlined"   />
      )}
    />

         </FormControl>  
         
        </Box>

        
         <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "20px",
            marginLeft: "20px",
            paddingTop: "5px",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", marginLeft: "25px", marginRight: "30px" }}
          >
            Category
          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: "5px",
              marginLeft: "15px",
              marginRight: "28px !important",
            }}
          >
            <InputLabel sx={{ marginLeft: "10px" }}>Select Category</InputLabel>
            <Select
              fullWidth
              label="Select Category"
              variant="outlined"
              sx={{
                marginLeft: "10px",
                marginRight: "80px",
                height: "46px",
              }}
              size="small"
              onChange={handleCategoryChange}
              value={category}
            >
              {Category1.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
         

      

        <div
          style={{
            marginLeft: "26px",
            marginRight: "10px",
            paddingLeft: "18px",
            paddingRight: "20px",
            paddingTop: "15px",
          }}
        >
          <ReactQuill
            ref={quillRef}
            value={editorHtml}
            readOnly={readOnly}
onChange={handleChange1}
            style={{
              height: "230px",
              width:user.toogle?"100%":"900px",
              whiteSpace: "normal",
              backgroundSize: "auto 100%",
              backgroundRepeat: "no-repeat",
            }}
            placeholder="Enter your text here..."
            modules={{
              toolbar: {
                container: [
                  ["bold", "italic", "underline", "strike"],

                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ align: [] }],
                  ["clean"],
                  [{ color: [] }, { background: [] }],
                ],
              },
            }}
          />
          {showClearButton ? (
            <Button
              size="small"
              sx={{
                position: "absolute",
                color: "#0071e3",
              marginTop:"20px !important",
                fontSize: "15px",
                textTransform: "none",
              }}
              onClick={handleClearClick}
            >
              Clear
            </Button>
          ) : (
            <Button
              size="small"
              sx={{
                position: "absolute",
                color: "#0071e3",
                top: "44%",

                right: "70px",
                fontSize: "15px",
                textTransform: "none",
              }}
              onClick={handleClearClick}
            >
              Clear
            </Button>
          )}
        </div>

        <p
  style={{
    position: "absolute",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "42px",
    fontSize: "12px",
   left:"1100px"
  }}
>
  {remainingCharacters} characters left{" "}
</p>

   <div style={{ marginTop: "70px", marginLeft: "50px", display: "flex", alignItems: "center" }}>
  <Button style={{ background: "#0071e3", color: "#FCFCFC", borderRadius: "8px", textTransform: "none",width:"80px" }}  onClick={hanglePreviewClick}>
    Preview
  </Button>
  <div style={{ marginLeft: "auto" }}>
  <Button style={{ background: "#0071e3", color: "#FCFCFC", borderRadius: "8px", textTransform: "none", marginRight: "10px", border: "1px solid #0071e3",width:"80px" }} onClick={handleSave}>
      Save
    </Button>
    <Button style={{ background: "#FCFCFC", color: "#0071e3", borderRadius: "8px", textTransform: "none", marginRight: "10px", border: "1px solid #0071e3",width:"80px" }} onClick={handleCancel}>
      Cancel
    </Button>
    <Button style={{ background: "#0071e3", color: "#FCFCFC", borderRadius: "8px", textTransform: "none" ,marginRight:"32px",width:"80px"}} onClick={handleSubmit}>
      Submit
    </Button>
  </div>
</div>

<Dialog open={confirm}>
  <DialogTitle>Cancel </DialogTitle>
          <DialogContent
           
          >
           
           Are you sure you want to cancel the changes?
          </DialogContent>
          <DialogActions>
            <Button style={{ background: "#0071e3", color: "#FCFCFC", borderRadius: "8px", textTransform: "none",width:"80px" }}onClick={handleDiscard}>
             Discard 
            </Button>
            <Button style={{ background: "#0071e3", color: "#FCFCFC", borderRadius: "8px", textTransform: "none",width:"80px" }}onClick={handleConfirm}>
             Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={showPreview} id="preview-dialog">

        <DialogContent
  style={{
    width: "500px",
    height: "450px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0, // Remove padding
  }}
>
  {/* Canvas Element */}
  

  <Tooltip title="Close">
    <IconButton
      edge="end"
      color="inherit"
      onClick={handleCloseDialog}
      aria-label="close"
      sx={{ position: "absolute", top: "10px", right: "15px" }}
    >
      <CloseIcon />
    </IconButton>
  </Tooltip>

  {/* Drawing the entire content of the Dialog on the canvas */}
 

  
  <div
    style={{
      width: "300px",
      height: "390px",
      paddingTop: "20px",
      color: "black",
      paddingBottom: "20px",
      overflow: "auto",
      wordBreak: "break-word",
    }}
  >
    <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
  </div> 
</DialogContent>



        </Dialog>
      </Box>{" "}
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
    </Box>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
  edit: state.edit,
  login:state.login,
  associate:state.associate
});
const mapDispatchToProps = (dispatch) => ({
 
  setEdit1: dispatch.user.setEdit1,
  getSubmitAsync: dispatch.login.getSubmitAsync,
  getSaveAsync: dispatch.login.getSaveAsync,
  getAssociateAsync:dispatch.associate.getAssociateAsync
  
});
export default connect(mapStateToProps, mapDispatchToProps)(SendCards);

