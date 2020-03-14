import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListEmailComponent from "./ListEmailComponent.jsx";
import AddEmailComponent from "./AddEmailComponent.jsx";
import EditEmailComponent from "./EditEmailComponent.jsx";
import React from "react";

const EmailRouter = () => {
    return(
        <div>
            <Router>
                
                    <Switch>
                        <Route path="/" exact component={ListEmailComponent} />
                        <Route path="/emails" component={ListEmailComponent} />
                        <Route path="/add-email" component={AddEmailComponent} />
                        <Route path="/edit-email" component={EditEmailComponent} />
                    </Switch>
                
            </Router>
        </div>
    )
}

export default EmailRouter;