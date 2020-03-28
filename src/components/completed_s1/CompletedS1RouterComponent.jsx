import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListCompletedS1Component from "./ListCompletedS1Component.jsx";
import React from "react";
import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';
import { Redirect} from 'react-router-dom';

const CompletedS1Router = () => {
    return(
        <div  className="wrapper">
            <SideBar active='completed_s1'/>
            <div className="main">
                <NavBar/>
                    <main className="content">
                        <div className="container-fluid p-0">
                        {sessionStorage.getItem('isAuthenticated') ? (
                        <Router>
                            <Switch>
                                <Route path="/completed_s1" component={ListCompletedS1Component} />
                            </Switch>
                        </Router>):(<Redirect to="/"/>)}
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default CompletedS1Router;