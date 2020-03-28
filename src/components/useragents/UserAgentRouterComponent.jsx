import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserAgentComponent from "./ListUserAgentComponent.jsx";
import AddUserAgentComponent from "./AddUserAgentComponent.jsx";
import EditUserAgentComponent from "./EditUserAgentComponent.jsx";
import React from "react";
import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';
import { Redirect} from 'react-router-dom';

const UserAgentRouter = () => {
    return(
        <div  className="wrapper">
            <SideBar active='agent'/>
            <div className="main">
                <NavBar/>
                    <main className="content">
                        <div className="container-fluid p-0">
                        {sessionStorage.getItem('isAuthenticated') ? (
                        <Router>
                            <Switch>
                                {/* <Route path="/" exact component={ListEmailComponent} /> */}
                                <Route path="/useragents" component={ListUserAgentComponent} />
                                {/* <Route path="/add-agent" component={AddUserAgentComponent} /> */}
                                <Route path="/edit-agent" component={EditUserAgentComponent} />
                            </Switch>
                        </Router>):(<Redirect to="/"/>)}
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default UserAgentRouter;