import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListLogComponent from "./ListLogComponent.jsx";
import AddLogComponent from "./AddLogComponent.jsx";
import EditLogComponent from "./EditLogComponent.jsx";
import React from "react";
import SideBar from '../layout/sidebar';
import Footer from '../layout/footer';
import NavBar from '../layout/navbar';
const LogRouter = () => {
    return(
        <div  className="wrapper">
            <SideBar active='log'/>
            <div className="main">
                <NavBar/>
                    <main className="content">
                        <div className="container-fluid p-0">
                        <Router>
                            <Switch>
                                {/* <Route path="/" exact component={ListLogComponent} /> */}
                                <Route path="/logs" component={ListLogComponent} />
                                <Route path="/add-log" component={AddLogComponent} />
                                <Route path="/edit-log" component={EditLogComponent} />
                            </Switch>
                        </Router>
                        </div>
                    </main>
                <Footer />
            </div>
        </div>
    )
}

export default LogRouter;