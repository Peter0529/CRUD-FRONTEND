import React from 'react';

import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
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

import $ from 'jquery';

function App() {
  return (
    <div>
        <Router>
            <Switch>
                <Route path="/" exact component={DashboardRouter} />
                <Route path="/dashboard" exact component={DashboardRouter} />
                <Route path="/emails" exact component={EmailRouter} />
                <Route path="/campaign_s1" exact component={CampaignS1Router} />
                <Route path="/logs" exact component={LogRouter} />
                <Route path="/proxies" exact component={ProxyRouter} />
                <Route path="/setting" exact component={SettingRouter} />
                <Route path="/vpns" exact component={VPNRouter} />
                <Route path="/useragents" exact component={UserAgentRouter}/>
                <Route path="/completed_s1" exact component={CompletedS1Router}/>
                <Route path="/stats" exact component={StatsRouter}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;