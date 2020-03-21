import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListSettingComponent from "./ListSettingComponent.jsx";
import AddSettingComponent from "./AddSettingComponent.jsx";
import EditSettingComponent from "./EditSettingComponent.jsx";
import React from "react";
import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';

const SettingRouter = () => {
    return(
        <div  className="wrapper">
            <SideBar active='setting'/>
            <div className="main">
                <NavBar/>
                    <main className="content">
                        <div className="container-fluid p-0">
                        <Router>
                                <Switch>
                                    {/* <Route path="/" exact component={ListSettingComponent} /> */}
                                    <Route path="/setting" component={ListSettingComponent} />
                                    {/* <Route path="/add-setting" component={AddSettingComponent} /> */}
                                    {/* <Route path="/edit-setting" component={EditSettingComponent} /> */}
                                </Switch>
                            
                        </Router>
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default SettingRouter;