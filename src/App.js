import React from 'react';

import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import emails from './pages/emails';
import EmailRouter from './components/emails/EmailRouterComponent.jsx';
import SideBar from './components/layout/sidebar';
import Footer from './components/layout/footer';
import NavBar from './components/layout/navbar';

function App() {
  return (
    <div className="wrapper">
                <SideBar/>
                <div className="main">
                    <NavBar/>
                    <main className="content">
                      <div className="container-fluid p-0">
                        <Router>
                          <Switch>
                              <EmailRouter/>
                          </Switch>
                        </Router>
                      </div>
                    </main>
                    <Footer />
                </div>
          {/* <Route exact path="/" component={emails}/> */}
    </div>
  );
}

export default App;
