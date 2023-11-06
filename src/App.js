
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import { SentDashboard } from './components/Dashboard/SentDashboard';
import { SendDashboard } from './components/Dashboard/SendDashboard';
import { DraftsDashboard } from './components/Dashboard/DraftsDashboard';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { TeamSentDashboard } from './components/Dashboard/TeamSentDashboard';
import { FullpaneRM } from './components/Dashboard/FullpaneRM';
import { TeamReceivedDashboard } from './components/Dashboard/TeamReceivdDashboard';
import Header1 from "./components/Dashboard/Header1";
import { Fullpane } from "./components/Dashboard/FullPnae";
import ImageToByteArrayConverter from "./components/Dashboard/Image";
import Login from "./components/Dashboard/Login";
import PostLogin from "./components/Dashboard/PostLogin";
import ErrorBoundary from "./components/Dashboard/ErrorBoundary";
import { PrivateRoute } from "./components/Dashboard/PrivateRoute";
import { SentDashboardAssociate } from "./components/Dashboard/SentDashboardAssociate";
import { DraftsDashboardAssociate } from "./components/Dashboard/DraftsDashboardAssociate";
import Redirect from "./components/Dashboard/Redirect";
function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/redirect" element={<PostLogin />} />
        
        <Route path="/home" element={<FullpaneRM/>}/>
        <Route path="/home1" element={<Fullpane/>}/>
        <Route path="/sentcards" element={<SentDashboard />} />
        <Route path="/drafts" element={<DraftsDashboard />} />
        <Route path="/teamSent" element={<TeamSentDashboard />} />
        <Route path="/teamReceived" element={<TeamReceivedDashboard />} />
        <Route path="/sendcard" element={<SendDashboard />} />
        <Route path="/sentcardassociate" element={<SentDashboardAssociate />} />
        <Route path="/draftsassociate" element={<DraftsDashboardAssociate />} />
      </Routes>
      <ToastContainer
       
      
       />
    </BrowserRouter></>
    
  );
}

export default App;
