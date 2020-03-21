import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListEmailComponent from "./ListEmailComponent.jsx";
import AddEmailComponent from "./AddEmailComponent.jsx";
import EditEmailComponent from "./EditEmailComponent.jsx";
import React from "react";
import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';
const EmailRouter = () => {
    return(
        <div  className="wrapper">
            <SideBar active='email'/>
            <div className="main">
                <NavBar/>
                    <main className="content">
                        <div className="container-fluid p-0">
                        <Router>
                            <Switch>
                                {/* <Route path="/" exact component={ListEmailComponent} /> */}
                                <Route path="/emails" component={ListEmailComponent} />
                                <Route path="/add-email" component={AddEmailComponent} />
                                <Route path="/edit-email" component={EditEmailComponent} />
                            </Switch>
                        </Router>
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default EmailRouter;