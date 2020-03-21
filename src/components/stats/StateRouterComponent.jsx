import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListStateComponent from "./ListStateComponent.jsx/index.js";
import React from "react";
import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';

const StatsRouter = () => {
    return(
        <div  className="wrapper">
            <SideBar active='agent'/>
            <div className="main">
                <NavBar/>
                    <main className="content">
                        <div className="container-fluid p-0">
                        <Router>
                            <Switch>
                                {/* <Route path="/" exact component={ListEmailComponent} /> */}
                                <Route path="/stats" component={ListStateComponent} />
                            </Switch>
                        </Router>
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default StatsRouter;