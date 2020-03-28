import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListProxyComponent from "./ListProxyComponent.jsx";
import AddProxyComponent from "./AddProxyComponent.jsx";
import EditProxyComponent from "./EditProxyComponent.jsx";
import React from "react";
import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';
import { Redirect} from 'react-router-dom';

const ProxyRouter = () => {
    return(
        <div  className="wrapper">
            <SideBar active='proxy'/>
            <div className="main">
                <NavBar/>
                    <main className="content">
                        <div className="container-fluid p-0">
                        {sessionStorage.getItem('isAuthenticated') ? (
                        <Router>
                            <Switch>
                                {/* <Route path="/" exact component={ListProxyComponent} /> */}
                                <Route path="/proxies" component={ListProxyComponent} />
                                <Route path="/add-proxy" component={AddProxyComponent} />
                                <Route path="/edit-proxy" component={EditProxyComponent} />
                            </Switch>
                        </Router>):(<Redirect to="/"/>)}
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default ProxyRouter;