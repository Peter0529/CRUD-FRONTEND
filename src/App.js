import React from 'react';

import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { Redirect} from 'react-router-dom';
import { Fragment } from 'react';
import EmailRouter from './components/emails/EmailRouterComponent.jsx';
import ProxyRouter from './components/proxies/ProxyRouterComponent.jsx';
import DashboardRouter from './components/dashboard/DashboardRouterComponent.jsx';
import CampaignS1Router from './components/campaign_s1/CampaignS1RouterComponent.jsx';
import LogRouter from './components/logs/LogRouterComponent.jsx';
import SettingRouter from './components/settings/SettingRouterComponent.jsx';
import VPNRouter from './components/vpn/VPNRouterComponent.jsx';
import UserAgentRouter from './components/useragents/UserAgentRouterComponent.jsx';
import CompletedS1Router from './components/completed_s1/CompletedS1RouterComponent.jsx';
import StatsRouter from './components/stats/StateRouterComponent.jsx';
import Login from './pages/Login.js';
import NotFound from './pages/404';
import $ from 'jquery';

function App() {
  return (
    <div>
        <Router>
            <Switch>
                
                <Route path="/" exact component={Login} />
                {/* <Route path="/" exact component={DashboardRouter} /> */}
                  {sessionStorage.getItem('isAuthenticated') ? <Route path="/dashboard" exact component={DashboardRouter}/> : <Redirect to="/"/>}
                  {sessionStorage.getItem('isAuthenticated') ? <Route path="/emails" exact component={EmailRouter} /> : <Redirect to="/"/>}
                  {sessionStorage.getItem('isAuthenticated') ? <Route path="/campaign_s1" exact component={CampaignS1Router} />: <Redirect to="/"/>}
                  {sessionStorage.getItem('isAuthenticated') ? <Route path="/logs" exact component={LogRouter} />: <Redirect to="/"/>}
                  {sessionStorage.getItem('isAuthenticated') ? <Route path="/proxies" exact component={ProxyRouter} />: <Redirect to="/"/>}
                  {sessionStorage.getItem('isAuthenticated') ? <Route path="/setting" exact component={SettingRouter} />: <Redirect to="/"/>}
                  {sessionStorage.getItem('isAuthenticated') ? <Route path="/vpns" exact component={VPNRouter} />: <Redirect to="/"/>}
                  {sessionStorage.getItem('isAuthenticated') ? <Route path="/useragents" exact component={UserAgentRouter}/>: <Redirect to="/"/>}
                  {sessionStorage.getItem('isAuthenticated') ? <Route path="/completed_s1" exact component={CompletedS1Router}/>: <Redirect to="/"/>}
                  {sessionStorage.getItem('isAuthenticated') ? <Route path="/stats" exact component={StatsRouter}/>: <Redirect to="/"/>}
                <Route component={NotFound} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;