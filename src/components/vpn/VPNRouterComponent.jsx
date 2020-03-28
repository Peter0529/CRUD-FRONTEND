import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListVPNComponent from "./ListVPNComponent.jsx";
import AddVPNComponent from "./AddVPNComponent.jsx";
import EditVPNComponent from "./EditVPNComponent.jsx";
import React from "react";

import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';
import { Redirect} from 'react-router-dom';

const VPNRouter = () => {
    return(
        <div  className="wrapper">
            <SideBar active='vpn'/>
            <div className="main">
                <NavBar/>
                    <main className="content">
                        <div className="container-fluid p-0">
                        {sessionStorage.getItem('isAuthenticated') ? (
                        <Router>
                                <Switch>
                                    {/* <Route path="/" exact component={ListVPNComponent} /> */}
                                    <Route path="/vpns" component={ListVPNComponent} />
                                    <Route path="/add-vpn" component={AddVPNComponent} />
                                    <Route path="/edit-vpn" component={EditVPNComponent} />
                                </Switch>
                            
                        </Router>):(<Redirect to="/"/>)}
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default VPNRouter;