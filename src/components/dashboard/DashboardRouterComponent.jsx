import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListDashboardComponent from "./ListDashboardComponent.jsx";
import AddDashboardComponent from "./AddDashboardComponent.jsx";
import EditDashboardComponent from "./EditDashboardComponent.jsx";
import React from "react";
import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';
import { Redirect} from 'react-router-dom';

const EmailRouter = () => {
    return(
        <div  className="wrapper">
            <SideBar active='dashboard'/>
            <div className="main">
                <NavBar/>
                    <main className="content">
                        <div className="container-fluid p-0">
                        {sessionStorage.getItem('isAuthenticated') ? (
                        <Router>
                            <Switch>
                                <Route path="/" exact component={ListDashboardComponent} />
                                <Route path="/dashboard" component={ListDashboardComponent} />
                                <Route path="/add-dashboard" component={AddDashboardComponent} />
                                <Route path="/edit-dashboard" component={EditDashboardComponent} />
                            </Switch>
                        </Router>
                        ):(<Redirect to="/login"/>)}
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default EmailRouter;