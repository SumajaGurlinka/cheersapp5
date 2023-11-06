import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
const Login = (props) => {
   
    useEffect(() => {
        const redirectUrl = 'https://dev-auth.senecaglobal.in/login?redirect_url=http://localhost:3000/redirect';
        window.location.href = redirectUrl;
      
      }, []);

    return (
        <div>
       
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
 
    getLoginAsync: dispatch.login.getLoginAsync,
  });

export default connect(mapDispatchToProps,mapDispatchToProps)(Login);
