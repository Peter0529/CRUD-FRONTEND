import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListVPNComponent from "./ListVPNComponent.jsx";
import AddVPNComponent from "./AddVPNComponent.jsx";
import EditVPNComponent from "./EditVPNComponent.jsx";
import React from "react";

import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';

const VPNRouter = () => {
    return(
        <div  className="wrapper">
            <SideBar active='vpn'/>
            <div className="main">
                <NavBar/>
                    <main className="content">
                        <div className="container-fluid p-0">
                        <Router>
                                <Switch>
                                    {/* <Route path="/" exact component={ListVPNComponent} /> */}
                                    <Route path="/vpns" component={ListVPNComponent} />
                                    <Route path="/add-vpn" component={AddVPNComponent} />
                                    <Route path="/edit-vpn" component={EditVPNComponent} />
                                </Switch>
                            
                        </Router>
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default VPNRouter;