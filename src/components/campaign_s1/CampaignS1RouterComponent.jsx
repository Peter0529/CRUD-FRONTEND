import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListCampaignS1Component from "./ListCampaignS1Component.jsx";
import AddCampaignS1Component from "./AddCampaignS1Component.jsx";
import EditCampaignS1Component from "./EditCampaignS1Component.jsx";
import React from "react";
import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';

const CampaignS1Router = () => {
    return(
        <div  className="wrapper">
            <SideBar active='campaign_s1'/>
            <div className="main">
                <NavBar/>
                    <main className="content">
                        <div className="container-fluid p-0">
                        <Router>
                            <Switch>
                                {/* <Route path="/" exact component={ListEmailComponent} /> */}
                                <Route path="/campaign_s1" component={ListCampaignS1Component} />
                                <Route path="/add-camps1" component={AddCampaignS1Component} />
                                <Route path="/edit-camps1" component={EditCampaignS1Component} />
                            </Switch>
                        </Router>
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default CampaignS1Router;