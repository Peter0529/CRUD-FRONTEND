import React,{ Component } from 'react';

import SideBar from '../components/layout/sidebar';
import Footer from '../components/layout/footer';
import NavBar from '../components/layout/navbar';
import EmailRouter from '../components/emails/EmailRouterComponent.jsx';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';

class Emails{
    render(){
        return(
            <div className="wrapper">
                <SideBar/>
                <div className="main">
                    <NavBar/>
                    <main className="content">
                    <Router>
                        <Switch>
                            <EmailRouter />
                        </Switch>
                    </Router>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }
} export default Emails;