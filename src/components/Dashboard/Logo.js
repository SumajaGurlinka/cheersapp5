
import { Container, Toolbar, Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CheersApp from "../../assets/images/Cheers App.svg";;

const useStyles = makeStyles(() => {
    return {
        textContainer: {
            color: '#413E47',
            marginLeft: '0px !important',
            fontFamily: "'Manrope', sans-serif !important",
            fontWeight: '700 !important',
           marginTop:"2px !important"
        }
    };
});

const Logo = props => {
    const classes = useStyles();
    return (
        <div>
            <Box>
                <Container maxWidth="xl" sx={{ paddingLeft: '8px !important' }}>
                    <Toolbar disableGutters className={props.className}>
                        
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "0px !important" }}>
  <img src={CheersApp} alt=""style={{height:"1.85em",marginTop:"0px"}} />
  <Typography variant="h6" noWrap className={classes.textContainer}>
    CheersApp
  </Typography>
</div>

                    </Toolbar>
                </Container>
            </Box>
        </div>
    );
};

export default Logo;
