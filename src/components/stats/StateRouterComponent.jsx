import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListStateComponent from "./ListStateComponent.jsx";
import React from "react";
import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';
import { Redirect} from 'react-router-dom';

const StatsRouter = () => {
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
                                <Route path="/stats" component={ListStateComponent} />
                            </Switch>
                        </Router>):(<Redirect to="/"/>)}
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default StatsRouter;